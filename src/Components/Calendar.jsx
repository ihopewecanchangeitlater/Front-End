import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function ServerDay(props) {
	const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
	const isSelected =
		!outsideCurrentMonth &&
		highlightedDays.indexOf(moment(day).format("YYYY-MM-DD").toString()) >= 0;
	return (
		<Badge
			className=""
			key={props.day.toString()}
			overlap="circular"
			badgeContent={
				isSelected ? (
					<Tooltip title="Test Drive">
						<svg
							fill="#000000"
							width="1.2rem"
							height="1.2rem"
							viewBox="0 0 32 32"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M 9.5 6 C 8.179688 6 7.003906 6.859375 6.625 8.125 L 5.25 12.71875 L 3.3125 12.0625 L 2.6875 13.9375 L 4.65625 14.59375 L 4.03125 16.71875 C 4.007813 16.808594 3.996094 16.90625 4 17 L 4 24 C 4 24.03125 4 24.0625 4 24.09375 L 4 25 C 4 25.550781 4.449219 26 5 26 L 8 26 L 8.34375 25 L 23.65625 25 L 24 26 L 27 26 C 27.550781 26 28 25.550781 28 25 L 28 24.15625 C 28.003906 24.105469 28.003906 24.050781 28 24 L 28 17 C 28.003906 16.90625 27.992188 16.808594 27.96875 16.71875 L 27.34375 14.59375 L 29.3125 13.9375 L 28.6875 12.0625 L 26.75 12.71875 L 25.375 8.125 C 24.996094 6.859375 23.820313 6 22.5 6 Z M 9.5 8 L 22.5 8 C 22.945313 8 23.339844 8.292969 23.46875 8.71875 L 24.75 13 L 7.25 13 L 8.53125 8.71875 C 8.660156 8.289063 9.054688 8 9.5 8 Z M 6.65625 15 L 25.34375 15 L 26 17.1875 L 26 23 L 6 23 L 6 17.1875 Z M 8.5 16 C 7.671875 16 7 16.671875 7 17.5 C 7 18.328125 7.671875 19 8.5 19 C 9.328125 19 10 18.328125 10 17.5 C 10 16.671875 9.328125 16 8.5 16 Z M 23.5 16 C 22.671875 16 22 16.671875 22 17.5 C 22 18.328125 22.671875 19 23.5 19 C 24.328125 19 25 18.328125 25 17.5 C 25 16.671875 24.328125 16 23.5 16 Z M 12 19 L 10.75 22 L 12.90625 22 L 13.34375 21 L 18.65625 21 L 19.09375 22 L 21.25 22 L 20 19 Z" />
						</svg>
					</Tooltip>
				) : undefined
			}
		>
			<PickersDay
				{...other}
				outsideCurrentMonth={outsideCurrentMonth}
				day={day}
			/>
		</Badge>
	);
}

function Calendar() {
	const [isAgent, setIsAgent] = useState(
		sessionStorage.getItem("token").split(":")[0] === "true"
	);
	const [value, setValue] = useState(moment());
	const [highlightedDays, setHighlightedDays] = useState([]);
	useEffect(() => {
		const fetchReservations = async () => {
			const tokenSplit = sessionStorage.getItem("token").split(":");
			const currentAFM = tokenSplit[1];
			const response = await axios.get(
				`http://localhost:8080/api/reservations/${currentAFM}`,
				{ params: { is_agent: isAgent } }
			);
			if (!response.data) return;
			let { data } = response;
			setHighlightedDays([...new Set(data.map((r) => r.date))]);
		};
		fetchReservations();
	}, [isAgent]);
	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DateCalendar
					readOnly
					value={value}
					onChange={setValue}
					slots={{ day: ServerDay }}
					slotProps={{ day: { highlightedDays } }}
				/>
			</LocalizationProvider>
		</div>
	);
}

export default Calendar;
