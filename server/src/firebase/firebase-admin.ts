import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import * as serviceAccount from '../config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const firestore = admin.firestore();
