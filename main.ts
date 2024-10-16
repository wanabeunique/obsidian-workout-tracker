import {App, Plugin} from 'obsidian';
import BaseSettingsTab, {DEFAULT_SETTINGS} from "./src/settings/BaseSettingsTab";
import {addWorkout} from "./src/addWorkout/addWorkout";
import {WorkoutTrackerSettings} from "./src/settings/settings.types";
import React from "react";

export const AppContext = React.createContext<App | null>(null);
export default class WorkoutTrackerPlugin extends Plugin {
	settings: WorkoutTrackerSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dumbbell', 'Add workout', () => {
			new addWorkout(this.app, this.settings).open()
		});

		this.addSettingTab(new BaseSettingsTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}




