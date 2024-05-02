import { useQuery } from "@tanstack/react-query";
import styles from "./RefreshButton.module.scss";
import loadingImg from "../../assets/loading.svg";
import { fetchData } from "../../service/service";

const RefreshButton = () => {

	const { refetch, isFetching } = useQuery({ queryKey: ["cards"], queryFn: fetchData, enabled: false });

	return (
		<div className={styles.container}>
			{isFetching ? (
				<img
					className={styles.img}
					src={loadingImg}
					alt="loading"
				/>
			) : (
				<button
					onClick={() => refetch()}
					className={styles.refreshButton}
				>
					Refresh Users
				</button>
			)}
		</div>
	);
};

export default RefreshButton;
