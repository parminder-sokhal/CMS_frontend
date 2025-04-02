import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  // Sample data where we define 3 lines for each day
  const data = [
    { day: "Monday", line1: 30, line2: 50, line3: 20 },
    { day: "Tuesday", line1: 45, line2: 70, line3: 25 },
    { day: "Wednesday", line1: 60, line2: 80, line3: 40 },
    { day: "Thursday", line1: 70, line2: 90, line3: 45 },
    { day: "Friday", line1: 55, line2: 65, line3: 35 },
    { day: "Saturday", line1: 40, line2: 60, line3: 30 },
    { day: "Sunday", line1: 50, line2: 75, line3: 30 },
  ];

  const chartData = {
    labels: data.map((item) => item.day), // Days of the week
    datasets: [
      {
        label: "Line 1",
        data: data.map((item) => item.line1), // Values for line 1
        borderColor: "rgba(59, 130, 246, 1)", // Blue color
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Blue color
        fill: true,
        borderWidth: 2,
        pointRadius: 5, // Adjust point size
        pointBackgroundColor: "rgba(59, 130, 246, 1)", // Point color
        tension: 0, // Make lines sharp (no curve)
      },
      {
        label: "Line 2",
        data: data.map((item) => item.line2), // Values for line 2
        borderColor: "rgba(249, 115, 22, 1)", // Orange color
        backgroundColor: "rgba(249, 115, 22, 0.2)", // Orange color
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(249, 115, 22, 1)",
        tension: 0,
      },
      {
        label: "Line 3",
        data: data.map((item) => item.line3), // Values for line 3
        borderColor: "rgba(167, 39, 207, 1)", // Purple color
        backgroundColor: "rgba(167, 39, 207, 0.2)", // Purple color
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(167, 39, 207, 1)",
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Week",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Statistics</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 19"
              >
                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
              </svg>
            </div>
            <div>
              <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">3.4k</h5>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Leads generated per week
              </p>
            </div>
          </div>
          <div>
            <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13V1m0 0L1 5m4-4 4 4"
                />
              </svg>
              42.5%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Chart component */}
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
