import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './../Charts.css';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import moment from 'moment';

function DatesLineChart() {
  const data = useSelector((state) => state.DashboardData.datedata);
  const [categories, setcategories] = useState([]);
  const [value, setvalue] = useState([]);
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
      curve: 'smooth',
    },
    title: {
      text: 'Requests Per Date',
      align: 'center',
      style: {
        color: 'grey',
      },
    },
    grid: {
      show: false,
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: '9px',
        },
      },
    },
  });
  const [chartdata, setdata] = useState([
    {
      name: 'Requests',
      data: [],
    },
  ]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      const keys = Object.keys(data);
      const values = [];
      keys.map((i) => values.push(data[i]));
      setcategories(keys);
      setvalue(values);
      const new_options = {
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
          curve: 'smooth',
        },
        title: {
          text: 'Requests Per Date',
          align: 'center',
          style: {
            color: 'grey',
          },
        },
        grid: {
          show: false,
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: keys,
          labels: {
            style: {
              fontSize: '9px',
            },
          },
        },
      };

      const new_values = [
        {
          name: 'Requests',
          data: values,
        },
      ];

      setdata(new_values);
      setoptions(new_options);
    }
  }, [data]);

  return (
    <Card className="dates-chart-container">
      <Chart options={options} series={chartdata} type="area" height="100%" />
    </Card>
  );
}

export default DatesLineChart;
