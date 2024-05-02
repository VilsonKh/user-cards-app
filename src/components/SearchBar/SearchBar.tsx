import { UserInputContext } from "../../context/context";
import { useDebouncer } from "../../utils/utils";
import styles from "./SearchBar.module.scss";

import { ChangeEvent, memo, useContext, useState  } from "react";

const SearchBar = memo(() => {
	const { setUserInput } = useContext(UserInputContext);
	const [inputValue, setInputValue] = useState<string>("");
useDebouncer(inputValue, 300, setUserInput);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	}

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
