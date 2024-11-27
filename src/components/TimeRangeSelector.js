import React from 'react';
import { format } from 'date-fns';
import './style.css';

export function TimeRangeSelector({ timeRange, onTimeRangeChange, lastUpdate }) {
  const timeRanges = [
    { value: 'hour', label: 'Past Hour' },
    { value: 'day', label: 'Past Day' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' }
  ];

  return (
    <div className="time-range-selector">
      <div className="time-range-group">
        <label className="time-range-label" htmlFor="timeRangeSelect">
          Time Range
        </label>
        <select
          id="timeRangeSelect"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          className="time-range-select"
        >
          {timeRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="last-update">
        Last updated: {format(lastUpdate, 'HH:mm:ss')}
      </div>
    </div>
  );
}

export default TimeRangeSelector;
