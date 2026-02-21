import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import requestRoutes from './routes/requests.js';

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
const PORT = process.env.PORT || 5001;

// Database connection
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL, "dburl");
mongoose.connect(MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
