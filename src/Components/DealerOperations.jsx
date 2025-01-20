import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "60%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 2,
	display: "flex",
	flexDirection: "column",
	borderRadius: "0.75rem",
};

function DealerOperations() {
	const [value, setValue] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios.post(
			"http://localhost:8080/api/cars/addcar/" +
				sessionStorage.getItem("token").split(":")[1],
			{
				body: JSON.stringify({
					brand: event.brand,
					model: event.model,
					fuel: value,
					engine: event.engine,
					seats: event.seats,
					price: event.price,
					quantity: event.quantity,
					additionalInfo: event.additionalInfo,
				}),
			}
		);
		if (response.data) alert("Car added successfully");
		else alert("Car failed to add");
		setOpenModal(false);
	};
	return (
		<>
			<IconButton
				sx={{
					minWidth: "fit",
					position: "absolute",
					bottom: "1rem",
				}}
				color="primary"
				onClick={() => {
					console.log("clicked");
					setOpenModal(true);
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="size-20"
				>
					<path
						fillRule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
						clipRule="evenodd"
					/>
				</svg>
			</IconButton>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ alignSelf: "center", textWrap: "nowrap", width: "fit" }}
					>
						ADD A NEW CAR
					</Typography>
					<Typography
						id="modal-modal-description"
						sx={{
							mt: 2,
							mb: 4,
							alignSelf: "center",
							textWrap: "nowrap",
							width: "fit",
						}}
					>
						Complete the following form to create a new car entry
					</Typography>
					<form
						id="carForm"
						className="flex flex-col w-full justify-center text-center"
						onSubmit={handleSubmit}
					>
						<div className="flex justify-center">
							<div className="flex flex-col w-1/2">
								<label htmlFor="brand">Brand</label>
								<input
									className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
									type="text"
									name="brand"
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<label htmlFor="model">Model</label>
								<input
									className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
									type="text"
									name="model"
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="flex flex-col w-1/2">
								<label htmlFor="fuel">Fuel</label>
								<select
									className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
									type="selection"
									name="fuel"
									form="carForm"
									value={value}
									onChange={setValue}
								>
									<option value="" disabled>
										-- Select Fuel --
									</option>
									<option value="Petrol">Petrol</option>
									<option value="Diesel">Diesel</option>
									<option value="Electric">Electric</option>
								</select>
							</div>
							<div className="flex flex-col w-1/2">
								<label htmlFor="engine">Engine</label>
								<input
									className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
									type="number"
									name="engine"
									min="800"
									max="5000"
									step="50"
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="flex flex-col w-1/2">
								<label htmlFor="seats">Seats</label>
								<input
									className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
									type="number"
									name="seats"
									min="0"
									max="8"
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<label htmlFor="quantity">Quantity</label>
								<input
									className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
									type="number"
									name="quantity"
									min="0"
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="flex flex-col w-1/2">
								<label htmlFor="price">Price</label>
								<input
									className="w-1/2 text-center self-center m-2 border-2 rounded-xl p-2"
									type="number"
									name="price"
									min="0"
									step="0.01"
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<label htmlFor="information">Additional information</label>
								<textarea
									className="w-1/2 self-center m-2 border-2 rounded-xl p-2"
									type="text"
									name="information"
								/>
							</div>
						</div>
						<Button
							sx={{
								width: "20%",
								height: "3rem",
								alignSelf: "center",
								mt: 4,
								mb: 2,
							}}
							variant="contained"
							type="submit"
						>
							Create
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
}

export default DealerOperations;
