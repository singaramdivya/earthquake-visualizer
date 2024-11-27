import React from 'react';
import useEarthquakeStore from '../store/earthquakeStore';
import './style.css';

const FilterPanel = () => {
  const { filters, setFilters } = useEarthquakeStore();

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="filter-panel">
      <h2 className="filter-title">Filters</h2>
      <div className="filter-options">
        <div className="filter-option">
          <label className="filter-label">Minimum Magnitude</label>
          <input
            type="range"
            min="0"
            max="9"
            step="0.1"
            value={filters.minMagnitude}
            onChange={(e) => handleFilterChange('minMagnitude', parseFloat(e.target.value))}
            className="filter-range"
          />
          <span className="filter-value">{filters.minMagnitude}</span>
        </div>
        <div className="filter-option">
          <label className="filter-label">Time Range</label>
          <select
            value={filters.timeRange}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
            className="filter-select"
          >
            <option value="hour">Past Hour</option>
            <option value="day">Past Day</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
