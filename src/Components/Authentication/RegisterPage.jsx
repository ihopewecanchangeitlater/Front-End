import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import useFetch from "../../Hooks/useFetch";
import { AUTH_REGISTER_URL } from "../../Utils/Endpoints";

const RegisterPage = () => {
	const [role, setRole] = useState("");
	const [formData, setFormData] = useState({});
	const [showPassword, setShowPassword] = useState(false); // Για εμφάνιση κωδικού
	const navigate = useNavigate();
	const { data, loading, error, refetch } = useFetch(
		`${AUTH_REGISTER_URL}`,
		{ method: "post", requiresAuth: false },
		false
	);

	useEffect(() => {
		if (!loading && data) {
			navigate("/login");
		} else if (!loading && error) {
			alert(`Registration failed: ${error.message ? error.message : error}`);
		}
	}, [data, loading, error]);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		refetch({ data: formData }, [role]);
	};
	return (
		<div className="relative top-12 flex flex-col justify-center items-center bg-gray-100 pt-4 pb-10 px-6 mx-20 rounded-lg w-1/2 h-min">
			<h2 className="text-2xl font-bold mb-4">Register</h2>
			<div className="mb-4">
				<button
					onClick={() => setRole("citizen")}
					className={`px-4 py-2 rounded-md mr-2 ${
						role === "citizen" ? "bg-green-500" : "bg-blue-500"
					} text-white`}
				>
					CITIZEN
				</button>
				<button
					onClick={() => setRole("agency")}
					className={`px-4 py-2 rounded-md ${
						role === "agency" ? "bg-green-500" : "bg-blue-500"
					} text-white`}
				>
					AGENCY
				</button>
			</div>

			{role && (
				<form
					onSubmit={handleRegister}
					className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
				>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							AFM:
						</label>
						<input
							type="text"
							name="afm"
							value={formData.afm || ""}
							onChange={handleInputChange}
							required
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
						/>
					</div>
					<div className="flex gap-4">
						<div className="mb-4 w-full">
							<label className="block text-sm font-medium text-gray-700">
								Name:
							</label>
							<input
								type="text"
								name="name"
								value={formData.name || ""}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
							/>
						</div>
						<div className="mb-4 w-full">
							<label className="block text-sm font-medium text-gray-700">
								{role === "citizen" ? "Surname:" : "Owner Name:"}
							</label>
							<input
								type="text"
								name={role === "citizen" ? "surname" : "owner"}
								value={
									role === "citizen"
										? formData.surname
										: role !== ""
										? formData.owner
										: ""
								}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="mb-4 w-full">
							<label className="block text-sm font-medium text-gray-700">
								Email:
							</label>
							<input
								type="email"
								name="email"
								value={formData.email || ""}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
							/>
						</div>
						<div className="mb-4 w-full">
							<label className="block text-sm font-medium text-gray-700">
								Password:
							</label>
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password || ""}
								onChange={handleInputChange}
								required
								className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
							/>
							<IconButton
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								color="primary"
								className="mt-2 absolute left-[82.5%] bottom-10"
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
					</div>
					<div className="flex justify-between">
						<button
							type="button"
							onClick={() => navigate("/")}
							className="bg-gray-500 text-white px-4 py-2 rounded-md"
						>
							Back
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded-md"
						>
							Register
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default RegisterPage;
