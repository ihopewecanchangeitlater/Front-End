import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, isAgent }) => {
  const navigate = useNavigate();

  // Αν δεν υπάρχει χρήστης, ανακατευθύνει στην σελίδα σύνδεσης
  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Καλώς ήλθες, {user.name}</h2>
      <p className="mb-4 text-lg">
        {isAgent ? 'Είσαι Αντιπρόσωπος' : 'Είσαι Πολίτης'}
      </p>

      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Αποσύνδεση
      </button>
    </div>
  );
};

export default Dashboard;
