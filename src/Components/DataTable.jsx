import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function DataTable({ data, loading }) {
	const navigate = useNavigate();
	return (
		<div
			className={`w-full ${loading ? "flex justify-center items-center" : ""}`}
		>
			{loading ? (
				<Loading />
			) : (
				<TableContainer
					sx={{ minWidth: "fit", minHeight: "fit", textWrap: "nowrap" }}
					component={Paper}
				>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Brand</TableCell>
								<TableCell align="right">Model</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Engine</TableCell>
								<TableCell align="right">Seats</TableCell>
								<TableCell align="right">Fuel</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.length > 0 ? (
								data.map((car) => (
									<TableRow
										key={car.id}
										sx={{
											cursor: "pointer",
											"&:last-child td, &:last-child th": { border: 0 },
										}}
										onClick={() => {
											navigate("/car/" + car.id);
										}}
									>
										<TableCell component="th" scope="row">
											{car.brand}
										</TableCell>
										<TableCell align="right">{car.model}</TableCell>
										<TableCell align="right">{car.price}</TableCell>
										<TableCell align="right">{car.engine}</TableCell>
										<TableCell align="right">{car.seats}</TableCell>
										<TableCell align="right">{car.fuel}</TableCell>
									</TableRow>
								))
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
