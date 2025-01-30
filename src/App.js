import "./App.css";
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { LoginPage, RegisterPage } from "./Components/Authentication";
import { DashboardPage, CarPage } from "./Components/Pages";
import { AlertProvider } from "./Utils/AlertContext";

function App() {
	return (
		<AlertProvider>
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
		</AlertProvider>
	);
}

export default App;
