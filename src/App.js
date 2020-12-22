/** @format */

import "./App.css";
import MainPage from "./components/MainPage";
import { Router } from "@reach/router";

function App() {
	return (
		<div className="App">
			<Router>
				<MainPage path="/" />
			</Router>
		</div>
	);
}

export default App;
