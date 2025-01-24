import "./App.css";
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import DashboardPage from "./Components/DashboardPage";
import CarPage from "./Components/CarPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Navigate to="/" />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/car/:carId" element={<CarPage />} />
			</Routes>
		</Router>
	);
}

export default App;
