import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import CarPage from "./Components/CarPage";

function App() {
  	sessionStorage.setItem("isDealer", true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/car/:carId" element={<CarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
