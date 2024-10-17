import {WorkoutTrackerSettings} from "@/settings/settings.types";
import {Statistic} from "@/components/Statistic";
import {App, Modal} from "obsidian";
import {createRoot, Root} from "react-dom/client";
import { AppContext } from "main";

export class StatisticModal extends Modal {
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
				<Statistic context={this}/>
			</AppContext.Provider>
		);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
