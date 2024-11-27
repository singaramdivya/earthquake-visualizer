import React from 'react';
import EarthquakeMap from './components/EarthquakeMap';
import './App.css';

export function App() {
  return (
    <div className="app">
      <h1 className="app-title">Real-Time Earthquake Monitor</h1>
      <EarthquakeMap />
    </div>
  );
}

export default App;
