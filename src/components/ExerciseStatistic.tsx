import {useEffect, useMemo, useState} from "react";
import {ApexOptions} from "apexcharts";
import {getSortedExercises} from "@/utils/getSortedExercises";
import Select from "react-select";
import Chart from "react-apexcharts";
import {App} from "obsidian";
import {WorkoutTrackerSettings} from "@/settings/settings.types";

export const ExerciseStatistic = ({app, settings}: { app: App, settings: WorkoutTrackerSettings }) => {

	const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null)
	const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
	const [selectedParam, setSelectedParam] = useState<string | null>(null)
	const [series, setSeries] = useState<ApexAxisChartSeries>([])
	const [categories, setCategories] = useState<string[]>([])
	const [options, setOptions] = useState<ApexOptions | null>(null)

	const allExercises = getSortedExercises(app, settings)

	const style = getComputedStyle(document.body);
	const mainColor = style.getPropertyValue('--color-accent');

	const showChart = useMemo(() => {
		return !!selectedExercise && !!selectedParam && !!selectedMuscleGroup
	}, [selectedExercise, selectedMuscleGroup, selectedParam]);

	const exerciseOptions = useMemo(() => {
		if (!selectedMuscleGroup || !allExercises[selectedMuscleGroup]) return []
		return Object.keys(allExercises[selectedMuscleGroup]).map((exercise) => ({
			value: exercise,
			label: exercise
		}))
	}, [selectedMuscleGroup])

	const muscleGroupOptions = useMemo(() => {
		return Object.keys(allExercises).map((muscleGroup) => ({value: muscleGroup, label: muscleGroup}))
	}, [allExercises])

	const paramsOptions = settings.additionalExerciseParams.map((param) => ({value: param.name, label: param.name}))

	useEffect(() => {
		if (selectedMuscleGroup && selectedExercise && selectedParam) {
			if (!allExercises[selectedMuscleGroup][selectedExercise]) return
			const exercise = allExercises[selectedMuscleGroup][selectedExercise].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
			setSeries(() => [
				{
					name: selectedParam,
					data: exercise.map((ex) => ex[selectedParam])
				}
			])
			setCategories(exercise.map((ex) => ex.date))
		}
	}, [selectedMuscleGroup, selectedExercise, selectedParam])

	useEffect(() => {
		setOptions({
			title: {
				text: selectedExercise !== null ? selectedExercise : '',
				align: 'left' as 'left'
			},
			colors: [mainColor],
			xaxis: {
				categories: categories,
			}
		})
	}, [selectedExercise, selectedMuscleGroup, selectedParam]);

	useEffect(() => {
		setSelectedExercise(null)
	}, [selectedMuscleGroup]);

	return (
		<div className={"flex-col gap-1 stats"}>
			<div>
				<p className={'m0'}>Choose muscle group, exercise, parameter for comparison</p>
			</div>
			<div>
				<p>Muscle group: </p>
				<Select
					classNamePrefix={'custom-select'}
					options={muscleGroupOptions}
					value={{value: selectedMuscleGroup, label: selectedMuscleGroup}}
					onChange={(selectedOption) => setSelectedMuscleGroup((selectedOption && selectedOption.value) || null)}
				/>
			</div>
			{
				selectedMuscleGroup && (
					<div>
						<p>Exercise: </p>
						<Select
							classNamePrefix={'custom-select'}
							value={{value: selectedExercise, label: selectedExercise}}
							onChange={(selectedOption) => setSelectedExercise((selectedOption && selectedOption.value) || null)}
							options={exerciseOptions}
						/>

					</div>
				)
			}
			<div>
				<p>Parameter:</p>
				<Select
					classNamePrefix={'custom-select'}
					options={paramsOptions}
					onChange={(selectedOption) => setSelectedParam((selectedOption && selectedOption.value) || null)}
				/>
			</div>

			{
				showChart && options && (
					<Chart series={series} options={options} type="line" height={350}/>
				)
			}
		</div>

	)

}
