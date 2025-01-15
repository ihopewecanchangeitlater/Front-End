import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080"; // Η URL του backend

const LoginPage = ({ setUser, setIsAgent }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Για εμφάνιση/απόκρυψη κωδικού
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Κατάσταση φόρτωσης
  const navigate = useNavigate();

  useEffect(() => {
    // Ελέγχει αν υπάρχει ήδη συνδεδεμένος χρήστης
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Ενεργοποίηση loader
  
    try {
      console.log("Request body:", {
        email: email,
        password: password,
      });
  
      const queryString = new URLSearchParams({
        email: email,
        password: password
      }).toString();
  
      // Στέλνουμε το αίτημα με τα δεδομένα στην URL
      const response = await fetch(`${API_URL}/api/auth/login?${queryString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setLoading(false); // Σταματάμε το loader
  
      if (!response.ok) {
        // Αν η απόκριση δεν είναι ok, προσπαθούμε να διαβάσουμε το μήνυμα λάθους
        const errorMessage = await response.text(); // Λαμβάνουμε το λάθος ως απλό κείμενο
        setError(errorMessage || 'An error occurred. Please try again.'); // Εμφανίζουμε το μήνυμα
        return; // Σταματάμε τη συνάρτηση αν υπάρχει σφάλμα
      }
  
      const data = await response.json();
  
      setUser(data.user);
      setIsAgent(data.isAgent);
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false); // Σταματάμε το loader
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
