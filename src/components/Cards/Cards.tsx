import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import styles from "./Cards.module.scss";
import { searchUsers, useDebouncer } from "../../utils/utils";
import type { IUser } from "../../utils/utils";
import { fetchData } from "../../service/service";
import { withActiveFeatures } from "../../hoc/withActiveFeatures";
import { useContext, useEffect, useState } from "react";
import { ActiveContext, UserInputContext } from "../../context/context";
import CardSkeletons from "../../ui/skeleton/CardSkeletons";
import useScrollGradient from "../../utils/useScrollGradient";

const Cards = () => {
	const [activeId, setActiveId] = useState<string | null>(null);
	const { listRef, atTop, atBottom } = useScrollGradient();
	const [filteredData, setFilteredData] = useState<IUser[] | []>([]);
	const { isPending, data } = useQuery({
		queryKey: ["cards"],
		queryFn: fetchData,
		staleTime: Infinity,
	});

	const { userInput } = useContext(UserInputContext);

	const debouncedValue = useDebouncer(userInput);

	useEffect(() => {
		if (data && debouncedValue !== undefined) {
			const filtered = searchUsers(data.results, debouncedValue);
			if (filtered) setFilteredData(filtered);
		}
	}, [debouncedValue, data]);

	console.log(data)

	if (isPending) {
		return (
			<div className={styles.container}>
				<CardSkeletons count={16} />
			</div>
		);
	}

	console.log("Cards");

	return (
		<ActiveContext.Provider value={{ activeId, setActiveId }}>
			<div
				className={styles.container}
				ref={listRef}
			>
				<div className={styles.gradientContainer}>
					<div className={`${styles.gradientTop} ${atTop ? styles.hidden : ""}`}></div>
					<div className={`${styles.gradientBottom} ${atBottom ? styles.hidden : ""}`}></div>
				</div>
				{/* TODO: появляется no data после того как данные получены с сервера */}
				{filteredData.length > 0 ? (
					filteredData.map((card) => {
						const ActiveUser = withActiveFeatures(Card);
						return (
							<ActiveUser
								id={card.login.uuid}
								key={card.login.uuid}
								name={card.name}
								email={card.email}
								cell={card.cell}
								dob={card.dob}
								location={card.location}
								picture={card.picture}
							/>
						);
					})
				) : (
					<div>No data found for your search</div>
				)}
			</div>
		</ActiveContext.Provider>
	);
};

export default Cards;
