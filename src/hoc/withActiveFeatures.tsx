import { useContext } from "react";
import styles from "./withActiveFeatures.module.scss";
import { ActiveContext } from "../context";
import deleteIcon from "../assets/delete-icon.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../service/service";
import type { ICard } from "../components/Card/Card";

interface withID {
	id: string;
}

export const withActiveFeatures = <T extends withID>(WrappedComponent: React.ComponentType<T>) => {
	return (props: T) => {
		const { activeId, setActiveId } = useContext(ActiveContext);

		const isActive = activeId === props.id;

		const queryClientState = useQueryClient();

		useQuery<ICard[]>({ queryKey: ["cards"], queryFn: fetchData, staleTime: Infinity });

		const removeItem = (itemId: string) => {
			queryClientState.setQueryData(["cards"], (oldData: { results: ICard[] }) => ({
				...oldData,
				results: oldData.results.filter((item) => item.login.uuid !== itemId),
			}));
		};

		const handleSetActive = () => {
			setActiveId(isActive ? null : props.id);
		};
		return (
			<div
				className={`${styles.container} ${isActive ? styles.active : ""}`}
				onClick={handleSetActive}
			>
				<WrappedComponent
					{...props}
					isActive={isActive}
				/>
				{isActive && (
					<button
						className={styles.deleteButton}
						onClick={() => removeItem(props.id)}
					>
						<img
							className={styles.deleteIcon}
							src={deleteIcon}
							alt="deleteIcon"
						/>
					</button>
				)}
			</div>
		);
	};
};
