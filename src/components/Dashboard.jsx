import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, isAgent }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h2>Καλώς ήλθες, {user.name}</h2>
      <p>{isAgent ? 'Είσαι Αντιπρόσωπος' : 'Είσαι Πολίτης'}</p>
      <button onClick={() => navigate('/login')}>Logout</button>
    </div>
  );
};

export default Dashboard;
