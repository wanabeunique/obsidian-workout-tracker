import {App, normalizePath} from "obsidian";
import {WorkoutTrackerSettings} from "@/types/Settings";

export function getWorkoutsDate(app: App, settings: WorkoutTrackerSettings) {
	const allWorkouts = app.vault.getFiles().filter(file => file.path.includes(normalizePath(settings.workoutsFolder)));
	const workoutDays = new Set()

	allWorkouts.forEach(workout => {
		if (workout.parent?.name) {
			workoutDays.add(workout.parent.name)
		}
	});

	return workoutDays as Set<string>;
}
