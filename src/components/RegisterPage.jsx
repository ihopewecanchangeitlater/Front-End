import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080"; // Η URL του backend

const RegisterPage = ({ setUser, setIsAgent }) => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    afm: '',
    owner: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Για εμφάνιση κωδικού
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/${role === 'citizen' ? 'citizens' : 'agencies'}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsAgent(role === 'agent');
        navigate('/dashboard');
      } else {
        alert('Registration failed.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <button
          onClick={() => setRole('citizen')}
          className={`px-4 py-2 rounded-md mr-2 ${
            role === 'citizen' ? 'bg-green-500' : 'bg-blue-500'
          } text-white`}
        >
          Πολίτης
        </button>
        <button
          onClick={() => setRole('agent')}
          className={`px-4 py-2 rounded-md ${
            role === 'agent' ? 'bg-green-500' : 'bg-blue-500'
          } text-white`}
        >
          Αντιπρόσωπος
        </button>
      </div>

      {role && (
        <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">AFM:</label>
            <input
              type="number"
              name="afm"
              value={formData.afm}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {role === 'citizen' ? 'Surname:' : 'Owner Name:'}
            </label>
            <input
              type="text"
              name={role === 'citizen' ? 'surname' : 'owner'}
              value={role === 'citizen' ? formData.surname : formData.owner}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Πίσω
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
