import { DataTable, Filters } from "../Elements";
import { useFetch } from "../../Hooks";
import { Endpoints } from "../../Utils";

function DataSection({ isAgent, userId, refresh }) {
	const { data, loading, refetch } = useFetch(
		Endpoints.CARS_SEARCH_URL,
		{
			method: "get",
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
