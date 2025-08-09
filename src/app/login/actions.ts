
'use server';

import { admin } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

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
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      path: '/',
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error creating session cookie:', error);
    // Mengembalikan pesan error yang lebih spesifik jika ada
    return { success: false, error: error.message || 'Failed to create session.' };
  }
}

export async function handleLogout() {
  cookies().delete('firebase-session');
}
