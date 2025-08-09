
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { Session, sessionOptions } from '@/lib/session';

// This is required for environment variables to be available in the middleware
import 'dotenv/config';

export async function middleware(request: NextRequest) {
  const session = await getIronSession<Session>(request.cookies, sessionOptions);

  if (!session.uid) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
