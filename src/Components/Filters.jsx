import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";
import { ENGINE_PROPS, PRICE_PROPS, SEATS_PROPS } from "../Utils/InputProps";

const sx = {
	marginTop: "1rem",
	marginBottom: "1rem",
};

function Filters({ fetchData, isAgent, userId, isLoading, refresh }) {
	const [filters, setFilters] = useState(isAgent ? { agency: userId } : {});
	const [price, setPrice] = useState(0);
	const formSubmition = (e) => {
		e.preventDefault();
		fetchData({
			params: filters,
		});
	};
	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => {
			if (value !== "") return { ...prev, [name]: value };
			else {
				return Object.keys(prev)
					.filter((key) => key !== name)
					.reduce((obj, key) => {
						obj[key] = prev[key];
						return obj;
					}, {});
			}
		});
	};
	useEffect(() => {
		fetchData({ params: filters });
	}, [refresh]);
	return (
		<form className="flex flex-col me-4 min-w-fit" onSubmit={formSubmition}>
			<Input
				sx={sx}
				type="text"
				name="brand"
				placeholder="Brand"
				value={filters.brand || ""}
				onChange={handleFilterChange}
			/>
			<Input
				sx={sx}
				type="text"
				name="model"
				placeholder="Model"
				value={filters.model || ""}
				onChange={handleFilterChange}
			/>
			<Input
				sx={sx}
				type="number"
				name="price"
				placeholder="Price (max)"
				inputProps={PRICE_PROPS}
				value={filters.price || ""}
				onChange={handleFilterChange}
			/>
			<Input
				sx={sx}
				type="number"
				name="engine"
				placeholder="Engine"
				inputProps={ENGINE_PROPS}
				value={filters.engine || ""}
				onChange={handleFilterChange}
			/>
			<Input
				sx={sx}
				type="number"
				name="seats"
				placeholder="Seats"
				inputProps={SEATS_PROPS}
				value={filters.seats || ""}
				onChange={handleFilterChange}
			/>
			<NativeSelect
				sx={sx}
				defaultValue={filters.fuel || ""}
				inputProps={{
					name: "fuel",
					id: "uncontrolled-native",
				}}
				onChange={handleFilterChange}
			>
				<option value={""}>Fuel</option>
				<option value={"Petrol"}>Petrol</option>
				<option value={"Diesel"}>Diesel</option>
				<option value={"Electric"}>Electric</option>
			</NativeSelect>
			<Button
				sx={{ marginTop: "1.5rem" }}
				variant="contained"
				type="submit"
				disabled={isLoading}
			>
				{isLoading ? "Loading..." : "Find"}
			</Button>
		</form>
	);
}

export default Filters;
