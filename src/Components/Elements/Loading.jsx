import CircularProgress from "@mui/joy/CircularProgress";
import image from "../../Pictures/android-chrome-192x192.png";

function Loading({ className }) {
	return (
		<CircularProgress
			className={className}
			size="lg"
			variant="plain"
			sx={{
				"--CircularProgress-size": "15rem",
			}}
		>
			<img src={image} alt="loading logo" />
		</CircularProgress>
	);
}

export default Loading;
