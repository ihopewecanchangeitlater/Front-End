import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataSection from "./DataSection";
import InfoSection from "./InfoSection";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { userSignOut } from "../Services/api";

function DashboardPage() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		// Ελέγχει αν υπάρχει ήδη συνδεδεμένος χρήστης
		const token = sessionStorage.getItem("token");
		if (!token) {
			navigate("/", { replace: true });
		} else {
			setUser(JSON.parse(sessionStorage.getItem("user")));
		}
	}, [navigate]);
	
	const signOutHandler = () => {
		userSignOut();
		sessionStorage.removeItem("token");
		navigate("/", { replace: true });
	};

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
					{`${user?.name} ${user?.owner ? user?.owner : user?.surname} - (${
						user?.email
					})`}
				</Typography>
				<Button
					sx={{
						maxWidth: "8rem",
						minWidth: "4rem",
						textWrap: "nowrap",
					}}
					variant="contained"
					onClick={signOutHandler}
				>
					Sing Out
				</Button>
			</div>
			<div className="h-full w-full px-10 md:text-xl text-sm flex justify-between">
				<DataSection />
				{/* <InfoSection show={isAgent} /> */}
			</div>
		</div>
	);
}

export default DashboardPage;
