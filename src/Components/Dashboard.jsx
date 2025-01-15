import DataSection from "./DataSection";
import InfoSection from "./InfoSection";

function Dashboard() {
	return (
		<div className="h-full px-10 md:text-xl text-sm flex justify-between">
			<DataSection />
			<InfoSection />
		</div>
	);
}

export default Dashboard;
