import {useApp} from "../hooks/useApp";
import {useEffect, useState} from "react";
import {WorkoutTrackerSettings} from "../settings/settings.types";
import Select from 'react-select';
import {CircleX, ChevronUpCircle, ChevronDownCircle} from "lucide-react";
import {getArraymoved} from "../utils/arrayMove";
import {workoutToFile} from "../utils/workoutToFile";

export const AddWorkout = ({settings, close}: { settings?: WorkoutTrackerSettings, close: any }) => {
	const [isExerciseAdding, setExerciseAdding] = useState(false);
	const [date, setDate] = useState(new Date().toISOString().split('T')[0])
	const [exercises, setExercises] = useState<{
		[key: string]: string
	}[]>([]);
	const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
	const app = useApp();

	useEffect(() => {console.log(date)}, [date])

	function addExercise() {
		setExercises(prevExercises => [...prevExercises, formValues]);
	}

	const handleInputChange = (key: string, value: string) => {
		setFormValues(prevValues => ({
			...prevValues,
			[key]: value
		}));
	};

	async function saveWorkout(){
		await workoutToFile(app, exercises, settings?.workoutsFolder, date);
		// close()
	}

	return (
		<div className="flex-col gap-1">
			<h2>Adding workout</h2>
			<input
				type="date"
				value={date}
				onChange={(e) => {console.log(e); setDate(e.target.value)}}
			/>
			<button onClick={() => setExerciseAdding(true)}>Add exercise</button>

			{isExerciseAdding && (
				<div className={'add-exercise'}>
					<Select
						classNamePrefix={'custom-select'}
						options={settings?.exercises.map(exercise => ({value: exercise.name, label: exercise.name}))}
						onChange={(selectedOption) => handleInputChange('selectedExercise', selectedOption?.value || '')}
					/>
					{settings?.additionalExerciseParams.map((param, index) => (
						<div key={index} className={"flex gap-1 align-center justify-between"}>
							<p>{param.name}</p>
							<input
								type="text"
								value={formValues[param.name] || ''}
								onChange={(e) => handleInputChange(param.name, e.target.value)}
							/>
						</div>
					))}
					<div className={"flex gap-1 mt-1"}>
						<button onClick={() => setExerciseAdding(false)}>Cancel</button>
						<button onClick={() => {
							setExerciseAdding(false);
							addExercise();
						}}>Add
						</button>
					</div>
				</div>
			)}

			{exercises.map((exercise, index) => (
				<div key={index} className={"flex align-center justify-between"}>
					<p>{exercise.selectedExercise}</p>
					<div className={'flex align-center gap-1'}>
						<CircleX
							className={"pointer"}
							onClick={() => setExercises((prevValue) => prevValue.filter((_, i) => i !== index))}/>
						<ChevronUpCircle
							className={"pointer"}
							onClick={() => {
								setExercises(getArraymoved(exercises, index, index - 1));
							}}/>
						<ChevronDownCircle
							className={"pointer"}
							onClick={() => {
								setExercises(getArraymoved(exercises, index, index + 1));
							}}/>
					</div>

				</div>
			))}

			{exercises.length > 0 && (
				<button
					onClick={() => {
						saveWorkout()
					}}
				>Save workout</button>
			)}
		</div>
	);
};
