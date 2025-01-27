import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { Loading } from ".";

const headersStyle = {
	bgcolor: "rgb(104 170 238)",
	color: "primary.contrastText",
	fontSize: 17,
};

function DataTable({ data, loading, isAgent }) {
	const navigate = useNavigate();
	const [tableData, setTableData] = useState([]);
	useEffect(() => {
		if (data && data.length > 0) {
			if (isAgent === false)
				setTableData(data.filter((car) => car.quantity > 0));
			else setTableData(data);
		}
	}, [data]);
	return (
		<div
			className={`w-full h-[75vh] overflow-hidden ${
				loading || data == null ? "flex justify-center items-center" : ""
			}`}
		>
			{loading || data == null ? (
				<Loading />
			) : (
				<TableContainer
					sx={{
						minWidth: "fit",
						minHeight: "fit",
						height: "100%",
						textWrap: "nowrap",
					}}
					component={Paper}
				>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell sx={headersStyle}>Brand</TableCell>
								<TableCell sx={headersStyle}>Model</TableCell>
								<TableCell sx={headersStyle} align="center">
									Price
								</TableCell>
								<TableCell sx={headersStyle} align="center">
									Engine
								</TableCell>
								<TableCell sx={headersStyle} align="center">
									Seats
								</TableCell>
								<TableCell sx={headersStyle} align="center">
									Fuel
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableData.length > 0 ? (
								tableData.map((car) => {
									const cellStyle = {
										color: `${car.quantity === 0 ? "#FF0000" : ""}`,
									};
									return (
										<TableRow
											key={car.id}
											sx={{
												cursor: "pointer",
												"&:last-child td, &:last-child th": { border: 0 },
												bgcolor: `${car.quantity === 0 ? "#FFD5D5" : ""}`,
											}}
											onClick={() => {
												navigate("/car/" + car.id);
											}}
										>
											<TableCell sx={cellStyle}>{car.brand}</TableCell>
											<TableCell sx={cellStyle}>{car.model}</TableCell>
											<TableCell sx={cellStyle} align="center">
												{car.price}
											</TableCell>
											<TableCell sx={cellStyle} align="center">
												{car.engine}
											</TableCell>
											<TableCell sx={cellStyle} align="center">
												{car.seats}
											</TableCell>
											<TableCell sx={cellStyle} align="center">
												{car.fuel}
											</TableCell>
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell colSpan="6">No cars found</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	);
}

export default DataTable;
