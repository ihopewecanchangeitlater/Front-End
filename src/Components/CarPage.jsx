import React, { useState, useEffect } from "react";
import { getCarById, updateCarQuantity, buyCar } from "../Services/api";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import moment from "moment";
import Loading from "./Loading";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	borderRadius: "0.75rem",
};

const CarPage = ({ token }) => {
	const params = useParams();
	const { carId } = params;
	const [car, setCar] = useState(null); // Πληροφορίες αυτοκινήτου
	const [quantity, setQuantity] = useState(0); // Τρέχουσα ποσότητα από τη βάση
	const [newQuantity, setNewQuantity] = useState(0); // Τοπική ποσότητα για εισαγωγή
	const [testDriveCars, setTestDriveCars] = useState(0); // Αριθμός αυτοκινήτων σε test drive
	const [isModalVisible, setIsModalVisible] = useState(false); // Αριθμός αυτοκινήτων σε test drive
	const [date, setDate] = useState(""); // Τοπική ποσότητα για εισαγωγή
	const [time, setTime] = useState(""); // Αριθμός αυτοκινήτων σε test drive
	const [isAgent, setIsAgent] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchCar = async () => {
			try {
				const response = await getCarById(carId);
				setCar(response.data);
				setQuantity(response.data.quantity); // Τρέχουσα ποσότητα
				setNewQuantity(response.data.quantity); // Τοπική ποσότητα αρχικά ίδια με την τρέχουσα
			} catch (error) {
				console.error("Error fetching car:", error);
			}
		}; // Ελέγχει αν υπάρχει ήδη συνδεδεμένος χρήστης
		const token = sessionStorage.getItem("token");
		if (!token) {
			navigate("/");
		} else {
			setIsAgent(token.split(":")[0] === "true");
			fetchCar();
		}
	}, [carId, navigate]);

	// Ενημέρωση ποσότητας αυτοκινήτων στην βάση
	const handleUpdateQuantity = async () => {
		try {
			await updateCarQuantity(carId, { quantity: newQuantity });
			setQuantity(newQuantity); // Ενημέρωση της τρέχουσας ποσότητας μόνο μετά την επιτυχή αποστολή
			alert("Quantity updated successfully!");
		} catch (error) {
			console.error("Error updating quantity:", error);
		}
	};

	// Λειτουργία Test Drive (παίρνει ΜΟΝΟ ένα αμάξι για test drive)
	const handleTestDrive = async () => {
		const response = await axios.post(
			"http://localhost:8080/api/reservations",
			{
				carId: car.id,
				citizenId: sessionStorage.getItem("token").split(":")[1],
				date: date,
				time: time,
			}
		);
		if (response.status === 200) {
			alert("Test Drive arranged successfully");
		} else {
			alert("Test Drive arrangment failed");
		}
	};

	// Αγορά αυτοκινήτου (μείωση της ποσότητας κατά 1)
	// Εάν έχει αυτοκίνητο σε test drive, δεν μπορεί να αγοράσει άλλο
	const handleBuyCar = async () => {
		if (testDriveCars > 0) {
			alert("You must return the test drive car before buying!");
			return;
		}

		if (quantity > 0) {
			try {
				await buyCar(carId);
				setQuantity(quantity - 1); // Μείωση της ποσότητας κατά 1
				alert("Car bought successfully!");
			} catch (error) {
				console.error("Error buying car:", error);
			}
		} else {
			alert("No cars available for purchase!");
		}
	};

	// Επιστροφή αμαξιού από test drive
	const handleCarReturn = () => {
		if (testDriveCars > 0) {
			setQuantity(quantity + 1);
			setTestDriveCars(testDriveCars - 1);
			alert("Car returned successfully!");
		} else {
			alert("No cars to return!");
		}
	};

	const handleCancel = () => {
		navigate("/dashboard"); // Επιστροφή στο Dashboard (όταν έχει κάτι να επιστρέψει)
	};

	if (!car) return <Loading />;

	// Εδώ προστέθηκε Talwind CSS
	return (
		<div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 mx-4 rounded-lg h-full w-10/12">
			{/* Πληροφορίες Αυτοκινήτου */}
			<div className="grid grid-cols-2 grid-rows-5 items-center justify-items-center bg-beige-200 p-4 rounded-lg shadow-md flex-grow">
				<Typography variant="h4" className="col-span-2 justify-self-center">
					{car.brand} {car.model}
				</Typography>
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Typography>Fuel Type:</Typography>
					<input
						className="text-center"
						type="text"
						disabled
						value={car.fuel}
					/>
				</div>
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Typography>Engine (cc):</Typography>
					<input
						className="text-center"
						type="text"
						disabled
						value={car.engine}
					/>
				</div>
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Typography>Seats:</Typography>
					<input
						className="text-center"
						type="text"
						disabled
						value={car.seats}
					/>
				</div>
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Typography>Price ($):</Typography>
					<input
						className="text-center"
						type="text"
						disabled
						value={car.price}
					/>
				</div>
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Typography>Additional Info:</Typography>
					<textarea
						className="text-center"
						type="text"
						disabled
						value={car.additionalInfo ? car.additionalInfo : ""}
					/>
				</div>
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Typography>Quantity:</Typography>
					<input
						className="text-center"
						type="text"
						disabled
						value={quantity}
					/>
				</div>
				<Typography className="col-span-2 justify-self-center">
					Cars in Test Drive: {testDriveCars}
				</Typography>
			</div>

			{/* Κουμπιά */}
			<div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
				{isAgent ? (
					<div>
						<h2 className="text-xl font-semibold mb-2">Update Quantity</h2>
						<input
							className="text-center border p-2 rounded-md w-full mb-2"
							type="number"
							value={newQuantity}
							onChange={(e) => setNewQuantity(Number(e.target.value))}
						/>
						<button
							onClick={handleUpdateQuantity}
							className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 w-full"
						>
							OK
						</button>
					</div>
				) : (
					<div className="flex gap-4 h-12">
						<button
							onClick={handleBuyCar}
							className="w-24 bg-green-500 text-white px-4 py-2 rounded-md"
						>
							Buy
						</button>
						<button
							onClick={() => {
								setIsModalVisible(true);
							}}
							className="text-nowrap w-24 bg-yellow-500 text-white px-4 py-2 rounded-md"
						>
							Test Drive
						</button>
					</div>
				)}

				{/* Εμφάνιση του κουμπιού Car Return μόνο αν δεν είναι agent */}
				{!isAgent && (
					<button
						onClick={handleCarReturn}
						className="bg-red-500 text-white px-4 py-2 rounded-md"
					>
						Car Return
					</button>
				)}

				<button
					onClick={handleCancel}
					className="bg-blue-500 text-white px-4 py-2 rounded-md"
				>
					Back
				</button>
			</div>
			<Modal
				open={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ alignSelf: "center" }}
					>
						Test Drive {`${car.brand} ${car.model}`}
					</Typography>
					<Typography
						id="modal-modal-description"
						sx={{ mt: 2, alignSelf: "center" }}
					>
						Set time and date for the test drive
					</Typography>
					<input
						className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
						type="date"
						onChange={(e) => {
							setDate(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
						}}
					/>
					<input
						className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
						type="time"
						onChange={(e) => {
							setTime(`${e.target.value}:00`);
						}}
					/>
					<Button
						sx={{ width: "50%", alignSelf: "center", mt: 2 }}
						variant="contained"
						onClick={() => {
							handleTestDrive();
							setIsModalVisible(false);
						}}
					>
						Book
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default CarPage;
