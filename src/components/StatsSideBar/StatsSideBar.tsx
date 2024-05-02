import styles from "./StatsSideBar.module.scss";
import { useQuery } from "@tanstack/react-query";
import AgeGroups from "./AgeGroups.tsx";
import GenderGroups from "./GenderGroups.tsx";
import { fetchData } from "../../service/service.ts";
import { Skeleton } from "@mui/material";
const StatsSideBar = () => {
	const { data, isPending } = useQuery({ queryKey: ["cards"], queryFn: fetchData, enabled: false });

	if (isPending) {
		return (

				<Skeleton
					variant="rounded"
					height={500}
				
					sx={{ bgcolor: "#1e2028", borderRadius: "16px" }}
					animation="wave"
					className={styles.skeleton}
				/>

		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<p className={styles.title}>
					<span className={styles.totalCards}>{data && data.results.length}</span> Users
				</p>
			</div>
			<AgeGroups
				cardsData={data}
				isPending={isPending}
			/>
			<GenderGroups
				cardsData={data}
				isPending={isPending}
			/>
		</div>
	);
};

export default StatsSideBar;
