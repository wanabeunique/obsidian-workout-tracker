import {App, Modal} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import {AddWorkout} from "../components/addWorkout";
import React from "react";
import { AppContext } from "main";
import MyPlugin from "main";
import {WorkoutTrackerSettings} from "../settings/settings.types";

export class addWorkout extends Modal {
	root: Root | null = null
	settings: WorkoutTrackerSettings

	constructor(app: App, settings: WorkoutTrackerSettings) {
		super(app);
		this.settings = settings
		this.setTitle('Workout Tracker');
	}

	async onOpen() {
		console.log(this.settings)
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<AppContext.Provider value={this.app}>
				<AddWorkout settings={this.settings}/>
			</AppContext.Provider>
		);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
