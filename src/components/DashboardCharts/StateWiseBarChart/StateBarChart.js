import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './../Charts.css';

function StateBarChart() {
  const [options, setoptions] = useState({
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['States'],
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Requests Per State',
      align: 'center',
      style: {
        color: 'grey',
      },
    },
  });
  const [chartdata, setchartdata] = useState([
    { name: 'UP', data: [3] },
    { name: 'Delhi', data: [2] },
    { name: 'Haryana', data: [10] },
    { name: 'Punjab', data: [5] },
    { name: 'Odissa', data: [6] },
    { name: 'Maharastra', data: [9] },
  ]);
  return (
    <div className="state-bar-chart">
      <Chart options={options} series={chartdata} type="bar" height="100%" />
    </div>
  );
}

export default StateBarChart;
