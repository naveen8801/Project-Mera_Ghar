import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './../Charts.css';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

function StageBarChar() {
  const data = useSelector((state) => state.DashboardData.stagedata);
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
    grid: {
      show: false,
    },
    legend: {
      show: false,
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
  const [chartdata, setchartdata] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      const keys = Object.keys(data);
      const values = [];
      keys.map((i) => values.push(data[i]));
      const new_chartdata = [
        { ...chartdata, data: [values[0]] },
        { ...chartdata, data: [values[1]] },
        { ...chartdata, data: [values[2]] },
      ];

      setchartdata(new_chartdata);
    }
  }, [data]);

  return (
    <Card className="chartconatiner">
      <Chart options={options} series={chartdata} type="bar" height="100%" />
    </Card>
  );
}

export default StageBarChar;
