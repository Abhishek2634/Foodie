import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({data}){
    console.log(data)

    const labels = data.map(item => item.itemName)
    const values = data.map(item => item.orderCount)


    const chartData = {
        labels,
        datasets : [
            {
                label : 'Order count',
                data : values,
                backgroundColor : "#F6A832",
                borderWidth : 1,
                borderColor : 'tomato'
            }
        ]
    }

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'bottom',
        labels : {
            font : {
                size : 16,
            },
            color : "gray",
        }
    },
      title: {
        display: true,
        text: 'Top 5 most ordered food items',
        color : "gray",
        font : {
            size : 26,
            weight : '500',
        },
        padding: {
            bottom : 50
        },
        align : "center"
      },
    },
  };

  return (
    <div className='barChart'>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;