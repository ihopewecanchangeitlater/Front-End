import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import useToken from "../../Hooks/useToken";
import useFetch from "../../Hooks/useFetch";
import { AUTH_LOGIN_URL } from "../../Utils/Endpoints";

const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { token, setToken } = useToken();
	const { data, error, loading, refetch } = useFetch(
		AUTH_LOGIN_URL,
		{ method: "post", requiresAuth: false },
		false
	);
	useEffect(() => {
		// Ελέγχει αν υπάρχει ήδη συνδεδεμένος χρήστης
		if (token) {
			navigate("/dashboard");
		}
	}, [token, navigate]);

	useEffect(() => {
		if (data) {
			const { token, user } = data;
			// Ρυθμίζουμε τον χρήστη και τον ρόλο
			if (user.roles[0] === "AGENCY") {
				user.owner = user.customField;
			} else {
				user.surname = user.customField;
			}
			delete user.customField;
			sessionStorage.setItem("user", JSON.stringify(user));
			setToken(token);
			// Ανακατεύθυνση στο Dashboard
			navigate("/dashboard");
		}
	}, [data]);

	const handleLogin = async (e) => {
		// Παρακάμπτουμε την εκτέλεση του συμβάντος φόρμας
		e.preventDefault();
		// Κάνουμε κλήση στον εξυπηρετητή
		refetch({ data: { email: email, password: password } });
	};
	return (
		<div className="flex justify-center items-center drop-shadow-2xl h-full p-6 w-1/2">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
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
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						/>
						<IconButton
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							color="primary"
							className="mt-2 relative left-[22rem] bottom-10"
						>
							{showPassword ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="size-6"
								>
									<path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
									<path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
									<path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="size-6"
								>
									<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
									<path
										fillRule="evenodd"
										d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
										clipRule="evenodd"
									/>
								</svg>
							)}
						</IconButton>
					</div>
					{error && (
						<p className="text-red-500 text-sm">
							{error.message ? error.message : error}
						</p>
					)}
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
						disabled={loading}
					>
						{loading ? "Loading..." : "Login"}
					</button>
				</form>
				<p className="mt-4 text-center">
					Don't have an account?{" "}
					<button
						onClick={() => navigate("/register")}
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
