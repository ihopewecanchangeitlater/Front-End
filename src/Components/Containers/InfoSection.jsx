import { DealerOperations } from "../Elements";
import { Calendar } from "../Elements";

function InfoSection({ show, userId, setRefresh }) {
	return (
		<div className="min-w-fit flex flex-col justify-center">
			<Calendar isAgent={show} userId={userId} />
			{show && <DealerOperations userId={userId} setRefresh={setRefresh} />}
		</div>
	);
}

export default InfoSection;
