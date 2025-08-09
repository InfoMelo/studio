
import admin from 'firebase-admin';

// Periksa apakah service account key tersedia di environment variables
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
}

// Periksa apakah aplikasi sudah diinisialisasi
if (!admin.apps.length) {
  try {
    // Parsing service account key dari environment variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id, // Eksplisit mengatur projectId
    });
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT or initialize Firebase Admin SDK:', error);
    throw new Error('Firebase Admin SDK initialization failed.');
  }
}

export { admin };
