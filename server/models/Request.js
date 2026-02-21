import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    timeSlot: { type: String, required: true }
    // interests: { type: [String], default: [] },
}, { timestamps: true });

export const Request = mongoose.model('Request', requestSchema);
