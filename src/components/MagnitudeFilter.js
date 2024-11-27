import React from 'react';
import './style.css';

export function MagnitudeFilter({ minMagnitude, onMagnitudeChange }) {
  return (
    <div className="magnitude-filter">
      <label className="filter-label">
        Minimum Magnitude: <span className="magnitude-value">{minMagnitude}</span>
      </label>
      <input
        type="range"
        min="0"
        max="9"
        step="0.1"
        value={minMagnitude}
        onChange={(e) => onMagnitudeChange(parseFloat(e.target.value))}
        className="range-slider"
      />
    </div>
  );
}

export default MagnitudeFilter;
