// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db.js'; // Import this FIRST to initialize Firebase
import authRoutes from './routes/auth.js';
import requestRoutes from './routes/requests.js';

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}