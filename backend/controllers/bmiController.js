const { validationResult } = require('express-validator');
const BMI = require('../models/BMI');

// Add BMI record
const addBMI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { weight, height, age } = req.body;

    const bmiRecord = new BMI({
      user: req.user._id,
      weight,
      height,
      age
    });

    await bmiRecord.save();

    res.status(201).json({
      message: 'BMI record added successfully',
      bmi: bmiRecord
    });
  } catch (error) {
    console.error('Add BMI error:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all BMI records for user
const getBMIHistory = async (req, res) => {
  try {
    const bmiRecords = await BMI.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(50); // Limit to last 50 records

    res.json({
      bmiRecords,
      count: bmiRecords.length
    });
  } catch (error) {
    console.error('Get BMI history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get latest BMI record
const getLatestBMI = async (req, res) => {
  try {
    const latestBMI = await BMI.findOne({ user: req.user._id })
      .sort({ date: -1 });

    if (!latestBMI) {
      return res.status(404).json({ message: 'No BMI records found' });
    }

    res.json({ bmi: latestBMI });
  } catch (error) {
    console.error('Get latest BMI error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete BMI record
const deleteBMI = async (req, res) => {
  try {
    const { id } = req.params;

    const bmiRecord = await BMI.findOneAndDelete({
      _id: id,
      user: req.user._id
    });

    if (!bmiRecord) {
      return res.status(404).json({ message: 'BMI record not found' });
    }

    res.json({ message: 'BMI record deleted successfully' });
  } catch (error) {
    console.error('Delete BMI error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get BMI statistics
const getBMIStats = async (req, res) => {
  try {
    const bmiRecords = await BMI.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30); // Last 30 records

    if (bmiRecords.length === 0) {
      return res.json({
        averageBMI: 0,
        trend: 'no_data',
        categoryDistribution: {},
        bmiRecords: []
      });
    }

    // Calculate average BMI
    const totalBMI = bmiRecords.reduce((sum, record) => sum + record.bmi, 0);
    const averageBMI = parseFloat((totalBMI / bmiRecords.length).toFixed(1));

    // Calculate trend
    let trend = 'stable';
    if (bmiRecords.length >= 2) {
      const latest = bmiRecords[0].bmi;
      const previous = bmiRecords[1].bmi;
      if (latest > previous) trend = 'increasing';
      else if (latest < previous) trend = 'decreasing';
    }

    // Category distribution
    const categoryDistribution = bmiRecords.reduce((acc, record) => {
      acc[record.category] = (acc[record.category] || 0) + 1;
      return acc;
    }, {});

    res.json({
      averageBMI,
      trend,
      categoryDistribution,
      bmiRecords: bmiRecords.slice(0, 10) // Return last 10 for chart
    });
  } catch (error) {
    console.error('Get BMI stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addBMI,
  getBMIHistory,
  getLatestBMI,
  deleteBMI,
  getBMIStats
};
