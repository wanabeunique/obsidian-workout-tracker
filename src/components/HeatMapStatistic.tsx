import React from 'react';
import {WorkoutTrackerSettings} from "@/types/Settings";
import {App, FrontMatterCache} from "obsidian";
import {getWorkoutsDate} from "@/utils/getWorkoutsDates";
import HeatMap from "@uiw/react-heat-map";
import {useEffect, useState} from "react";
import {getSortedExercises} from "@/utils/getSortedExercises";
import {DisplayExercises} from "@/components/DisplayExercises";

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
 const [selectedYear, setSelectedYear] = useState(currentYear);

 const style = getComputedStyle(document.body);
 const mainColor = style.getPropertyValue('--color-accent');
 const baseColor = style.getPropertyValue('--text-on-accent');
 const textColor = style.getPropertyValue('--text-color');

 const [selected, setSelected] = useState('')
 const [selectedExercises, setSelectedExercises] = useState<Record<string, FrontMatterCache[]> | null>(null)

 useEffect(() => {
  if (!selected) return
  const formattedDate = selected.replace(/\//g, '-');
  const sortedExercises = getSortedExercises(app, settings, formattedDate, true)
  setSelectedExercises(sortedExercises as Record<string, FrontMatterCache[]>)
 }, [selected]);

 const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedYear(parseInt(event.target.value, 10));
 };

 return (
  <div>
   <div className={'flex gap-1 align-center'}>
    <label htmlFor="year-select">Select year: </label>
    <div className="select-wrapper">
     <select id="year-select" value={selectedYear} onChange={handleYearChange}>
      {Array.from({ length: 10 }, (_, i) => currentYear - i).map(year => (
       <option key={year} value={year}>{year}</option>
      ))}
     </select>
    </div>
   </div>
   <HeatMap
    startDate={new Date(`${selectedYear}/01/01`)}
    endDate={new Date(`${selectedYear}/12/31`)}
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
    {selected && (
     <>
      <div>Selected date: {selected}</div>
      <DisplayExercises selectedExercises={selectedExercises}/>
     </>
    )}
    {!selected && (<small>Select a day to get detailed information</small>)}
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
