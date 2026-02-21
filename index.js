import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/user.Routes.js';
import authRoutes from './routes/auth.Routes.js';
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // correct key name
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', authRoutes)
// app.use('/api/prod', prodRoutes);

// Server
const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
