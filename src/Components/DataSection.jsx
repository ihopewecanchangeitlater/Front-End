import { useState, useEffect } from "react";
import axios from "axios";
import Filters from "./Filters";
import DataTable from "./DataTable";

function DataSection() {
	const [filters, setFilters] = useState({});
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	// Function to fetch data based on filters
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.get("http://127.0.0.1:8080/cars/search", {
				params: filters, // Send filters as query parameters
			});
			response.data.sort((a, b) => (a.brand > b.brand ? 1 : -1));
			setData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};
	// Fetch data when filters are updated
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<Filters
				filters={filters}
				setFilters={setFilters}
				fetchData={fetchData}
			/>
			<DataTable data={data} loading={loading} />
		</>
	);
}

export default DataSection;
