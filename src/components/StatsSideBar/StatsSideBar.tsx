import { useEffect, useState } from "react";
import styles from "./StatsSideBar.module.scss";
import { useQuery } from "@tanstack/react-query";
import { countUsersByAgeGroup, countUsersByGenderGroup } from "../../utils.ts";
const StatsSideBar = () => {
	const [cardsData, setCardsData] = useState([]);

	const { data } = useQuery({
		queryKey: ["cards"],
		queryFn: () => {
			return fetch("https://randomuser.me/api/?results=100").then((res) => res.json());
		},
	});

	useEffect(() => {
		if (data) {
			setCardsData(data.results);
		}
	}, [data]);

	const ageGroups = countUsersByAgeGroup(cardsData);
	const genderGroups = countUsersByGenderGroup(cardsData);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<p className={styles.title}>
					<span className={styles.totalCards}>{cardsData.length}</span> Users
				</p>
			</div>
			<div className={styles.ageGroups}>
				<h3 className={styles.subtitle}>Age Groups</h3>
				<div className={styles.content}>
					<div className={styles.infoLine}>
						<span className={styles.label}>11 to 20</span>
						<p className={styles.count}>
							<span>{ageGroups.age11to20}</span> users
						</p>
					</div>
					<div className={styles.infoLine}>
						<span className={styles.label}>21 to 30</span>
						<p className={styles.count}>
							<span>{ageGroups.age21to30}</span> users
						</p>
					</div>
					<div className={styles.infoLine}>
						<span className={styles.label}>31 to 40</span>
						<p className={styles.count}>
							<span>{ageGroups.age31to40}</span> users
						</p>
					</div>
					<div className={styles.infoLine}>
						<span className={styles.label}>41 to 50</span>
						<p className={styles.count}>
							<span>{ageGroups.age41to50}</span> users
						</p>
					</div>
					<div className={styles.infoLine}>
						<span className={styles.label}>51+</span>
						<p className={styles.count}>
							<span>{ageGroups.age51plus}</span> users
						</p>
					</div>
				</div>
			</div>
			<div className={styles.genderGroups}>
				<h3 className={styles.subtitle}>Gender Groups</h3>
				<div className={styles.content}>
					<div className={styles.infoLine}>
						<span className={styles.label}>Male</span>
						<p className={styles.count}>
							<span>{genderGroups.male}</span> users
						</p>
					</div>
					<div className={styles.infoLine}>
						<span className={styles.label}>Female</span>
						<p className={styles.count}>
							<span>{genderGroups.female}</span> users
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatsSideBar;
