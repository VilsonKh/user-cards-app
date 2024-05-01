import styles from "./Card.module.scss";

export interface ICard {
	name: {
		first: string;
		last: string;
	};
	email: string;
	cell: string;
	dob: {
		age: number;
		date: Date;
	};
	location: {
		city: string;
		state: string;
		country: string;
	};
	picture: {
		large: string;
		thumbnail: string;
	};
	isActive: boolean;
	login: {
		uuid: string;
	}
}

const Card: React.FC<ICard> = ({ name, email, cell, dob, location, picture, isActive }) => {
	return (
		<div className={`${styles.container} ${isActive ? styles.active : ""}`}>
			<div className={styles.heading}>
				<div className={styles.avatar}>
					<img
						src={picture.thumbnail}
						alt=""
					/>
				</div>
				<div className={styles.mainInfo}>
					<p className={styles.name}>
						{name.first} {name.last}
					</p>
					<p className={styles.email}>{email}</p>
				</div>
			</div>
			<div className={styles.info}>
				<div className={styles.infoLine}>
					<span className={styles.label}>Phone No</span>
					<p className={styles.infoItem}>{cell}</p>
				</div>
				<div className={styles.infoLine}>
					<span className={styles.label}>Birthday</span>
					<p className={styles.infoItem}>
						{new Date(dob.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
					</p>
				</div>
				<div className={styles.infoLine}>
					<span className={styles.label}>Location</span>
					<p className={`${styles.infoItem} ${styles.location}`}>
						{location.city}, {location.state}, {location.country}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
