import SearchBar from "./components/SearchBar/SearchBar";
import styles from './App.module.scss';
import { QueryClientProvider } from "@tanstack/react-query";
import Cards from "./components/Cards/Cards";
import RefreshButton from "./components/RefreshButton/RefreshButton";
import StatsSideBar from "./components/StatsSideBar/StatsSideBar";
import { queryClient } from "./service/service";
import UserInputProvider from "./context/UserInputProvider";

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<UserInputProvider>
				<div className={styles.container}>
					<div className={styles.heading}>
						<SearchBar />
						<RefreshButton />
					</div>
					<div className={styles.content}>
						<Cards />
						<StatsSideBar />
					</div>
				</div>
			</UserInputProvider>
		</QueryClientProvider>
	);
}

export default App;
