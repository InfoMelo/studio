
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('firebase-session');
  const { pathname } = request.nextUrl;

  // Jika tidak ada sesi dan mencoba mengakses halaman admin, redirect ke login
  if (!session && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika ada sesi dan mencoba mengakses halaman login, redirect ke dashboard admin
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
