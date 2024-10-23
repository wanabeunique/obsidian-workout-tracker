export interface WorkoutTrackerSettings {
	workoutsFolder: string,
	additionalExerciseParams: AdditionalExerciseParam[]
	muscleGroups: string[]
	exercises: [{
		name: string
		muscleGroup: string
	}]
}

export interface AdditionalExerciseParam {
	name: string;
	type: string;
}
