import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { BarChart } from "@mui/x-charts/BarChart";
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
      color: "#AC4EFF", // Main color of the filled section
      backgroundColor: "#02CBE6", // Background color of the unfilled section
    },
  ];

  return (
    <div className="flex justify-between mx-auto py-4 space-x-10">
      {/* Statistics Section */}
      <div className="w-2/3 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 px-5 py-3">
          Statistics
        </h1>
        <div className="bg-white p-6">
          <div className="grid grid-cols-1 gap-10">
            {/* MUI BarChart component */}
            <BarChart
              series={[
                { data: [635, 440, 840, 340, 350, 440, 940] },
                { data: [510, 600, 490, 300, 910, 600, 409] },
                { data: [915, 825, 900, 500, 550, 805, 300] },
              ]}
              height={390}
              colors={["#6494FF", "#FF931E", "#AC4EFF"]}
              xAxis={[
                {
                  data: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thrusday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  scaleType: "band",
                },
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-1/3 ">
        <div className="flex flex-col border border-gray-300">
          <h1 className="text-xl font-bold mb-10 px-5 py-4 border-b border-gray-200">
            Progress
          </h1>
          <div className="flex flex-col items-center w-full ">
            <div className="relative w-60 h-50 mb-10">
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
                    transform: `rotate(${
                      (dataofprogress[0].progress / 100) * 180 - 140
                    }deg)`,

                    transition: "transform 0.3s ease", // Smooth transition for rotation
                    backgroundColor: dataofprogress[0].color,
                  }}
                >
                  <CiLocationArrow1
                    size={25} // Adjust the size of the arrow
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full h-25  justify-between">
              <div className="w-1/2 text-center border-r h-15 border-gray-400">
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
                    style={{
                      backgroundColor: dataofprogress[0].backgroundColor,
                    }}
                  ></span>
                  In Progress
                </h3>
                <div className="text-xl">
                  {100 - dataofprogress[0].progress}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full pt-7 px-2">
        <a href="/ContactUs">
          <button type="button" className="border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-100">View all contacts</button>
        </a>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
