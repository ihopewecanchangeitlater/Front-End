import { createContext, useContext, useState } from "react";
import AlertBox from "../Components/Elements/AlertBox";

const AlertContext = createContext();

export function AlertProvider({ children }) {
	const [alert, setAlert] = useState(null);

	const showAlert = (message, type = "info") => {
		setAlert({ message, type });
		setTimeout(() => setAlert(null), 3000); // Auto-close after 3 seconds
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{children}
			{alert && <AlertBox message={alert.message} type={alert.type} />}
		</AlertContext.Provider>
	);
}

export function useAlert() {
	return useContext(AlertContext);
}
