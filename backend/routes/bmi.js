const express = require('express');
const { body } = require('express-validator');
const { addBMI, getBMIHistory, getLatestBMI, deleteBMI, getBMIStats } = require('../controllers/bmiController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const bmiValidation = [
  body('weight').isNumeric().withMessage('Weight must be a number').isFloat({ min: 1 }).withMessage('Weight must be greater than 0'),
  body('height').isNumeric().withMessage('Height must be a number').isFloat({ min: 1 }).withMessage('Height must be greater than 0'),
  body('age').isInt({ min: 1, max: 150 }).withMessage('Age must be between 1 and 150')
];

// All routes require authentication
router.use(auth);

// Routes
router.post('/', bmiValidation, addBMI);
router.get('/history', getBMIHistory);
router.get('/latest', getLatestBMI);
router.get('/stats', getBMIStats);
router.delete('/:id', deleteBMI);

module.exports = router;
