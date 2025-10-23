require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');


// Import routes
const authRoutes = require('./routes/auth');
const bmiRoutes = require('./routes/bmi');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bmi', bmiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'BMI Calculator API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
