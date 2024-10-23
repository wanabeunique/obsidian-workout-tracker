import {App} from "obsidian";
import {WorkoutTrackerSettings} from "@/types/Settings";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {ExerciseStatistic} from "@/components/ExerciseStatistic";
import {HeatMapStatistic} from "@/components/HeatMapStatistic";

export const Statistic = ({app, settings}: { app: App, settings: WorkoutTrackerSettings }) => {
	return (
		<Tabs>
			<TabList className={'flex gap-1 custom-tabs'}>
				<Tab>
					Basic statistic
				</Tab>
				<Tab>
					Exercise statistic
				</Tab>
			</TabList>
			<div>
				<TabPanel>
					<HeatMapStatistic app={app} settings={settings} />
				</TabPanel>
				<TabPanel>
					<ExerciseStatistic app={app} settings={settings}/>
				</TabPanel>
			</div>
		</Tabs>
	)
}
