import SearchBar from "./components/SearchBar/SearchBar";
import styles from "./App.module.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cards from "./components/Cards/Cards";
import RefreshButton from "./components/RefreshButton/RefreshButton";
import StatsSideBar from "./components/StatsSideBar/StatsSideBar";
import { useState } from "react";

export const queryClient = new QueryClient();
function App() {
	const [userInput, setUserInput] = useState<string>("");

	return (
		<QueryClientProvider client={queryClient}>
			<div className={styles.container}>
				<div className={styles.heading}>
					<SearchBar setUserInput={setUserInput} />
					<RefreshButton />
				</div>
				<div className={styles.content}>
					<Cards userInput={userInput} />
					<StatsSideBar />
				</div>
			</div>
		</QueryClientProvider>
	);
}

export default App;
