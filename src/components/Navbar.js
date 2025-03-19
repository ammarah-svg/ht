"use client"
import Link from "next/link";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link             href="/" 
            className="text-xl font-bold tracking-tighter hover:text-primary transition-colors order-2"
          >
            حشمت طاہرہ
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 order-1">
            <div className="flex items-center">
              {user && (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-custom-orange to-custom-orange/80 hover:from-custom-orange/90 hover:to-custom-orange/70 rounded-full transition-all duration-300 text-white text-base font-medium shadow-lg hover:shadow-xl"
                >
                  <LogOut className="h-4 w-4" />
                  <span>خارج</span>
                </button>
              )}
            </div>
            <ul className="flex space-x-6 items-center">
              {[
                ...(isAdmin ? [['ڈیش بورڈ', '/dashboard']] : []),
                ['رابطہ کریں', '/contact'],
                ['تعریف', '/about'],
                ['بلاگ', '/blogs'],
                ['کہانیاں', '/stories'],
                ['ہوم', '/']
              ].map(([title, url]) => (
                <li key={url}>
                  <Link 
                    href={url} 
                    className="hover:text-primary transition-colors text-base font-medium"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="pt-2 pb-4 space-y-2">
              {[
                ...(isAdmin ? [['ڈیش بورڈ', '/dashboard']] : []),
                ...(isAdmin ? [['ڈیش بورڈ', '/dashboard']] : []),
                ['رابطہ کریں', '/contact'],
                ['تعریف', '/about'],
                ['بلاگ', '/blogs'],
                ['کہانیاں', '/stories'],
                ['ہوم', '/'],
                ...(user ? [['خارج', '#']] : []),
              ].map(([title, url]) => (
                <li key={url}>
                  {title === 'خارج' ? (
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block px-4 py-2 bg-gradient-to-r from-custom-orange to-custom-orange/80 hover:from-custom-orange/90 hover:to-custom-orange/70 rounded-full transition-all duration-300 text-white text-lg font-medium shadow-lg hover:shadow-xl w-full"
                    >
                      {title}
                    </button>
                  ) : (
                    <Link 
                      href={url} 
                      className="block py-2 hover:text-primary transition-colors text-lg font-medium w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}