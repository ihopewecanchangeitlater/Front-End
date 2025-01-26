import { useEffect, useState } from "react";
import Filters from "./Filters";
import DataTable from "./DataTable";
import useFetch from "../Hooks/useFetch";
import { CARS_SEARCH_URL } from "../Utils/Endpoints";

function DataSection({ isAgent, userId, refresh }) {
	const { data, loading, error, refetch } = useFetch(
		CARS_SEARCH_URL,
		{
			method: "get",
			requiresAuth: true,
		},
		false
	);
	return (
		<>
			<Filters
				fetchData={refetch}
				isAgent={isAgent}
				userId={userId}
				isLoading={loading}
				refresh={refresh}
			/>
			<DataTable data={data} loading={loading} isAgent={isAgent} />
		</>
	);
}

export default DataSection;
