import styles from "./SearchBar.module.scss";

import React from "react";

const SearchBar = ({setUserInput}) => {
	return (
		<input
			className={styles.input}
			type="text"
			placeholder="Search"
			onChange={(e) => setUserInput(e.target.value)}
		/>
	);
};

export default SearchBar;
