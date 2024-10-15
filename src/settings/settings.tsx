import React from 'react';
import ReactDOM from 'react-dom';
import { App, PluginSettingTab } from 'obsidian';
import MyPlugin, {AppContext} from '../../main';
import { WorkoutTrackerSettings } from './settings.types';
import SettingsComponent from '../components/SettingsComponent';
import {createRoot} from "react-dom/client";

export const DEFAULT_SETTINGS: WorkoutTrackerSettings = {
  exercisesFolder: 'Exercises',
  workoutsFolder: 'Workouts',
  additionalExerciseParams: [
    { name: 'Weight', type: 'string' },
    { name: 'Reps', type: 'number' }
  ]
};

export default class WorkoutSettingsTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
	const root = createRoot(containerEl);

    root.render(
		<AppContext.Provider value={this.app}>
			<SettingsComponent/>,
		</AppContext.Provider>
    );
  }
}
