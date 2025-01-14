import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import CarPage from "./components/CarPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/car/:carId" element={<CarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
