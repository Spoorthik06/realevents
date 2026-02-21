// db.js
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
    const isProd = process.env.NODE_ENV === 'production';

    const serviceAccount = isProd 
    ? {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // The replace() is critical to fix newline characters in the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }
    : './realevents-ae063-firebase-adminsdk-fbsvc-9f3d9a994c.json';

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount) //
    });
}

export const db = getFirestore();