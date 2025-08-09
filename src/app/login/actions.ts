'use server';

import { admin } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function createSessionCookie(
  idToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });
      
    cookies().set('firebase-session', sessionCookie, {
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
      path: '/',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error creating session cookie:', error.message);
    // Return a specific error message to the client
    return { success: false, error: `Gagal membuat sesi di server: ${error.message}` };
  }
}

export async function handleLogout() {
  cookies().delete('firebase-session');
}
