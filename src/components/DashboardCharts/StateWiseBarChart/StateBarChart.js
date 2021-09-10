import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import './../Charts.css';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

function StateBarChart() {
  const data = useSelector((state) => state.DashboardData.statedata);
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
    grid: {
      show: false,
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
  const [chartdata, setchartdata] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      const keys = Object.keys(data);
      const values = [];
      keys.map((i) => values.push(data[i]));
      const newdata = [];
      for (let i = 0; i < keys.length; i++) {
        const obj = {};
        obj['name'] = keys[i];
        obj['data'] = [values[i]];
        newdata.push(obj);
      }
      console.log(data);
      setchartdata(newdata);
    }
  }, [data]);

  return (
    <Card className="state-bar-chart">
      <Chart options={options} series={chartdata} type="bar" height="100%" />
    </Card>
  );
}

export default StateBarChart;
