import express from 'express';
import { z } from 'zod';
import { db } from '../db.js'; // Import the initialized Firestore instance

const router = express.Router();

const requestSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    city: z.string().min(2),
    timeSlot: z.string()
});

// GET all requests
router.get('/', async (req, res) => {
    try {
        const requestsRef = db.collection('requests'); //
        const snapshot = await requestsRef.get(); //
        
        // Map Firestore documents to a readable array
        const requests = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new request
router.post('/', async (req, res) => {
    try {
        const data = requestSchema.parse(req.body);
        
        // Add a new document to the 'requests' collection
        const docRef = await db.collection('requests').add({
            ...data,
            createdAt: new Date() // Good practice for sorting later
        });

        console.log('New Request saved to Firestore:', docRef.id);
        res.status(201).json({ 
            message: 'Request submitted successfully', 
            id: docRef.id 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;