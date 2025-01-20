import "./App.css";
import Dashboard from "./Components/Dashboard";

function App() {
	sessionStorage.setItem("isDealer", true);
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Navigate to="/" />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route
					path="/login"
					element={<LoginPage setUser={setUser} setIsAgent={setIsAgent} />}
				/>
				<Route
					path="/register"
					element={<RegisterPage setUser={setUser} setIsAgent={setIsAgent} />}
				/>

				<Route
					path={`/dashboard`}
					element={<DashboardPage user={user} isAgent={isAgent} />}
				/>
				<Route path={`/car/:carId`} element={<CarPage isAgent={isAgent} />} />
			</Routes>
		</Router>
	);
}

export default App;
