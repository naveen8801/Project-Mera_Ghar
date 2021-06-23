import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './../Charts.css';

function StageBarChar() {
  const [options, setoptions] = useState({
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['Site Preparation', 'Framing', 'Roofing'],
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Ongoing Stage Of House Construction',
      align: 'center',
      style: {
        color: 'grey',
      },
    },
  });
  const [chartdata, setchartdata] = useState([
    { name: 'Site Preparation', data: [13] },
    { name: 'Framing', data: [32] },
    { name: 'Roofing', data: [14] },
  ]);
  return (
    <div className="chartconatiner">
      <Chart options={options} series={chartdata} type="bar" height="100%" />
    </div>
  );
}

export default StageBarChar;
