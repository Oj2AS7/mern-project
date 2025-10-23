const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [1, 'Weight must be greater than 0']
  },
  height: {
    type: Number,
    required: [true, 'Height is required'],
    min: [1, 'Height must be greater than 0']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be greater than 0'],
    max: [150, 'Age must be realistic']
  },
  bmi: {
    type: Number
  },
  category: {
    type: String,
    enum: ['Underweight', 'Normal weight', 'Overweight', 'Obesity']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate BMI before saving
bmiSchema.pre('save', function(next) {
  const heightInMeters = this.height / 100;
  this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
  
  // Determine BMI category
  if (this.bmi < 18.5) {
    this.category = 'Underweight';
  } else if (this.bmi >= 18.5 && this.bmi < 25) {
    this.category = 'Normal weight';
  } else if (this.bmi >= 25 && this.bmi < 30) {
    this.category = 'Overweight';
  } else {
    this.category = 'Obesity';
  }
  
  next();
});

module.exports = mongoose.model('BMI', bmiSchema);
