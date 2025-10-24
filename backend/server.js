require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');


// Import routes
const authRoutes = require('./routes/auth');
const bmiRoutes = require('./routes/bmi');

const app = express();
const PORT = process.env.PORT;

// Connect to database
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://mern-project-ten-gold.vercel.app',
  'https://mern-project-d22nmwxj8-oj2as7s-projects.vercel.app',
  /^https:\/\/mern-project.*\.vercel\.app$/ // Allow all Vercel preview URLs
];

// Add production frontend URL from environment if provided
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
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
