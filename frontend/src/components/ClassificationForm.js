import React, { useState } from 'react';
import axios from 'axios'; // You'll need to install axios: npm install axios

function ClassificationForm({ onClassify }) {
  const [formData, setFormData] = useState({
    u: '',
    g: '',
    r: '',
    i: '',
    z: '',
    redshift: '',
    spec_obj_ID: '', // Add these fields
    plate: '',
    MJD: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      onClassify(response.data);
    } catch (error) {
      console.error('Error classifying:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Stellar Data</h2>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key.toUpperCase()}:</label>
          <input
            type="number"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Classify</button>
    </form>
  );
}

export default ClassificationForm;
