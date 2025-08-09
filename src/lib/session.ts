
import type { SessionOptions } from 'iron-session';

const secretCookiePassword = process.env.SECRET_COOKIE_PASSWORD;

if (!secretCookiePassword) {
    throw new Error('SECRET_COOKIE_PASSWORD environment variable is not set. Please add it to your .env.local file.');
}

export interface Session {
  uid: string;
  email: string;
  isLoggedIn?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: secretCookiePassword,
  cookieName: 'rsu-meloy-session',
  cookieOptions: {
    // secure: true should be used in production (HTTPS)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // or 'strict'
    httpOnly: true,
  },
};
