import "./App.css";
import Dashboard from "./Components/Dashboard";

function App() {
	sessionStorage.setItem("isDealer", true);
	return (
		<div className="App">
			<Dashboard />
		</div>
	);
}

export default App;
