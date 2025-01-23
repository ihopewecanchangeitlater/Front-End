import axios from "axios";

const API_URL = "http://localhost:8080"; // Λογικά αυτό είναι το σωστό URL του backend

export const userLogin = (body) => {
	return new Promise((resolve, reject) => {
		axios.post(`${API_URL}/api/auth/login`, body).then(resolve).catch(reject);
	});
};

export const userSignOut = () => {
	axios.post(`${API_URL}/api/auth/logout`).catch((error) => console.log);
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
