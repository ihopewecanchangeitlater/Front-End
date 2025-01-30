import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataSection, InfoSection } from "../Containers";
import { useToken, useFetch } from "../../Hooks";
import { Endpoints } from "../../Utils";
import { Button, Typography } from "@mui/material";

function DashboardPage() {
	const { token } = useToken();
	const [user, setUser] = useState(null);
	const [isAgent, setIsAgent] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const { refetch } = useFetch(
		`${Endpoints.AUTH_LOGOUT_URL}`,
		{ method: "post", requiresAuth: false },
		false
	);
	const navigate = useNavigate();

	useEffect(() => {
		// Ελέγχει αν υπάρχει ήδη συνδεδεμένος χρήστης
		if (!token) {
			navigate("/");
		} else {
			const user = JSON.parse(sessionStorage.getItem("user"));
			setUser(user);
			setIsAgent(user.roles[0] === "AGENCY");
		}
	}, [token, navigate]);

	const signOutHandler = () => {
		refetch();
		sessionStorage.clear();
		navigate("/");
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
			{isAgent != null && user && (
				<div className="h-full w-full ps-10 pe-2 md:text-xl text-sm flex justify-between">
					<DataSection isAgent={isAgent} userId={user?.afm} refresh={refresh} />
					<InfoSection
						show={isAgent}
						userId={user?.afm}
						setRefresh={setRefresh}
					/>
				</div>
			)}
		</div>
	);
}

export default DashboardPage;
