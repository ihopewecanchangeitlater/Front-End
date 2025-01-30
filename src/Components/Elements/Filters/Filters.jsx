import { useEffect, useState } from "react";
import { Button, NativeSelect, Input } from "@mui/material";
import { InputProps } from "../../../Utils";
import RangeSlider from "./RangeSlider";

const sx = {
	marginTop: "1rem",
	marginBottom: "1rem",
};

function Filters({ data, fetchData, isAgent, userId, isLoading, refresh }) {
	const [filters, setFilters] = useState(isAgent ? { agency: userId } : {});
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
			<RangeSlider
				data={data}
				attribute="price"
				inputProps={InputProps.PRICE_PROPS}
				setFilters={setFilters}
			/>
			<RangeSlider
				data={data}
				attribute="engine"
				inputProps={InputProps.ENGINE_PROPS}
				setFilters={setFilters}
			/>
			<Input
				sx={sx}
				type="number"
				name="seats"
				placeholder="Seats"
				inputProps={InputProps.SEATS_PROPS}
				value={filters.seats || ""}
				onChange={handleFilterChange}
			/>
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
