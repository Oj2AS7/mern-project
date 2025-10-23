import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { bmiAPI } from '../services/api';

const BMIDashboard = () => {
  const [bmiHistory, setBmiHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [historyResponse, statsResponse] = await Promise.all([
        bmiAPI.getBMIHistory(),
        bmiAPI.getBMIStats()
      ]);
      
      setBmiHistory(historyResponse.data.bmiRecords);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBMI = async (id) => {
    if (!window.confirm('Are you sure you want to delete this BMI record?')) {
      return;
    }

    try {
      await bmiAPI.deleteBMI(id);
      setBmiHistory(bmiHistory.filter(record => record._id !== id));
      fetchData(); // Refresh stats
    } catch (error) {
      console.error('Error deleting BMI:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getBMIColor = (bmi) => {
    if (bmi < 18.5) return '#3B82F6';
    if (bmi < 25) return '#10B981';
    if (bmi < 30) return '#F59E0B';
    return '#EF4444';
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (bmiHistory.length === 0) {
    return (
      <div className="dashboard">
        <h2>BMI Dashboard</h2>
        <div className="no-data">
          <p>No BMI records found. Start by calculating your BMI!</p>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = bmiHistory.slice(0, 10).reverse().map(record => ({
    date: formatDate(record.date),
    bmi: record.bmi,
    weight: record.weight
  }));

  // Prepare pie chart data
  const categoryData = Object.entries(stats.categoryDistribution).map(([category, count]) => ({
    name: category,
    value: count,
    color: getBMIColor(category === 'Underweight' ? 18 : category === 'Normal weight' ? 22 : category === 'Overweight' ? 27 : 32)
  }));

  return (
    <div className="dashboard">
      <h2>BMI Dashboard</h2>
      
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Average BMI</h3>
            <div className="stat-value">{stats.averageBMI}</div>
          </div>
          
          <div className="stat-card">
            <h3>Trend</h3>
            <div className={`trend ${stats.trend}`}>
              {stats.trend === 'increasing' ? '📈' : stats.trend === 'decreasing' ? '📉' : '➡️'}
              {stats.trend}
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Total Records</h3>
            <div className="stat-value">{bmiHistory.length}</div>
          </div>
        </div>
      )}

      <div className="charts-grid">
        <div className="chart-card">
          <h3>BMI Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="bmi" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="history-section">
        <h3>Recent BMI Records</h3>
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight (kg)</th>
                <th>Height (cm)</th>
                <th>BMI</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bmiHistory.slice(0, 10).map(record => (
                <tr key={record._id}>
                  <td>{formatDate(record.date)}</td>
                  <td>{record.weight}</td>
                  <td>{record.height}</td>
                  <td style={{ color: getBMIColor(record.bmi) }}>{record.bmi}</td>
                  <td style={{ color: getBMIColor(record.bmi) }}>{record.category}</td>
                  <td>
                    <button 
                      onClick={() => deleteBMI(record._id)}
                      className="btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BMIDashboard;
