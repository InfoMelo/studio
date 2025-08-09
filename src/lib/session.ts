
import type { SessionOptions } from 'iron-session';

export interface Session {
  uid: string;
  email: string;
  isLoggedIn?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'rsu-meloy-session',
  cookieOptions: {
    // secure: true should be used in production (HTTPS)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // or 'strict'
    httpOnly: true,
  },
};
