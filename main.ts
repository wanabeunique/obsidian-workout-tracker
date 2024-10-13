import {App, Plugin, WorkspaceLeaf} from 'obsidian';
import WorkoutSettingsTab, {DEFAULT_SETTINGS} from "./src/settings/settings";
import {addWorkout} from "./src/addWorkout/addWorkout";
import {WorkoutTrackerSettings} from "./src/settings/settings.types";
import {createContext} from "node:vm";

export const AppContext = createContext<App | undefined>(undefined);
export default class WorkoutTrackerPlugin extends Plugin {
	settings: WorkoutTrackerSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dumbbell', 'Add workout', () => {
			new addWorkout(this.app).open()
		});

		this.addSettingTab(new WorkoutSettingsTab(this.app, this));
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




