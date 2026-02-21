// firebaseConfig.js
import admin from 'firebase-admin';
import serviceAccount from './realevents-ae063-firebase-adminsdk-fbsvc-9f3d9a994c.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
export default db;