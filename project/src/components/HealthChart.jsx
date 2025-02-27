import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HealthChart = ({ title, data, labels, borderColor, backgroundColor, yAxisLabel }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor,
        backgroundColor,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: borderColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
        beginAtZero: false,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HealthChart;