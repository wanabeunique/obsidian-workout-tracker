import {App, Modal, Setting} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import React from "react";
import {Statistic} from "../components/Statistic";

export class statistic extends Modal {
	root: Root | null = null

	constructor(app: App) {
		super(app);
		this.setTitle('Workout Tracker');
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		const component = React.createElement(Statistic);
		this.root.render(component);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
