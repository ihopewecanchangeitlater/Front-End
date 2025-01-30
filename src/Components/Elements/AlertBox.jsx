import { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function AlertBox({ message, type = "info" }) {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	const handleClose = () => {
		setIsVisible(false);
	};

	return (
		<div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-auto">
			<Alert severity={type} onClose={handleClose} className="shadow-lg">
				<AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
				{message}
			</Alert>
		</div>
	);
}
