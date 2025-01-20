import DealerOperations from "./DealerOperations";
import Calendar from "./Calendar";

function InfoSection({ show }) {
	return (
		<div className="ms-4 min-w-fit">
			{show && <DealerOperations />}
			<Calendar />
		</div>
	);
}

export default InfoSection;
