
import * as admin from 'firebase-admin';
import 'dotenv/config';

// This is a critical security measure.
// The service account key should NEVER be exposed to the client.
// It should be stored securely as an environment variable on the server.
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountKey) {
  throw new Error('The FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please add it to your .env.local file.');
}

let firebaseAdmin: admin.app.App;

if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        firebaseAdmin = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch(e) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT. Make sure it's a valid JSON string.", e);
        throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT configuration.");
    }
} else {
  firebaseAdmin = admin.app();
}

export { firebaseAdmin };
