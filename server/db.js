// db.js
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
    if (process.env.NODE_ENV === 'production') {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    } else {
        // Local development using your JSON file
        admin.initializeApp({
            credential: admin.credential.cert('./realevents-ae063-firebase-adminsdk-fbsvc-9f3d9a994c.json')
        });
    }
}

export const db = getFirestore();