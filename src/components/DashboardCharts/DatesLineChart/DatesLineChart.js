import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './../Charts.css';
import { useSelector } from 'react-redux';

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
      categories: [],
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
          categories: categories,
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
    <div className="dates-chart-container">
      <Chart options={options} series={chartdata} type="area" height="100%" />
    </div>
  );
}

export default DatesLineChart;
