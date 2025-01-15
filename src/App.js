import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

function App() {
  // Ορίζουμε το state για τον χρήστη και τον ρόλο του (πολίτης ή αντιπρόσωπος)
  const [user, setUser] = useState(null); 
  const [isAgent, setIsAgent] = useState(false); 

  return (
    <Router>
      <Routes>
      {/* Δίνουμε τις συναρτήσεις setUser και setIsAgent ως props στο LoginPage */}
      <Route
          path="/login"
          element={<LoginPage setUser={setUser} setIsAgent={setIsAgent} />}
        />
        {/* Δίνουμε τις συναρτήσεις setUser και setIsAgent ως props στο RegisterPage */}
        <Route
          path="/register"
          element={<RegisterPage setUser={setUser} setIsAgent={setIsAgent} />}
        />
        {/* Δίνουμε τις συναρτήσεις setUser και setIsAgent ως props στο LoginPage */}
        <Route
          path="/"
          element={<LoginPage setUser={setUser} setIsAgent={setIsAgent} />}
        />
        {/* Μπορείς να χρησιμοποιήσεις το state του χρήστη και του ρόλου του στην σελίδα Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard user={user} isAgent={isAgent} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
