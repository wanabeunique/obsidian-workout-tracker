import {addWorkout} from "../addWorkout/addWorkout";

export const ReactView = ({openStatistic}) => {
	console.log(openStatistic)
	return (
		<div className="flex-col gap-1">
			<button>Add workout</button>
			<button onClick={openStatistic}>Statistic</button>
		</div>
	)
};
