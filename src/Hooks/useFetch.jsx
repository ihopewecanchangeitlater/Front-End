import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useToken from "./useToken";
import { Endpoints } from "../Utils";

axios.defaults.baseURL = Endpoints.BASE_URL;

const useFetch = (url, options = {}, immediate = true) => {
	const { token } = useToken();
	const [data, setData] = useState(null); // Response data
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState(null); // Error state

	// Function to execute the fetch request
	const fetchData = useCallback(
		async (requestOptions = {}, pathVariables = []) => {
			setLoading(true);
			setError(null);
			try {
				// Check if the request requires authentication
				const requiresAuth = options.requiresAuth || true;
				const authHeaders =
					requiresAuth && token ? { Authorization: `Bearer ${token}` } : {};
				const params = {
					url: `${url}${
						pathVariables.length > 0 ? "/" + pathVariables.join("/") : ""
					}`,
					...options,
					headers: {
						...authHeaders,
					},
					...requestOptions,
				};
				console.log(params);
				const response = await axios(params);
				setData(response.data);
			} catch (err) {
				console.log(err);
				setError(err.response ? err.response.data : err.message);
			} finally {
				setLoading(false);
			}
		},
		[url, options, token]
	);

	// Trigger the fetch request on mount if `immediate` is true
	useEffect(() => {
		if (immediate) {
			fetchData();
		}
	}, []);

	return { data, loading, error, refetch: fetchData };
};

export default useFetch;
