import {App, normalizePath, TFile} from "obsidian";
import {getSortedExercises} from "@/utils/getSortedExercises";
import {WorkoutTrackerSettings} from "@/types/Settings";

export async function workoutToFile(app: App, settings: WorkoutTrackerSettings, exercises: {
	[key: string]: string
}[], workoutDir: string, date: string | Date) {
	const dirPath = `${workoutDir}/${date}`;
	const dir = app.vault.getAbstractFileByPath(dirPath);

	if (!dir) {
		await app.vault.createFolder(dirPath);
	}

	const sortedExercises = getSortedExercises(app, settings, date, true);

	for (const index in exercises) {
		const exercise = exercises[index];
		const numericIndex = Number(index);
		const existingExercisesInDay = sortedExercises[exercise.selectedExercise];

		let totalIndex =  existingExercisesInDay && Array.isArray(existingExercisesInDay) ? numericIndex + existingExercisesInDay.length + 1 : numericIndex + 1

		const fileName = normalizePath(`${workoutDir}/${date}/${exercise.selectedExercise}-${totalIndex}.md`);

		const file = app.vault.getAbstractFileByPath(fileName);

		const fileContent = `---
date: ${date}	
exercise: ${exercise.selectedExercise}
${Object.keys(exercise).map(key => {
			if (key !== 'selectedExercise') {
				return `${key}: ${exercise[key]}`;
			}
		}).join('\n')}
---`;

		if (!file) {
			await app.vault.create(fileName, fileContent);
		} else {
			if (file instanceof TFile) {
				await app.vault.modify(file, fileContent);
			}
		}
	}
}

