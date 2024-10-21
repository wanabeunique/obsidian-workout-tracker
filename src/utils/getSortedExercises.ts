import { App, FrontMatterCache } from "obsidian";
import { WorkoutTrackerSettings } from "@/settings/settings.types";

export function getSortedExercises(app: App, settings: WorkoutTrackerSettings, date: string | Date | null = null, removeMuscleKeys = false) {
  const folderPath = date ? `${settings.workoutsFolder}/${date}` : settings.workoutsFolder;
  const allExercise = app.vault
    .getFiles()
    .filter((f) => f.path.includes(folderPath));

  let sortedExercises: {
    [key: string]: string[] | { [key: string]: string[] }
  } = {};

  const exercises = allExercise.map((exercise) => {
    return app.metadataCache.getFileCache(exercise)?.frontmatter;
  });

  const allExercises = settings.exercises;

  exercises.forEach((exercise) => {
    if (!exercise) return;
    if (!removeMuscleKeys) {
      if (!sortedExercises[getMuscleGroupByExercise(exercise.exercise, allExercises)]) {
        sortedExercises[getMuscleGroupByExercise(exercise.exercise, allExercises)] = {};
      }
      if (!(sortedExercises[getMuscleGroupByExercise(exercise.exercise, allExercises)] as { [key: string]: FrontMatterCache[] })[exercise.exercise]) {
        (sortedExercises[getMuscleGroupByExercise(exercise.exercise, allExercises)] as { [key: string]: FrontMatterCache[] })[exercise.exercise] = [];
      }

      (sortedExercises[getMuscleGroupByExercise(exercise.exercise, allExercises)] as { [key: string]: FrontMatterCache[] })[exercise.exercise].push(exercise);
    } else {
      if (!sortedExercises[exercise.exercise]) {
        sortedExercises[exercise.exercise] = [];
      }

      (sortedExercises[exercise.exercise] as FrontMatterCache[]).push(exercise);
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
