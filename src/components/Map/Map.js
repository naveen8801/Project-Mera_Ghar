import React from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import './Map.css';

function DashboardMap() {
  return (
    <div className="map">
      <Map defaultCenter={[21.1458, 79.0882]} defaultZoom={4.8}>
        <ZoomControl />
        <Marker width={40} anchor={[28.5934, 77.2223]} />
      </Map>
    </div>
  );
}

export default DashboardMap;
