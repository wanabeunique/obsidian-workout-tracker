import React from 'react';
import {FrontMatterCache} from "obsidian";

export function DisplayExercises({ selectedExercises }: { selectedExercises: Record<string, FrontMatterCache[]> | null }) {
  if (!selectedExercises || Object.keys(selectedExercises).length === 0) {
    return <div className={'accent-color'}>No workout in this day</div>;
  }

  return (
    <div>
      {Object.entries(selectedExercises).map(([exercise, details], index) => (
        <div key={index}>
          {details.map((detail, idx) => (
            <div key={idx} className="exercise-detail">
              {Object.entries(detail).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
