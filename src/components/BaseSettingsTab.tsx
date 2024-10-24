import {App, PluginSettingTab, Setting} from 'obsidian';
import MyPlugin from '../../main';
import {WorkoutTrackerSettings} from '@/types/Settings';
import {arraymove} from "@/utils/arrayMove";

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

		containerEl.createEl('h2', {text: 'Main settings'});

		new Setting(containerEl)
			.setName('Folder for workouts')
			.setDesc('A path where to a folder where workouts are stored')
			.addText(text => {
				text.setValue(this.plugin.settings.workoutsFolder);
				text.onChange(async (value) => {
					this.plugin.settings.workoutsFolder = value
					await this.plugin.saveSettings()
					this.display()
				})
			});

		containerEl.createEl('h2', {text: 'Additional workout parameters'});

		this.plugin.settings.additionalExerciseParams.forEach((_, index) => {
			new Setting(containerEl)
				.addText(text => {
					text.setValue(this.plugin.settings.additionalExerciseParams[index].name);
					text.onChange(async (value) => {
						this.plugin.settings.additionalExerciseParams[index].name = value
						await this.plugin.saveSettings()
					})
				})
				.addExtraButton((cb) => {
					cb.setIcon("up-chevron-glyph")
						.setTooltip("Move up")
						.onClick(async () => {
							arraymove(
								this.plugin.settings.additionalExerciseParams,
								index,
								index - 1
							);
							this.plugin.settings.additionalExerciseParams;
							await this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("down-chevron-glyph")
						.setTooltip("Move down")
						.onClick(async () => {
							arraymove(
								this.plugin.settings.additionalExerciseParams,
								index,
								index + 1
							);
							this.plugin.settings.additionalExerciseParams;
							await this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("cross")
						.setTooltip("Delete")
						.onClick(async () => {
							this.plugin.settings.additionalExerciseParams.splice(
								index,
								1
							);
							await this.plugin.saveSettings()
							this.display();
						});
				});

		})

		new Setting(this.containerEl).addButton((cb) => {
			cb.setButtonText("Add new parameter")
				.setCta()
				.onClick(async () => {
					this.plugin.settings.additionalExerciseParams.push({
						name: '',
						type: 'string'
					});
					await this.plugin.saveSettings()
					this.display()
				});
		});

		containerEl.createEl('h2', {text: 'Muscle groups'});

		this.plugin.settings.muscleGroups.forEach((_, index) => {
			new Setting(containerEl)
				.addText(text => {
					text.setValue(this.plugin.settings.muscleGroups[index]);
					text.onChange(async (value) => {
						this.plugin.settings.muscleGroups[index] = value
						await this.plugin.saveSettings()
					})
				})
				.addExtraButton((cb) => {
					cb.setIcon("up-chevron-glyph")
						.setTooltip("Move up")
						.onClick(async () => {
							arraymove(
								this.plugin.settings.muscleGroups,
								index,
								index - 1
							);
							this.plugin.settings.muscleGroups;
							await this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("down-chevron-glyph")
						.setTooltip("Move down")
						.onClick(async () => {
							arraymove(
								this.plugin.settings.muscleGroups,
								index,
								index + 1
							);
							this.plugin.settings.muscleGroups;
							await this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("cross")
						.setTooltip("Delete")
						.onClick(async () => {
							this.plugin.settings.muscleGroups.splice(
								index,
								1
							);
							await this.plugin.saveSettings()
							this.display()
						});
				});

		})

		new Setting(this.containerEl).addButton((cb) => {
			cb.setButtonText("Add new muscle group")
				.setCta()
				.onClick(async () => {
					this.plugin.settings.muscleGroups.push("")
					await this.plugin.saveSettings()
					this.display()
				});
		});


		containerEl.createEl('h2', {text: 'Exercises'});

		this.plugin.settings.exercises.forEach((_, index) => {
			new Setting(containerEl)
				.addText(text => {
					text.setValue(this.plugin.settings.exercises[index].name);
					text.onChange(async (value) => {
						this.plugin.settings.exercises[index].name = value
						await this.plugin.saveSettings()
					})
				})
				.addDropdown(dropdown => {
					this.plugin.settings.muscleGroups.forEach((group) => {
						dropdown.addOption(group, group)
						dropdown.onChange(async (value) => {
							this.plugin.settings.exercises[index].muscleGroup = value
							await this.plugin.saveSettings()
							this.display()
						})
					})
					dropdown.setValue(this.plugin.settings.exercises[index].muscleGroup)
				})
				.addExtraButton((cb) => {
					cb.setIcon("up-chevron-glyph")
						.setTooltip("Move up")
						.onClick(async () => {
							arraymove(
								this.plugin.settings.exercises,
								index,
								index - 1
							);
							this.plugin.settings.exercises;
							await this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("down-chevron-glyph")
						.setTooltip("Move down")
						.onClick(async () => {
							arraymove(
								this.plugin.settings.exercises,
								index,
								index + 1
							);
							this.plugin.settings.exercises;
							await this.plugin.saveSettings()
							this.display();
						});
				})
				.addExtraButton((cb) => {
					cb.setIcon("cross")
						.setTooltip("Delete")
						.onClick(async () => {
							this.plugin.settings.exercises.splice(
								index,
								1
							);
							await this.plugin.saveSettings()
							this.display();
						});
				});

		})

		new Setting(this.containerEl).addButton((cb) => {
			cb.setButtonText("Add new exercise")
				.setCta()
				.onClick(async () => {
					this.plugin.settings.exercises.push({
						name: '',
						muscleGroup: ''
					})
					await this.plugin.saveSettings()
					this.display()
				});
		});
	}
}
