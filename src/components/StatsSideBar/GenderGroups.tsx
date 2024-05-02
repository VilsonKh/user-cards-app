import styles from "./StatsSideBar.module.scss";
import { countUsersByGenderGroup } from "../../utils/utils";
import type {IGroups} from "./AgeGroups";
const GenderGroups = ({ cardsData, isPending }: IGroups) => {

  if (isPending) return <p>Loading</p>

	const genderGroups = cardsData && cardsData.results && countUsersByGenderGroup(cardsData.results);
	return (
		<div className={styles.group}>
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
	);
};

export default GenderGroups;
