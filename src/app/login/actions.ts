
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getIronSession } from 'iron-session';
import { Session, sessionOptions } from '@/lib/session';
import { firebaseAdmin } from '@/lib/firebase-admin';

export async function createSession(idToken: string): Promise<{ success: boolean; error?: string }> {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;
    
    const session = await getIronSession<Session>(cookies(), sessionOptions);
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
  const session = await getIronSession<Session>(cookies(), sessionOptions);
  if (!session.uid) {
    return null;
  }
  return session;
}

export async function logout() {
  const session = await getIronSession<Session>(cookies(), sessionOptions);
  session.destroy();
  revalidatePath('/admin', 'layout');
}
