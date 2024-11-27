import React from 'react';
import './style.css';

export function SearchFilter({ searchQuery, onSearchChange, minMagnitude, onMagnitudeChange }) {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label className="filter-label" htmlFor="searchInput">
          Search Location
        </label>
        <input
          id="searchInput"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by location..."
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label className="filter-label" htmlFor="magnitudeInput">
          Minimum Magnitude: {minMagnitude}
        </label>
        <input
          id="magnitudeInput"
          type="range"
          min="0"
          max="9"
          step="0.1"
          value={minMagnitude}
          onChange={(e) => onMagnitudeChange(parseFloat(e.target.value))}
          className="filter-range"
        />
      </div>
    </div>
  );
}

export default SearchFilter;
