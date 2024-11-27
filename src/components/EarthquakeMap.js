import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { setupLeafletIcons } from '../utils/leafletSetup';
import { LoadingSpinner } from './LoadingSpinner';
import { QuakeMarker } from './QuakeMarker';
import { QuakeDetails } from './QuakeDetails';
import { SearchFilter } from './SearchFilter';
import { QuakeStats } from './QuakeStats';
import { TimeRangeSelector } from './TimeRangeSelector'; 
import './style.css';


setupLeafletIcons();

export function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuake, setSelectedQuake] = useState(null);
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('day');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeRange}.geojson`
        );
        setEarthquakes(response.data.features);
        setLastUpdate(new Date());
        setError(null);
      } catch (err) {
        setError('Failed to fetch earthquake data');
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 300000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const filteredEarthquakes = useMemo(() => {
    return earthquakes.filter(quake => {
      const matchesMagnitude = quake.properties.mag >= minMagnitude;
      const matchesSearch = searchQuery === '' || 
        quake.properties.place?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMagnitude && matchesSearch;
    });
  }, [earthquakes, minMagnitude, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: filteredEarthquakes.length,
      avgMagnitude: filteredEarthquakes.reduce((acc, quake) => 
        acc + quake.properties.mag, 0) / filteredEarthquakes.length || 0,
      maxMagnitude: Math.max(...filteredEarthquakes.map(quake => 
        quake.properties.mag)) || 0,
      recentCount: filteredEarthquakes.filter(quake => 
        new Date(quake.properties.time) > new Date(Date.now() - 3600000)).length
    };
  }, [filteredEarthquakes]);

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="earthquake-map-container">
      <div className="controls-container">
        <div className="filter-controls">
          <SearchFilter 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
            minMagnitude={minMagnitude}
            onMagnitudeChange={setMinMagnitude}
          />
          <TimeRangeSelector 
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            lastUpdate={lastUpdate}
          />
        </div>
        <QuakeStats stats={stats} />
      </div>

      <div className="map-container">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          className="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredEarthquakes.map((quake) => (
            <QuakeMarker
              key={quake.id}
              quake={quake}
              onSelect={setSelectedQuake}
              isSelected={selectedQuake?.id === quake.id}
            />
          ))}
        </MapContainer>
        
        {loading && <LoadingSpinner />}
      </div>

      {selectedQuake && (
        <QuakeDetails 
          quake={selectedQuake}
          onClose={() => setSelectedQuake(null)}
        />
      )}
    </div>
  );
}

export default EarthquakeMap;
