import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '../db.js'

const router = express.Router();

const signupSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = signupSchema.parse(req.body);

        // Check if user exists using a Firestore query
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();
        
        if (!snapshot.empty) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new document in 'users' collection
        const newUserRef = await usersRef.add({
            fullName,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        const token = jwt.sign({ id: newUserRef.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: newUserRef.id, fullName, email } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        
        // Find user by email in Firestore
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).limit(1).get();

        if (snapshot.empty) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        // Compare password with hashed version stored in Firestore
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: userDoc.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ token, user: { id: userDoc.id, fullName: userData.fullName, email } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;