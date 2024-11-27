import React from 'react';
import { format } from 'date-fns';
import './style.css';

export function QuakeDetails({ quake, onClose }) {
  const { properties, geometry } = quake;
  const [longitude, latitude, depth] = geometry.coordinates;

  return (
    <div className="quake-details">
      <button onClick={onClose} className="close-button">×</button>
      <h2 className="title">Earthquake Details</h2>
      <div className="details-grid">
        <div>
          <h3 className="detail-heading">Location</h3>
          <p>{properties.place}</p>
        </div>
        <div>
          <h3 className="detail-heading">Magnitude</h3>
          <p className={`magnitude ${getMagnitudeColor(properties.mag)}`}>
            {properties.mag}
          </p>
        </div>
        <div>
          <h3 className="detail-heading">Coordinates</h3>
          <p>{latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E</p>
        </div>
        <div>
          <h3 className="detail-heading">Depth</h3>
          <p>{depth.toFixed(2)} km</p>
        </div>
        <div>
          <h3 className="detail-heading">Time</h3>
          <p>{format(new Date(properties.time), 'PPpp')}</p>
        </div>
        <div>
          <h3 className="detail-heading">Status</h3>
          <p className="status">{properties.status}</p>
        </div>
      </div>
    </div>
  );
}

function getMagnitudeColor(magnitude) {
  if (magnitude >= 7) return 'magnitude-high';
  if (magnitude >= 5) return 'magnitude-medium';
  if (magnitude >= 3) return 'magnitude-low';
  return 'magnitude-minor';
}

export default QuakeDetails;
