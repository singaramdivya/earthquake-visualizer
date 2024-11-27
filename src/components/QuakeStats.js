import React from 'react';
import './style.css';

export function QuakeStats({ stats }) {
  return (
    <div className="stats-grid">
      <StatCard
        title="Total Earthquakes"
        value={stats.total}
        color="blue"
      />
      <StatCard
        title="Average Magnitude"
        value={stats.avgMagnitude.toFixed(2)}
        color="green"
      />
      <StatCard
        title="Highest Magnitude"
        value={stats.maxMagnitude.toFixed(1)}
        color="red"
      />
      <StatCard
        title="Last Hour"
        value={stats.recentCount}
        color="purple"
      />
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );
}

export default QuakeStats;
