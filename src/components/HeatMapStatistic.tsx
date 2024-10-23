import {WorkoutTrackerSettings} from "@/types/Settings";
import {App} from "obsidian";
import {getWorkoutsDate} from "@/utils/getWorkoutsDates";
import HeatMap from "@uiw/react-heat-map";
import {useState} from "react";

export function HeatMapStatistic({app, settings}: { app: App, settings: WorkoutTrackerSettings }) {
	const workoutsDate = getWorkoutsDate(app, settings)

	const value = Array.from(workoutsDate).map((date) => {
		const formattedDate = date.replace(/-/g, '/');
		return {
			date: formattedDate,
			count: 1
		}
	})

	const currentYear = new Date().getFullYear();

	const style = getComputedStyle(document.body);
	const mainColor = style.getPropertyValue('--color-accent');
	const baseColor = style.getPropertyValue('--text-on-accent');
	const textColor = style.getPropertyValue('--text-color');

	const [selected, setSelected] = useState('')
	return (
		<div>
			<HeatMap
				startDate={new Date(`${currentYear}/01/01`)}
				endDate={new Date(`${currentYear}/12/31`)}
				style={{color: textColor, fontWeight: 'bold'}}
				space={2}
				rectSize={7}
				legendCellSize={0}
				panelColors={{
					0: baseColor,
					1: mainColor
				}}
				width={520}
				value={value}
				rectRender={(props, data) => {
					return (
						<rect {...props}
							  onClick={() => {
								  setSelected(data.date === selected ? '' : data.date);
							  }}
						/>
					);
				}}
			/>
			<div className={'flex-col gap-1'}>
				{selected && (<div>Selected date: {selected}</div>)}
				<div className={'flex gap-1 align-center'}>
					<div className={'box'} style={{background: mainColor}}></div>
					<span>Day with workout</span>
				</div>
				<div className={'flex gap-1 align-center'}>
					<div className={'box'} style={{background: baseColor}}></div>
					<span>Day without workout</span>
				</div>

			</div>
		</div>
	)
}
