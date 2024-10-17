export async function workoutToFile(app, exercises, workoutDir, date) {
	const dirPath = `${workoutDir}/${date}`;
	const dir = app.vault.getAbstractFileByPath(dirPath);

	if (!dir) {
		await app.vault.createFolder(dirPath);
	}

	for (const index in exercises) {
		const exercise = exercises[index];
		const fileName = `${workoutDir}/${date}/${exercise.selectedExercise}-${index}.md`;

		const file = app.vault.getAbstractFileByPath(fileName);


		app.fileManager.processFrontMatter(file);
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
			await app.vault.modify(file, fileContent);
		}
	}
}
