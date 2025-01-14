import axios from "axios";

const API_URL = "http://localhost:8080"; // Είναι το σωστό URL του backend;

export const getCarById = async (carId) => {
  return await axios.get(`${API_URL}/cars/${carId}`);
};

export const updateCarQuantity = async (carId, quantity) => {
  return await axios.patch(`${API_URL}/cars/updateQuantity/${carId}`, quantity);
};


export const buyCar = async (carId) => {
  const car = await getCarById(carId);
  const newQuantity = car.data.quantity - 1;
  return await updateCarQuantity(carId, { quantity: newQuantity });
};
