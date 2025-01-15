import { useState } from "react";
import DealerOperations from "./DealerOperations";
import Calendar from "./Calendar";

function InfoSection() {
	const [date, setDate] = useState(new Date());
	const isDealer = sessionStorage.getItem("isDealer");
	return (
		<div className="ms-4 min-w-fit">
			{isDealer && <DealerOperations />}
			<Calendar />
		</div>
	);
}

export default InfoSection;
