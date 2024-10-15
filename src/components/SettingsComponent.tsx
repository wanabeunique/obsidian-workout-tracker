import React from 'react';
import {WorkoutTrackerSettings} from '../settings/settings.types';

interface SettingsComponentProps {
	settings: WorkoutTrackerSettings;
	saveSettings: () => Promise<void>;
}

const settingsParams = [
	{

		name: 'Workouts Folder',
		desc: 'The folder where workouts are stored',
		valueKey: 'workoutsFolder',
		placeholder: 'Enter the folder name'
	},
	{
		name: 'Exercises Folder',
		desc: 'The folder where exercises are stored',
		valueKey: 'exercisesFolder',
		placeholder: 'Enter the folder name'
	}
];

const SettingsComponent: React.FC<SettingsComponentProps> = () => {
	return (
		<div>
		</div>
	);
};

export default SettingsComponent;
