import { useState, useEffect } from "react";
import moment from "moment";
import { Endpoints } from "../../../Utils";
import { useFetch } from "../../../Hooks";
import ServerDay from "./ServerDay";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Calendar({ isAgent, userId }) {
	const [value, setValue] = useState(moment());
	const [highlightedDays, setHighlightedDays] = useState([]);
	const { data } = useFetch(`${Endpoints.RESERVATIONS_USER_URL}/${userId}`, {
		method: "get",
	});
	useEffect(() => {
		if (data) setHighlightedDays([...new Set(data.map((r) => r.date))]);
	}, [data]);
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DateCalendar
					sx={{ minWidth: "fit", justifySelf: "start" }}
					readOnly
					value={value}
					onChange={setValue}
					slots={{ day: ServerDay }}
					slotProps={{ day: { highlightedDays } }}
				/>
			</LocalizationProvider>
		</>
	);
}

export default Calendar;
