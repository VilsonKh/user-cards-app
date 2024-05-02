import styles from "./StatsSideBar.module.scss";
import { countUsersByAgeGroup } from "../../utils/utils";
import type{ ICard } from "../Card/Card";

export interface IGroups {
	cardsData: {
		results: ICard[]
	};
	isPending: boolean;
}
const AgeGroups = ({ cardsData, isPending }: IGroups) => {

  if(isPending) return <p>Loading</p>
	const ageGroups = cardsData && cardsData.results && countUsersByAgeGroup(cardsData.results);

	return (
		<div className={styles.group}>
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
	);
};

export default AgeGroups;
