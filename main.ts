import {App, Plugin} from 'obsidian';
import BaseSettingsTab, {DEFAULT_SETTINGS} from "@/components/BaseSettingsTab";
import {addWorkout} from "@/screens/addWorkout";
import {WorkoutTrackerSettings} from "@/types/Settings";
import React from "react";
import {StatisticModal} from "@/screens/Statistic";

export const AppContext = React.createContext<App | null>(null);
export default class WorkoutTrackerPlugin extends Plugin {
	settings: WorkoutTrackerSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dumbbell', 'Add workout', () => {
			new addWorkout(this.app, this.settings).open()
		});

		this.addRibbonIcon('chart-line', 'Statistic', () => {
			new StatisticModal(this.app, this.settings).open()
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




