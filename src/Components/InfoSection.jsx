import { useState } from "react";
import DealerOperations from "./DealerOperations";
import Calendar from "./Calendar";

function InfoSection({ isAgent }) {
	const [date, setDate] = useState(new Date());
	return (
		<div className="ms-4 min-w-fit">
			{isAgent && <DealerOperations />}
			<Calendar />
		</div>
	);
}

export default InfoSection;
