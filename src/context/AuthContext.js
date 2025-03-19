"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/Toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAdmin(currentUser?.user_metadata?.role === 'admin');
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAdmin(currentUser?.user_metadata?.role === 'admin');
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          showToast('Please confirm your email before logging in. Check your inbox for the confirmation link.', 'error');
          return null;
        }
        if (error.message.includes('Invalid login credentials')) {
          showToast('Invalid email or password. Please try again.', 'error');
          return null;
        }
        showToast(error.message, 'error');
        return null;
      }
      
      if (!data.user.email_confirmed_at) {
        showToast('Please confirm your email before logging in. Check your inbox for the confirmation link.', 'error');
        return null;
      }
      
      showToast('Successfully logged in!', 'success');
      return data;
    } catch (error) {
      showToast('An unexpected error occurred. Please try again later.', 'error');
      return null;
    }
  };

  const signup = async ({ email, password, ...metadata }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}