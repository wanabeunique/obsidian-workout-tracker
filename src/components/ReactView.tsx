import {addWorkout} from "../addWorkout/addWorkout";
import {useApp} from "../hooks/useApp";
import {statistic} from "../statistic/statistic";
import {useCallback} from "react";

export const ReactView = ({modalInstance} : {modalInstance: addWorkout}) => {

	const app = useApp()

	const openStatistic = useCallback(async () => {
		if (!app) return
		new statistic(app).open()
		modalInstance.close()
	}, [app])

	return (
		<div className="flex-col gap-1">
			<button>Add workout</button>
			<button onClick={openStatistic}>Statistic</button>
		</div>
	)
};
