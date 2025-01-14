import React from "react";
import CarPage from "./CarPage";

const DashboardPage = () => {
  const isAgent = false; // Αλλάζει ανάλογα με τον χρήστη.
  const carId = 1; // Παράδειγμα ID.

  return (
    <div>
      <h1>Dashboard</h1>
      <CarPage isAgent={isAgent} carId={carId} />
    </div>
  );
};

export default DashboardPage;
