import { useState, useEffect } from "react";
import { useFetch } from "../../Hooks";
import { Endpoints, InputProps } from "../../Utils";
import {
	IconButton,
	Box,
	Typography,
	Modal,
	Button,
	NativeSelect,
	Input,
	InputLabel,
	FormControl,
	TextField,
	Tooltip,
} from "@mui/material";
import { useAlert } from "../../Utils/AlertContext";

const boxStyle = {
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

const inputStyle = {
	width: "80%",
	textAlign: "center",
	alignSelf: "center",
	m: 2,
};

function DealerOperations({ userId, setRefresh }) {
	const { showAlert } = useAlert();
	const [brandValue, setBrandValue] = useState("");
	const [modelValue, setModelValue] = useState("");
	const [fuelValue, setFuelValue] = useState("");
	const [engineValue, setEngineValue] = useState("");
	const [seatsValue, setSeatsValue] = useState("");
	const [quantityValue, setQuantityValue] = useState("");
	const [priceValue, setPriceValue] = useState("");
	const [infosValue, setInfosValue] = useState("");
	const [inputError, setInputError] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const { data, error, refetch } = useFetch(
		`${Endpoints.CARS_ADD_URL}/${userId}`,
		{
			method: "post",
		},
		false
	);
	const resetValues = () => {
		setBrandValue("");
		setModelValue("");
		setFuelValue("");
		setEngineValue("");
		setSeatsValue("");
		setQuantityValue("");
		setPriceValue("");
		setInfosValue("");
	};

	useEffect(() => {
		if (data) {
			showAlert("Car added successfully", "success");
			setOpenModal(false);
			resetValues();
			setRefresh((old) => !old);
		} else if (error) {
			showAlert(`Car failed to add: ${error.message ? error.message : error}`, "error");
		}
	}, [data, error]);

	const areValuesValid = (event) => {
		const brandValueValidation = brandValue.length !== 0;
		const modelValueValidation = modelValue.lenght !== 0;
		const fuelValueValidation = fuelValue !== "";
		const engineValueValidation =
			engineValue >= InputProps.ENGINE_PROPS.min &&
			engineValue <= InputProps.ENGINE_PROPS.max;
		const seatsValueValidation =
			seatsValue >= InputProps.SEATS_PROPS.min &&
			seatsValue <= InputProps.SEATS_PROPS.max;
		const quantityValueValidation =
			quantityValue >= InputProps.QUANTITY_PROPS.min;
		const priceValueValidation = priceValue >= InputProps.PRICE_PROPS.min;
		if (!brandValueValidation) {
			setInputError({ message: "Please complete with valid data" });
			event.target[0].focus();
			return false;
		} else if (!modelValueValidation) {
			setInputError({ message: "Please complete with valid data" });
			event.target[1].focus();
			return false;
		} else if (!fuelValueValidation) {
			setInputError({ message: "Please complete with valid data" });
			event.target[2].focus();
			return false;
		} else if (!engineValueValidation) {
			setInputError({ message: "Please complete with valid data" });
			event.target[3].focus();
			return false;
		} else if (!seatsValueValidation) {
			setInputError({ message: "Please complete with valid data" });
			event.target[4].focus();
			return false;
		} else if (!quantityValueValidation) {
			setInputError({ message: "Please complete with valid data" });
			event.target[5].focus();
			return false;
		} else if (!priceValueValidation) {
			setInputError({ message: "Please complete with valid data" });
			event.target[6].focus();
			return false;
		}
		return true;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!areValuesValid(event)) return;
		refetch({
			data: {
				brand: brandValue,
				model: modelValue,
				fuel: fuelValue,
				engine: engineValue,
				seats: seatsValue,
				price: priceValue,
				quantity: quantityValue,
				additionalInfo: infosValue,
			},
		});
	};
	return (
		<>
			<Tooltip title="Add a new car">
				<IconButton
					sx={{
						minWidth: "fit",
						width: "min-content",
						position: "relative",
						left: 115,
					}}
					color="primary"
					onClick={() => {
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
			</Tooltip>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={boxStyle}>
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
							alignSelf: "center",
							textWrap: "nowrap",
							width: "fit",
						}}
					>
						Complete the following form to create a new car entry
					</Typography>
					{inputError && (
						<Typography
							sx={{
								mt: 2,
								color: "red",
								alignSelf: "center",
								textWrap: "nowrap",
								width: "fit",
							}}
						>
							Please input valid data
						</Typography>
					)}
					<form
						id="carForm"
						className="flex flex-col w-full justify-center text-center"
						onSubmit={handleSubmit}
					>
						<div className="modal-row">
							<div className="modal-row-element">
								<FormControl sx={inputStyle}>
									<InputLabel size="normal">Brand</InputLabel>
									<Input
										type="text"
										name="brand"
										value={brandValue}
										onChange={(event) => {
											setBrandValue(event.target.value);
											setInputError(null);
										}}
										error={inputError !== null && brandValue === ""}
									/>
								</FormControl>
							</div>
							<div className="modal-row-element">
								<FormControl sx={inputStyle}>
									<InputLabel size="normal">Model</InputLabel>
									<Input
										type="text"
										name="model"
										value={modelValue}
										onChange={(event) => {
											setModelValue(event.target.value);
											setInputError(null);
										}}
										error={inputError !== null && modelValue === ""}
									/>
								</FormControl>
							</div>
						</div>
						<div className="modal-row">
							<div className="modal-row-element justify-end">
								<NativeSelect
									sx={inputStyle}
									type="selection"
									name="fuel"
									form="carForm"
									value={fuelValue}
									onChange={(event) => {
										setFuelValue(event.target.value);
										setInputError(null);
									}}
									error={inputError !== null && fuelValue === ""}
								>
									<option value="" disabled>
										Fuel
									</option>
									<option value="Petrol">Petrol</option>
									<option value="Diesel">Diesel</option>
									<option value="Electric">Electric</option>
								</NativeSelect>
							</div>
							<div className="modal-row-element">
								<FormControl sx={inputStyle}>
									<InputLabel size="normal">Engine</InputLabel>
									<Input
										type="number"
										name="engine"
										inputProps={InputProps.ENGINE_PROPS}
										value={engineValue}
										onChange={(event) => {
											setEngineValue(event.target.value);
											setInputError(null);
										}}
										error={inputError !== null && engineValue === ""}
									/>
								</FormControl>
							</div>
						</div>
						<div className="modal-row">
							<div className="modal-row-element">
								<FormControl sx={inputStyle}>
									<InputLabel size="normal">Seats</InputLabel>
									<Input
										type="number"
										name="seats"
										inputProps={InputProps.SEATS_PROPS}
										value={seatsValue}
										onChange={(event) => {
											setSeatsValue(event.target.value);
											setInputError(null);
										}}
										error={inputError !== null && seatsValue === ""}
									/>
								</FormControl>
							</div>
							<div className="modal-row-element">
								<FormControl sx={inputStyle}>
									<InputLabel size="normal">Quantity</InputLabel>
									<Input
										type="number"
										name="quantity"
										inputProps={InputProps.QUANTITY_PROPS}
										value={quantityValue}
										onChange={(event) => {
											setQuantityValue(event.target.value);
											setInputError(null);
										}}
										error={inputError !== null && quantityValue === ""}
									/>
								</FormControl>
							</div>
						</div>
						<div className="modal-row">
							<div className="modal-row-element">
								<FormControl sx={inputStyle}>
									<InputLabel size="normal">Price</InputLabel>
									<Input
										type="number"
										name="price"
										inputProps={InputProps.PRICE_PROPS}
										value={priceValue}
										onChange={(event) => {
											setPriceValue(event.target.value);
											setInputError(null);
										}}
										error={inputError !== null && priceValue === ""}
									/>
								</FormControl>
							</div>
							<div className="modal-row-element">
								<TextField
									sx={{ m: 2 }}
									id="outlined-multiline-static"
									label="Additional Information"
									multiline
									rows={4}
									value={infosValue}
									onChange={(event) => setInfosValue(event.target.value)}
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
