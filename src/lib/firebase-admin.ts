
'use server';

import admin from 'firebase-admin';

// TODO: Ganti placeholder ini dengan konten dari file JSON service account Anda.
// 1. Buka Firebase Console -> Project Settings -> Service accounts.
// 2. Klik "Generate new private key" untuk mengunduh file JSON.
// 3. Salin seluruh isi file JSON tersebut dan tempel di sini.
const serviceAccount = {
  // "type": "service_account",
  // "project_id": "...",
  // "private_key_id": "...",
  // "private_key": "...",
  // "client_email": "...",
  // "client_id": "...",
  // "auth_uri": "...",
  // "token_uri": "...",
  // "auth_provider_x509_cert_url": "...",
  // "client_x509_cert_url": "..."
};


// Periksa apakah aplikasi sudah diinisialisasi
if (!admin.apps.length) {
  try {
    // Memastikan serviceAccount memiliki properti yang dibutuhkan sebelum inisialisasi
    if (!serviceAccount.projectId || !serviceAccount.privateKey) {
        throw new Error('Objek serviceAccount tidak lengkap. Harap isi dengan benar.');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.projectId,
    });
  } catch (error) {
    console.error('Gagal menginisialisasi Firebase Admin SDK:', error);
  }
}

export { admin };
