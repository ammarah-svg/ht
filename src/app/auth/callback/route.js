import { NextResponse } from 'next/server';
import { getRedirectURL } from '@/lib/auth-helpers';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  
  // If there's no code, redirect to home page
  if (!code) {
    return NextResponse.redirect(getRedirectURL());
  }

  // Redirect to the requested page or home page
  return NextResponse.redirect(new URL(next, getRedirectURL()));
}