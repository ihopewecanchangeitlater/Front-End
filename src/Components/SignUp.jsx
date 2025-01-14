import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onLoginClick }) {
  const [formData, setFormData] = useState({
    afm: '',
    name: '',
    owner: '',
    email: '',
    password: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/dealer/signup', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setStatusMessage(response.data);
      setFormData({ afm: '', name: '', owner: '', email: '', password: '' });
    } catch (error) {
      setStatusMessage('Error during signup!');
    }
  };

  return (
    <div>
      <h3>Signup</h3>
      <table>
        <tbody>
          <tr>
            <td>AFM:</td>
            <td><input type="text" id="afm" value={formData.afm} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Name:</td>
            <td><input type="text" id="name" value={formData.name} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Owner:</td>
            <td><input type="text" id="owner" value={formData.owner} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td><input type="text" id="email" value={formData.email} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input type="password" id="password" value={formData.password} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <button onClick={signup}>Signup</button>
      <div>{statusMessage}</div>
      <p>
        Already have an account? <button onClick={onLoginClick}>Login</button>
      </p>
    </div>
  );
}

export default Signup;
