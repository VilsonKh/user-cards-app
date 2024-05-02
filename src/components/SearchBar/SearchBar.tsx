import { UserInputContext } from "../../context/context";
import styles from "./SearchBar.module.scss";

import { ChangeEvent, memo, useCallback, useContext } from "react";

const SearchBar = memo(() => {

	const {setUserInput} = useContext(UserInputContext)
	console.log("SearchBar")
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setUserInput(event.target.value)
	},[])

	return (
		<input
			className={styles.input}
			type="text"
			placeholder="Search"
			onChange={handleChange}
		/>
	);
});

export default SearchBar;
