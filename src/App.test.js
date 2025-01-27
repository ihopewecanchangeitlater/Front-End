import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the components used in the routes
jest.mock("./Components/Authentication", () => ({
	LoginPage: () => <div>Login Page</div>,
	RegisterPage: () => <div>Register Page</div>,
}));

jest.mock("./Components/Pages", () => ({
	DashboardPage: () => <div>Dashboard Page</div>,
	CarPage: ({ carId }) => <div>Car Page - Car ID: {carId}</div>,
}));

describe("App Routing", () => {
	test("redirects unknown routes to the home page", () => {
		render(
			<MemoryRouter initialEntries={["/unknown"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Login Page")).toBeInTheDocument();
	});

	test("redirects root path '/' to '/login'", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Login Page")).toBeInTheDocument();
	});

	test("renders the LoginPage component for '/login'", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Login Page")).toBeInTheDocument();
	});

	test("renders the RegisterPage component for '/register'", () => {
		render(
			<MemoryRouter initialEntries={["/register"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Register Page")).toBeInTheDocument();
	});

	test("renders the DashboardPage component for '/dashboard'", () => {
		render(
			<MemoryRouter initialEntries={["/dashboard"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
	});

	test("renders the CarPage component for '/car/:carId'", () => {
		render(
			<MemoryRouter initialEntries={["/car/123"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Car Page - Car ID:")).toBeInTheDocument();
	});
});
