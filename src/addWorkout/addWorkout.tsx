import {App, Modal, Setting} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import {ReactView} from "../components/ReactView";
import React from "react";
import {statistic} from "../statistic/statistic";
import { AppContext } from "main";

export class addWorkout extends Modal {
	root: Root | null = null
	constructor(app: App) {
		super(app);
		this.setTitle('Workout Tracker');
	}

	async openStatistic() {
		new statistic(this.app).open()
		this.close()
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<AppContext.Provider value={this}>
				<ReactView openStatistic={this.openStatistic}/>
			</AppContext.Provider>
		);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
