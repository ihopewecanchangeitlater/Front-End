import axios from "axios";

const API_URL = "http://localhost:8080"; // Λογικά αυτό είναι το σωστό URL του backend

// Λήψη της εγγραφής του αυτοκινήτου ανάλογα με το ID του
export const getCarById = async (carId) => {
  return await axios.get(`${API_URL}/cars/${carId}`);
};

// Ενημέρωση της ποσότητας του αυτοκινήτου στη βάση (αντοπροσωπεία)
export const updateCarQuantity = async (carId, quantity) => {
  return await axios.patch(`${API_URL}/cars/updateQuantity/${carId}`, quantity);
};

// Ενημέρωση της ποσότητας των αυτοκινήτων μετά την αγορά (Πολίτης)
export const buyCar = async (carId) => {
  const car = await getCarById(carId);
  const newQuantity = car.data.quantity - 1;
  return await updateCarQuantity(carId, { quantity: newQuantity });
};
