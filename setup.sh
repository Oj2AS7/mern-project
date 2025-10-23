#!/bin/bash

echo "🚀 Setting up BMI Calculator MERN Application..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a .env file in the backend directory with your MongoDB URI and JWT secret"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Backend will run on http://localhost:5000"
echo "🌐 Frontend will run on http://localhost:5173"
