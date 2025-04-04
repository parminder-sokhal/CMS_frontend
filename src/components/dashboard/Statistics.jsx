import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { CiLocationArrow1 } from "react-icons/ci";


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

  const dataofprogress = [
    {
      progress: 80, // Progress in percentage (from 0 to 100)
      color: "purple", // Main color of the filled section
      backgroundColor: "skyblue", // Background color of the unfilled section
    },
  ];

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
    <div className="flex justify-between mx-auto py-20 space-x-10">
      {/* Statistics Section */}
      <div className="w-2/3 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 px-5 py-3">
          Statistics
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Chart component */}
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-1/3 border border-gray-200 h-96">
        <h1 className="text-xl font-bold mb-10 px-5 py-4 border-b border-gray-200">
          Progress
        </h1>

        <div className="flex flex-col items-center w-full ">
          <div className="relative w-60 h-50">
            <svg className="w-full h-full rotate-180" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="16"
                r="16"
                fill="none"
                stroke={dataofprogress[0].backgroundColor}
                strokeWidth="8"
                strokeDasharray="50 100"
                strokeLinecap="round"
              ></circle>

              <circle
                cx="18"
                cy="16"
                r="16"
                fill="none"
                stroke={dataofprogress[0].color}
                strokeWidth="8"
                strokeDasharray={`${dataofprogress[0].progress * 0.528} 100`} // 180-degree circle
                strokeLinecap="round"
              ></circle>
            </svg>

            <div className="absolute top-25 left-1/2 transform -translate-x-1/2 text-center ">
              <div
              className="rounded-full p-3 flex items-center justify-center"
                style={{
                  transform: `rotate(${(dataofprogress[0].progress / 100) * 180-140}deg)`,

                  transition: "transform 0.3s ease", // Smooth transition for rotation
                  backgroundColor: dataofprogress[0].color
                }}
              >
                <CiLocationArrow1 
                  size={25} // Adjust the size of the arrow
                  className="text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-around">
            <div className="w-1/2 text-center border-r">
              <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dataofprogress[0].color }}
                ></span>
                Progress
              </h3>
              <div className="text-xl">{dataofprogress[0].progress}%</div>
            </div>

            <div className="w-1/2 text-center">
              <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dataofprogress[0].backgroundColor }}
                ></span>
                In Progress
              </h3>
              <div className="text-xl">{100 - dataofprogress[0].progress}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
