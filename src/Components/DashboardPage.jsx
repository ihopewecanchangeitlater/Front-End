import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataSection from "./DataSection";
import InfoSection from "./InfoSection";
import Button from "@mui/material/Button";

function DashboardPage({ user, isAgent }) {
	const navigate = useNavigate();
	useEffect(() => {
		// Ελέγχει αν υπάρχει ήδη συνδεδεμένος χρήστης
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/");
		}
	}, [navigate]);
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<Button
				sx={{
					maxWidth: "8rem",
					minWidth: "4rem",
					textWrap: "nowrap",
					position: "absolute",
					top: "1rem",
				}}
				variant="contained"
				onClick={() => {
					localStorage.removeItem("token");
					navigate("/");
				}}
			>
				Sing Out
			</Button>
			<div className="h-full w-full px-10 md:text-xl text-sm flex justify-between">
				<DataSection />
				<InfoSection isAgent={isAgent} />
			</div>
		</div>
	);
}

export default DashboardPage;
