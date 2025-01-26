import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataSection from "./DataSection";
import InfoSection from "./InfoSection";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useToken from "../Hooks/useToken";
import useFetch from "../Hooks/useFetch";
import { AUTH_LOGOUT_URL } from "../Utils/Endpoints";

function DashboardPage() {
	const { token } = useToken();
	const [user, setUser] = useState(null);
	const [isAgent, setIsAgent] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const { refetch } = useFetch(`${AUTH_LOGOUT_URL}`, { method: "post" }, false);
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
				<div className="h-full w-full px-10 md:text-xl text-sm flex justify-between">
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
