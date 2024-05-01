import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import styles from "./Cards.module.scss";
import { searchUsers, useDebouncer } from "../../utils";
import { fetchData } from "../../service/service";
import { withActiveFeatures } from "../../hoc/withActiveFeatures";
import { useEffect, useRef, useState } from "react";
import { ActiveContext } from "../../context";
const Cards = ({ userInput }: { userInput: string }) => {
	const [activeId, setActiveId] = useState<string | null>(null);

	const { isPending, error, data } = useQuery({
		queryKey: ["cards"],
		queryFn: fetchData,
	});

	const debouncedValue = useDebouncer(userInput, 300);

	const [atTop, setAtTop] = useState<boolean>(true);
	const [atBottom, setAtBottom] = useState<boolean>(false);
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = listRef.current;
		if (element) {
			const scrollHeight = element.scrollHeight;
			const clientHeight = element.clientHeight;
			if (scrollHeight > clientHeight) {
				handleScroll();
			}
		}
	}, [data]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	const handleScroll = () => {
		const element = listRef.current;
		if (element) {
			const atTop = element.scrollTop > 0 ? false : true;
			const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 32;
      setAtTop(atTop);
      setAtBottom(atBottom);
		}

	};

	const filteredData = searchUsers(data.results, debouncedValue);

	return (
		<ActiveContext.Provider value={{ activeId, setActiveId }}>
			<div
				className={styles.container}
				ref={listRef}
				onScroll={handleScroll}
			>
				<div className={styles.gradientContainer}>
					<div className={`${styles.gradientTop} ${atTop ? styles.hidden : ""}`}></div>
					<div className={`${styles.gradientBottom} ${atBottom ? styles.hidden : ""}`}></div>
				</div>
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
