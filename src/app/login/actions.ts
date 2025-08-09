
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getIronSession } from 'iron-session';
import { Session, sessionOptions } from '@/lib/session';
import { firebaseAdmin } from '@/lib/firebase-admin';

// Re-check password existence here, where it's more reliable
function getSessionOptions() {
  const password = process.env.SECRET_COOKIE_PASSWORD;
  if (!password) {
    throw new Error('SECRET_COOKIE_PASSWORD environment variable is not set.');
  }
  return { ...sessionOptions, password };
}

export async function createSession(idToken: string): Promise<{ success: boolean; error?: string }> {
  const finalSessionOptions = getSessionOptions();
  
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
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
