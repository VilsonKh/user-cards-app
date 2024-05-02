import { Skeleton } from "@mui/material";

const CardSkeletons = ({count}: {count: number}) => {
	return (
		<>
			{[...Array(count)].map((_, index) => (
				<Skeleton
					key={index}
					variant="rounded"
					height={218}
					sx={{ bgcolor: "#1e2028", borderRadius: "16px" }}
					animation="wave"
				/>
			))}
		</>
	);
};

export default CardSkeletons;
