import Chart from "react-apexcharts";
import {App} from "obsidian";
import {WorkoutTrackerSettings} from "@/settings/settings.types";
import React, {useEffect, useMemo, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {ExerciseStatistic} from "@/components/ExerciseStatistic";
import {HeatMapStatistic} from "@/components/HeatMapStatistic";

export const Statistic = ({app, settings}: { app: App, settings: WorkoutTrackerSettings }) => {
	return (
		<Tabs>
			<TabList className={'flex gap-1 custom-tabs'}>
				<Tab>
					<button>Basic statistic</button>
				</Tab>
				<Tab>
					<button>Exercise statistic</button>
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
