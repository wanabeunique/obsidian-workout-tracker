import {App, Modal} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import React from "react";
import { AppContext } from "../../main";
import {WorkoutTrackerSettings} from "@/types/Settings";
import {AddWorkout} from "@/components/AddWorkout";

export class addWorkout extends Modal {
	root: Root | null = null
	settings: WorkoutTrackerSettings

	constructor(app: App, settings: WorkoutTrackerSettings) {
		super(app);
		this.settings = settings
		this.setTitle('Workout Tracker');
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<AppContext.Provider value={this.app}>
				<AddWorkout settings={this.settings} context={this}/>
			</AppContext.Provider>
		);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
