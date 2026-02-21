import express from 'express';
import { z } from 'zod';
import { Request } from '../models/Request.js';

const router = express.Router();

const requestSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    city: z.string().min(2),
    timeSlot: z.string()
});

router.post('/', async (req, res) => {
    try {
        const data = requestSchema.parse(req.body);
        const newRequest = new Request(data);
        await newRequest.save();

        console.log('New Request saved to MongoDB:', newRequest._id);
        res.status(201).json({ message: 'Request submitted successfully', id: newRequest._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
