import Filters from "./Filters";
import DataTable from "./DataTable";
import DealerOperations from "./DealerOperations";
import Calendar from "./Calendar";

function Dashboard() {
	const isDealer = sessionStorage.getItem("isDealer");
	return (
		<div className="dashboard">
			<Filters />
			<DataTable />
			<div>
				{isDealer && <DealerOperations />}
				<Calendar />
			</div>
		</div>
	);
}

export default Dashboard;
