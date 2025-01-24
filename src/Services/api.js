import axios from "axios";

const API_URL = "http://localhost:8080"; // Λογικά αυτό είναι το σωστό URL του backend
const REQUEST_HEADERS = {
	Authorization: `Bearer ${sessionStorage.getItem("token")}`,
};

const fetchData = async (url, options) => {
	const params = {
		url: `${process.env.REACT_APP_API_BASE_URL}${url}`,
		...options,
	};
	return await axios(params);
};

export const userLogin = async (data) => {
	return await fetchData(process.env.REACT_APP_LOGIN_URL, {
		method: "post",
		data,
	});
};

export const userSignOut = () => {
	axios.post(`${API_URL}/api/auth/logout`).catch((error) => console.log);
};

export const getTableData = async (filters) => {
	return await axios.get(`${API_URL}/api/cars/search`, {
		headers: REQUEST_HEADERS,
		params: filters,
	});
};

// Λήψη της εγγραφής του αυτοκινήτου ανάλογα με το ID του
export const getCarById = async (carId) => {
	return await axios.get(`${API_URL}/api/cars/${carId}`);
};

// Ενημέρωση της ποσότητας του αυτοκινήτου στη βάση (αντοπροσωπεία)
export const updateCarQuantity = async (carId, quantity) => {
	return await axios.patch(
		`${API_URL}/api/cars/updateQuantity/${carId}`,
		quantity
	);
};

// Ενημέρωση της ποσότητας των αυτοκινήτων μετά την αγορά (Πολίτης)
export const buyCar = async (carId) => {
	const car = await getCarById(carId);
	const newQuantity = car.data.quantity - 1;
	return await updateCarQuantity(carId, { quantity: newQuantity });
};
