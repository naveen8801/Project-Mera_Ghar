import React from 'react';
import './Dashboard.css';
import './../../components/Map/Map';
import DetailCard from '../../components/DashboardDetailCard/DetailCard';
import Map from './../../components/Map/Map';
import Card from '../../components/DashboardDetailCard/Card/Card';
import StagePieChar from '../../components/DashboardCharts/StagePieChart/StagePieChar';
import DatesLineChart from '../../components/DashboardCharts/DatesLineChart/DatesLineChart';
import StateBarChart from '../../components/DashboardCharts/StateWiseBarChart/StateBarChart';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="flexbox">
        <Map />
        <DetailCard />
      </div>
      <div className="small-data-card">
        <Card title="Total Requests" value={23} type="requests" />
        <Card title="Total Admins" value={10} type="admins" />
        <Card title="Accepted Requests" value={17} type="accepted" />
      </div>
      <div className="charts-section">
        <StagePieChar />
        <DatesLineChart />
      </div>
      <div className="state-chart-section">
        <StateBarChart />
      </div>
    </div>
  );
}

export default Dashboard;
