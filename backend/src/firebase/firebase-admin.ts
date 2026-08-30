import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

let firebaseApp: admin.app.App | null = null;

function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }

  let serviceAccount: ServiceAccount;

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    serviceAccount = require('../config/serviceAccountKey.json') as ServiceAccount;
  } else {
    const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

    if (!serviceAccountBase64) {
      throw new Error(
        'FIREBASE_SERVICE_ACCOUNT_BASE64 is not defined',
      );
    }

    const serviceAccountJson = Buffer.from(
      serviceAccountBase64,
      'base64',
    ).toString('utf8');

    serviceAccount = JSON.parse(serviceAccountJson) as ServiceAccount;
  }

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return firebaseApp;
}

export const firestore = admin.firestore(getFirebaseApp());