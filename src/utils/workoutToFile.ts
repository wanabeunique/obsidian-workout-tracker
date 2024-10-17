import {App, TFile} from "obsidian";

export async function workoutToFile(app: App, exercises: {[key: string]: string}[], workoutDir: string, date: string | Date) {
	const dirPath = `${workoutDir}/${date}`;
	const dir = app.vault.getAbstractFileByPath(dirPath);

	if (!dir) {
		await app.vault.createFolder(dirPath);
	}

	for (const index in exercises) {
		const exercise = exercises[index];
		const fileName = `${workoutDir}/${date}/${exercise.selectedExercise}-${index}.md`;

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
