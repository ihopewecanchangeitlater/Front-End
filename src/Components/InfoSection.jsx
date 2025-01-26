import DealerOperations from "./DealerOperations";
import Calendar from "./Calendar";

function InfoSection({ show, userId, setRefresh }) {
	return (
		<div className="ms-4 min-w-fit flex flex-col justify-center">
			<Calendar isAgent={show} userId={userId} />
			{show && <DealerOperations userId={userId} setRefresh={setRefresh} />}
		</div>
	);
}

export default InfoSection;
