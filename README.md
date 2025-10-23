# BMI Calculator - MERN Stack Application

A full-stack BMI calculator application built with MongoDB, Express.js, React, and Node.js. Users can register, login, calculate their BMI, and track their BMI history with visualizations.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **BMI Calculation**: Calculate BMI with weight, height, and age inputs
- **Data Storage**: Store BMI records in MongoDB Atlas
- **Data Visualization**: Interactive charts showing BMI trends and category distribution
- **Historical Tracking**: View and manage BMI history
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for input validation

### Frontend
- React with Vite
- React Router for navigation
- Recharts for data visualization
- Axios for API calls
- Context API for state management

## Project Structure

```
mern-project/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bmiController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── BMI.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── bmi.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BMICalculator.jsx
│   │   │   ├── BMIDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bmi-calculator
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### BMI
- `POST /api/bmi` - Add BMI record (protected)
- `GET /api/bmi/history` - Get BMI history (protected)
- `GET /api/bmi/latest` - Get latest BMI record (protected)
- `GET /api/bmi/stats` - Get BMI statistics (protected)
- `DELETE /api/bmi/:id` - Delete BMI record (protected)

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Calculate BMI**: Enter your weight (kg), height (cm), and age to calculate BMI
3. **View Dashboard**: See your BMI trends, statistics, and historical data
4. **Manage Records**: Delete old BMI records as needed

## BMI Categories

- **Underweight**: BMI < 18.5
- **Normal weight**: BMI 18.5 - 24.9
- **Overweight**: BMI 25 - 29.9
- **Obesity**: BMI ≥ 30

## Features Implemented

✅ JWT Authentication with MongoDB Atlas
✅ MVC Architecture
✅ BMI Calculation and Storage
✅ Data Visualization with Charts
✅ Historical Data Tracking
✅ Responsive Design
✅ Input Validation
✅ Error Handling
✅ Modular Code Structure

## Development

The application follows MVC architecture:
- **Models**: User and BMI data models with Mongoose
- **Views**: React components for UI
- **Controllers**: Business logic for authentication and BMI operations
- **Routes**: API endpoint definitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
