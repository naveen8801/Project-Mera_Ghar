import React from 'react';
import './Dashboard.css';
import './../../components/Map/Map';
import DetailCard from '../../components/DashboardDetailCard/DetailCard';
import Map from './../../components/Map/Map';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="flexbox">
        <Map />
        <DetailCard />
      </div>
    </div>
  );
}

export default Dashboard;
