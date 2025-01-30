import { useEffect, useState } from "react";
import { Input, Slider, Box, Typography, Grid } from "@mui/material";

function RangeSlider({ data, attribute, inputProps, setFilters }) {
	const [label, setLabel] = useState("");
	const [min, setMin] = useState(inputProps.min);
	const [max, setMax] = useState(0);
	const [sliderValue, setSliderValue] = useState([min, max]);
	useEffect(() => {
		if (data) {
			const filteredData = data.filter((car) => car.quantity > 0);
			if (filteredData && filteredData.length > 0) {
				filteredData.sort((a, b) => a[attribute] - b[attribute]);
				const [dataMin, dataMax] = [
					filteredData[0][attribute],
					filteredData[filteredData.length - 1][attribute],
				];
				if (dataMin < min) setMin(dataMin);
				if (dataMax > max) setMax(dataMax);
			}
		}
	}, [data]);

	useEffect(() => {
		setSliderValue([min, max]);
	}, [min, max]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const gte = `${attribute}_gte`;
			const lte = `${attribute}_lte`;
			setFilters((prev) => {
				let obj = {
					...prev,
				};
				obj[gte] = sliderValue[0];
				obj[lte] = sliderValue[1];
				return obj;
			});
		}, 100);
		return () => clearTimeout(timeout);
	}, [sliderValue]);

	useEffect(() => {
		if (attribute) {
			setLabel(
				attribute.charAt(0).toUpperCase() + attribute.slice(1).toLowerCase()
			);
		}
	}, [attribute]);

	return (
		<Box>
			<Typography id={`input-slider-${attribute}`} gutterBottom>
				{label}
			</Typography>
			<Grid container direction="column">
				<Slider
					getAriaLabel={() => `input-slider-${attribute}`}
					value={sliderValue}
					onChange={(event, newValue) => {
						setSliderValue(newValue);
					}}
					valueLabelDisplay="auto"
					min={min}
					max={max}
					step={inputProps.step}
				/>
				<Grid my={1} display="flex" justifyContent="space-between">
					<Input
						sx={{ width: "4rem" }}
						value={sliderValue[0]}
						onChange={(event) => {
							setSliderValue((prev) => {
								return event.target.value === ""
									? [min, prev[1]]
									: [Number(event.target.value), prev[1]];
							});
						}}
						onBlur={() => {
							if (sliderValue[0] < min)
								setSliderValue((prev) => {
									return [min, prev[1]];
								});
						}}
						inputProps={{
							...inputProps,
							type: "number",
							"aria-labelledby": `input-slider-${attribute}`,
						}}
					/>

					<Input
						sx={{ width: "4rem" }}
						value={sliderValue[1]}
						onChange={(event) => {
							setSliderValue((prev) => {
								return event.target.value === ""
									? [prev[0], max]
									: [prev[0], Number(event.target.value)];
							});
						}}
						onBlur={() => {
							if (sliderValue[1] > max)
								setSliderValue((prev) => {
									return [prev[0], max];
								});
						}}
						inputProps={{
							...inputProps,
							type: "number",
							"aria-labelledby": `input-slider-${attribute}`,
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default RangeSlider;
