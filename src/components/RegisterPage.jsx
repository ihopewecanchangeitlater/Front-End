import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch(`/api/${role === 'citizen' ? 'citizens' : 'agencies'}/register`, {
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Πολίτης
        </button>
        <button
          onClick={() => setRole('agent')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
            <label className="block text-sm font-medium text-gray-700">Surname:</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {role === 'agent' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Owner Name:</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
