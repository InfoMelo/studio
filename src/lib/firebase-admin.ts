import * as admin from 'firebase-admin';

let firebaseAdmin: admin.app.App;

function initializeFirebaseAdmin() {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
    throw new Error('Firebase service account environment variables (FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL) are not set. Please add them to your .env.local file.');
  }

  try {
    return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  } catch(e) {
      console.error("Firebase Admin SDK initialization failed.", e);
      throw new Error("Invalid Firebase Admin SDK configuration.");
  }
}

export const getFirebaseAdmin = () => {
  if (!admin.apps.length) {
    firebaseAdmin = initializeFirebaseAdmin();
  } else {
    firebaseAdmin = admin.app();
  }
  return firebaseAdmin;
}
