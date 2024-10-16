import {addWorkout} from "../addWorkout/addWorkout";
import {useApp} from "../hooks/useApp";
import {useState} from "react";
import MyPlugin from "main";
import {WorkoutTrackerSettings} from "../settings/settings.types";
import Select from 'react-select'

export const AddWorkout = ({settings}: { settings?: WorkoutTrackerSettings }) => {
		const [isExerciseAdding, setExerciseAdding] = useState(false);

		const app = useApp()

		return (
			<div className="flex-col gap-1">
				<h2>Adding workout</h2>
				<input type="date" value={new Date().toISOString().split('T')[0]}/>
				<button onClick={() => {
					setExerciseAdding(true)
				}}>Add exercise
				</button>

				{isExerciseAdding && (
					<div>
						<Select
							classNamePrefix={'custom-select'}
							options={settings?.exercises.map(exercise => ({value: exercise.name, label: exercise.name}))}/>
						{settings?.additionalExerciseParams.map((exercise, index) => (
							<div key={index} className={"flex gap-1 align-center justify-between"}>
								<p>{exercise.name}</p>
								<input type="text" value={exercise.name} onChange={(e) => console.log(e.target.value)}/>
							</div>
						))}
						<div className={"flex gap-1 mt-1"}>
							<button onClick={() => {
								setExerciseAdding(false)
							}}>
								Cancel
							</button>
							<button onClick={() => {
								setExerciseAdding(false)
							}}>
								Add
							</button>
						</div>
					</div>
				)
				}
			</div>
		)
	}
;
