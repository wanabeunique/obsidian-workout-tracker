import {App, FrontMatterCache, normalizePath} from "obsidian";
import {WorkoutTrackerSettings} from "@/types/Settings";

type sortedExerciseType<T> = T extends false
	? Record<string, Record<string, FrontMatterCache[]>>
	: Record<string, FrontMatterCache[]>;


export function getSortedExercises(app: App, settings: WorkoutTrackerSettings, date: string | Date | null = null, removeMuscleKeys = false) {
	const folderPath = date ? normalizePath(`${settings.workoutsFolder}/${date}`) : normalizePath(settings.workoutsFolder);
	const allExercise = app.vault
		.getFiles()
		.filter((f) => f.path.includes(folderPath));

	let sortedExercises: sortedExerciseType<typeof removeMuscleKeys> = {};

	const exercises = allExercise.map((exercise) => {
		return app.metadataCache.getFileCache(exercise)?.frontmatter;
	});

	const allExercises = settings.exercises;

	exercises.forEach((frontmatter) => {
		if (!frontmatter) return;
		const currentExercise = frontmatter.exercise as string
		const muscleGroup = getMuscleGroupByExercise(currentExercise, allExercises)
		if (!removeMuscleKeys) {
			if (!sortedExercises[muscleGroup]) {
				(sortedExercises[muscleGroup]) = {};
			}

			if (!(sortedExercises[muscleGroup] as Record<string, FrontMatterCache[]>)[currentExercise]) {
				(sortedExercises[muscleGroup] as Record<string, FrontMatterCache[]>)[currentExercise] = [];
			}

			(sortedExercises[muscleGroup] as Record<string, FrontMatterCache[]>)[currentExercise].push(frontmatter);
		} else {
			if (!sortedExercises[currentExercise]) sortedExercises[currentExercise] = [];

			(sortedExercises[currentExercise] as FrontMatterCache[]).push(frontmatter);
		}
	});

	return sortedExercises;
}

function getMuscleGroupByExercise(exercise: string, muscleGroups: WorkoutTrackerSettings["exercises"]): string {
	for (const muscleGroup of muscleGroups) {
		if (muscleGroup.name === exercise) {
			return muscleGroup.muscleGroup;
		}
	}
	return 'Other';
}
