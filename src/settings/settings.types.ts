export interface WorkoutTrackerSettings {
	exercisesFolder: string,
	workoutsFolder: string,
	additionalExerciseParams: AdditionalExerciseParam[]
}

export interface AdditionalExerciseParam {
	name: string;
	type: string;
}
