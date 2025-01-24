import { useEffect, useState } from "react";
import Filters from "./Filters";
import DataTable from "./DataTable";
import useFetch from "../Hooks/useFetch";
import { CARS_SEARCH_URL } from "../Utils/Endpoints";

function DataSection({ isAgent, userId }) {
	const [initialParams, setInitialParams] = useState({});
	const { data, loading, error, refetch } = useFetch(
		CARS_SEARCH_URL,
		{
			method: "get",
			requiresAuth: true,
			params: initialParams,
		},
		false
	);
	useEffect(() => {
		if (isAgent) setInitialParams({ agency: userId });
	}, [isAgent, userId]);
	return (
		<>
			<Filters fetchData={refetch} initialParams={initialParams} />
			<DataTable data={data} loading={loading} />
		</>
	);
}

export default DataSection;
