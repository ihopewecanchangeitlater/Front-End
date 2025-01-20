import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataSection from "./DataSection";
import InfoSection from "./InfoSection";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DashboardPage({ user }) {
	const [isAgent, setIsAgent] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		// Ελέγχει αν υπάρχει ήδη συνδεδεμένος χρήστης
		const token = sessionStorage.getItem("token");
		if (!token) {
			navigate("/");
		} else {
			setIsAgent(token.split(":")[0] === "true");
		}
	}, [navigate]);
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<div className="absolute top-7 right-8">
				<Typography
					sx={{
						marginRight: "1.5rem",
						color: "white",
						textTransform: "uppercase",
					}}
					className="text-xl"
					variant="p"
				>
					{sessionStorage.getItem("email")}
				</Typography>
				<Button
					sx={{
						maxWidth: "8rem",
						minWidth: "4rem",
						textWrap: "nowrap",
					}}
					variant="contained"
					onClick={() => {
						sessionStorage.removeItem("token");
						navigate("/");
					}}
				>
					Sing Out
				</Button>
			</div>
			<div className="h-full w-full px-10 md:text-xl text-sm flex justify-between">
				<DataSection />
				<InfoSection show={isAgent} />
			</div>
		</div>
	);
}

export default DashboardPage;
