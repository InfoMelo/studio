
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getIronSession } from 'iron-session';
import { Session, sessionOptions } from '@/lib/session';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

// This function dynamically gets session options and validates the password.
// It's called only from Server Actions, where process.env is reliably available.
function getSessionOptions() {
  const password = process.env.SECRET_COOKIE_PASSWORD;
  if (!password) {
    throw new Error('SECRET_COOKIE_PASSWORD environment variable is not set. Please ensure it is set in your environment variables.');
  }
  return { ...sessionOptions, password };
}

export async function createSession(idToken: string): Promise<{ success: boolean; error?: string }> {
  const finalSessionOptions = getSessionOptions();
  
  try {
    const decodedToken = await getFirebaseAdmin().auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;
    
    const session = await getIronSession<Session>(cookies(), finalSessionOptions);
    session.uid = uid;
    session.email = email || '';
    await session.save();
    
    revalidatePath('/admin', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Session creation error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getSession() {
  const finalSessionOptions = getSessionOptions();
  const session = await getIronSession<Session>(cookies(), finalSessionOptions);
  if (!session.uid) {
    return null;
  }
  return session;
}

export async function logout() {
  const finalSessionOptions = getSessionOptions();
  const session = await getIronSession<Session>(cookies(), finalSessionOptions);
  session.destroy();
  revalidatePath('/admin', 'layout');
}
