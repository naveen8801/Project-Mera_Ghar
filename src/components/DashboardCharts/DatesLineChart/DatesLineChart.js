import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './../Charts.css';

function DatesLineChart() {
  const [options, setoptions] = useState({
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Requests Per Date',
      align: 'center',
      style: {
        color: 'grey',
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['date 1', 'date 2', 'date 3', 'date 4', 'date 5'],
    },
  });
  const [chartdata, setdata] = useState([
    {
      name: 'Requests',
      data: [10, 41, 35, 51, 49],
    },
  ]);
  return (
    <div className="dates-chart-container">
      <Chart options={options} series={chartdata} type="line" height="100%" />
    </div>
  );
}

export default DatesLineChart;
