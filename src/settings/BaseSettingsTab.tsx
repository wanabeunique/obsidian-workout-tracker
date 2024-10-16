import {App, PluginSettingTab, Setting} from 'obsidian';
import MyPlugin from '../../main';
import {WorkoutTrackerSettings} from './settings.types';
import {arraymove} from "../utils/arrayMove";

export const DEFAULT_SETTINGS: WorkoutTrackerSettings = {
	workoutsFolder: 'Workouts',
	additionalExerciseParams: [
		{name: 'Weight', type: 'string'},
		{name: 'Reps', type: 'number'}
	],
	muscleGroups: [
		'Chest',
		'Back',
		'Legs',
	],
	exercises: [
		{
			name: 'Bench press',
			muscleGroup: 'Chest'
		}
	]
};

export default class BaseSettingsTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty()

		new Setting(containerEl)
			.setName('Folder for workouts')
			.setDesc('Folder where workouts are stored')
			.addText(text => {
				text.setValue(this.plugin.settings.workoutsFolder);
				text.onChange((value) => {
					this.plugin.settings.workoutsFolder = value
					this.plugin.saveSettings()
				})
			});


		containerEl.createEl('h2', {text: 'Additional workout parameters'});

		this.plugin.settings.additionalExerciseParams.forEach((param, index) => {
			new Setting(containerEl)
				.addText(text => {
					text.setValue(this.plugin.settings.additionalExerciseParams[index].name);
					text.onChange((value) => {
						this.plugin.settings.additionalExerciseParams[index].name = value
						this.plugin.saveSettings()
					})
				})
				.addExtraButton((cb) => {
					cb.setIcon("up-chevron-glyph")
						.setTooltip("Move up")
						.onClick(() => {
							arraymove(
								this.plugin.settings.additionalExerciseParams,
								index,
								index - 1
							);
							this.plugin.settings.additionalExerciseParams;
							this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("down-chevron-glyph")
						.setTooltip("Move down")
						.onClick(() => {
							arraymove(
								this.plugin.settings.additionalExerciseParams,
								index,
								index + 1
							);
							this.plugin.settings.additionalExerciseParams;
							this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("cross")
						.setTooltip("Delete")
						.onClick(() => {
							this.plugin.settings.additionalExerciseParams.splice(
								index,
								1
							);
							this.plugin.saveSettings()
							this.display();
						});
				});

		})

		new Setting(this.containerEl).addButton((cb) => {
			cb.setButtonText("Add new parameter")
				.setCta()
				.onClick(() => {
					this.plugin.settings.additionalExerciseParams.push({
						name: '',
						type: 'string'
					});
					this.plugin.saveSettings()
					this.display()
				});
		});

		containerEl.createEl('h2', {text: 'Muscle groups'});

		this.plugin.settings.muscleGroups.forEach((group, index) => {
			new Setting(containerEl)
				.addText(text => {
					text.setValue(this.plugin.settings.muscleGroups[index]);
					text.onChange((value) => {
						this.plugin.settings.muscleGroups[index] = value
						this.plugin.saveSettings()
					})
				})
				.addExtraButton((cb) => {
					cb.setIcon("up-chevron-glyph")
						.setTooltip("Move up")
						.onClick(() => {
							arraymove(
								this.plugin.settings.muscleGroups,
								index,
								index - 1
							);
							this.plugin.settings.muscleGroups;
							this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("down-chevron-glyph")
						.setTooltip("Move down")
						.onClick(() => {
							arraymove(
								this.plugin.settings.muscleGroups,
								index,
								index + 1
							);
							this.plugin.settings.muscleGroups;
							this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("cross")
						.setTooltip("Delete")
						.onClick(() => {
							this.plugin.settings.muscleGroups.splice(
								index,
								1
							);
							this.plugin.saveSettings()
							this.display();
						});
				});

		})

		new Setting(this.containerEl).addButton((cb) => {
			cb.setButtonText("Add new muscle group")
				.setCta()
				.onClick(() => {
					this.plugin.settings.muscleGroups.push("")
					this.plugin.saveSettings()
					this.display()
				});
		});


		containerEl.createEl('h2', {text: 'Additional workout parameters'});

		this.plugin.settings.exercises.forEach((exercise, index) => {
			new Setting(containerEl)
				.addText(text => {
					text.setValue(this.plugin.settings.exercises[index].name);
					text.onChange((value) => {
						this.plugin.settings.exercises[index].name = value
						this.plugin.saveSettings()
					})
				})
				.addDropdown(dropdown => {
					this.plugin.settings.muscleGroups.forEach((group) => {
						dropdown.addOption(group, group)
						dropdown.onChange((value) => {
							this.plugin.settings.exercises[index].muscleGroup = value
							this.plugin.saveSettings()
						})
					})
					dropdown.setValue(this.plugin.settings.exercises[index].muscleGroup)
				})
				.addExtraButton((cb) => {
					cb.setIcon("up-chevron-glyph")
						.setTooltip("Move up")
						.onClick(() => {
							arraymove(
								this.plugin.settings.exercises,
								index,
								index - 1
							);
							this.plugin.settings.exercises;
							this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("down-chevron-glyph")
						.setTooltip("Move down")
						.onClick(() => {
							arraymove(
								this.plugin.settings.exercises,
								index,
								index + 1
							);
							this.plugin.settings.exercises;
							this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("cross")
						.setTooltip("Delete")
						.onClick(() => {
							this.plugin.settings.exercises.splice(
								index,
								1
							);
							this.plugin.saveSettings()
							this.display();
						});
				});

		})

		new Setting(this.containerEl).addButton((cb) => {
			cb.setButtonText("Add new exercise")
				.setCta()
				.onClick(() => {
					this.plugin.settings.exercises.push({
						name: '',
						muscleGroup: ''
					})
					this.plugin.saveSettings()
					this.display()
				});
		});
	}
}
