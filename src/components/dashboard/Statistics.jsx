import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { BarChart } from '@mui/x-charts/BarChart';
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
  const dataofprogress = [
    {
      progress: 80, // Progress in percentage (from 0 to 100)
      color: "purple", // Main color of the filled section
      backgroundColor: "skyblue", // Background color of the unfilled section
    },
  ];

  return (
    <div className="flex justify-between mx-auto py-20 space-x-10">
      {/* Statistics Section */}
      <div className="w-full border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 px-5 py-3">
          Statistics
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 gap-4">
            {/* MUI BarChart component */}
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={290}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
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
