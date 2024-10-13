import {App, PluginSettingTab, Setting} from "obsidian";
import MyPlugin from "../../main";
import {WorkoutTrackerSettings} from "./settings.types";



export const DEFAULT_SETTINGS: WorkoutTrackerSettings = {
	exercisesFolder: 'Exercises',
	workoutsFolder: 'Workouts',
	additionalExerciseParams: [{
			name: 'Weight',
			type: 'string'
		},
		{
			name: 'Reps',
			type: 'number'
		}
	]
}


export default class WorkoutSettingsTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Workouts Folder')
			.setDesc('The folder where workouts are stored')
			.addText(text => text
				.setPlaceholder('Enter the folder name')
				.setValue(this.plugin.settings.workoutsFolder)
				.onChange(async (value) => {
					this.plugin.settings.workoutsFolder = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Exercises Folder')
			.setDesc('The folder where exercises are stored')
			.addText(text => text
				.setPlaceholder('Enter the folder name')
				.setValue(this.plugin.settings.exercisesFolder)
				.onChange(async (value) => {
					this.plugin.settings.exercisesFolder = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Additional Exercise Parameters')
			.addButton(button => {
					button.setButtonText('Add Parameter');
					button.onClick(async () => {
						this.plugin.settings.additionalExerciseParams.push({
							name: '',
							type: ''
						});
						this.display();
						await this.plugin.saveSettings();
					})
				})

		this.plugin.settings.additionalExerciseParams.forEach((param, index) => {
			new Setting(containerEl)
				.setName(param.name)
				.setDesc('The type of the name')
				.addText(text => text
					.setPlaceholder('Enter the name')
					.setValue(param.name)
					.onChange(async (value) => {
						this.plugin.settings.additionalExerciseParams[index].name = value;
						await this.plugin.saveSettings();
					}))
				.addButton(button => {
					button.setButtonText('Remove Parameter')
						.onClick(async () => {
							this.plugin.settings.additionalExerciseParams.splice(index, 1);
							this.display();
							await this.plugin.saveSettings();
						})
				})
		})
	}
}
