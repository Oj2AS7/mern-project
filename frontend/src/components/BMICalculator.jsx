import { useState, useEffect } from 'react';
import { bmiAPI } from '../services/api';

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: ''
  });
  const [latestBMI, setLatestBMI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLatestBMI();
  }, []);

  const fetchLatestBMI = async () => {
    try {
      const response = await bmiAPI.getLatestBMI();
      setLatestBMI(response.data.bmi);
    } catch (error) {
      console.error('Error fetching latest BMI:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await bmiAPI.addBMI({
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        age: parseInt(formData.age)
      });

      setLatestBMI(response.data.bmi);
      setMessage('BMI calculated and saved successfully!');
      setFormData({ weight: '', height: '', age: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error calculating BMI');
    }

    setLoading(false);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6' };
    if (bmi < 25) return { category: 'Normal weight', color: '#10B981' };
    if (bmi < 30) return { category: 'Overweight', color: '#F59E0B' };
    return { category: 'Obesity', color: '#EF4444' };
  };

  return (
    <div className="bmi-calculator">
      <div className="calculator-card">
        <h2>BMI Calculator</h2>
        
        <form onSubmit={handleSubmit} className="bmi-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                step="0.1"
                min="1"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="150"
                required
              />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Calculating...' : 'Calculate BMI'}
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        
        {latestBMI && (
          <div className="bmi-result">
            <h3>Your BMI Result</h3>
            <div className="bmi-display">
              <div className="bmi-value" style={{ color: getBMICategory(latestBMI.bmi).color }}>
                {latestBMI.bmi}
              </div>
              <div className="bmi-category" style={{ color: getBMICategory(latestBMI.bmi).color }}>
                {latestBMI.category}
              </div>
            </div>
            <div className="bmi-details">
              <p><strong>Weight:</strong> {latestBMI.weight} kg</p>
              <p><strong>Height:</strong> {latestBMI.height} cm</p>
              <p><strong>Age:</strong> {latestBMI.age} years</p>
              <p><strong>Date:</strong> {new Date(latestBMI.date).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
