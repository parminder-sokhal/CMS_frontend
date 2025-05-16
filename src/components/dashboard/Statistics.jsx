import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { CiLocationArrow1 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllStats } from "../../redux/actions/StatisticsAction.js";
import dayjs from "dayjs";

const Statistics = ({ filteredStats }) => {
  const dispatch = useDispatch();
  const { weekStats } = useSelector((state) => state.statistics);


  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weeklyData = daysOfWeek.map((_, index) => {
  const matched = filteredStats.find((entry) => {
    const dayIndex = dayjs(entry.date).day();
    return dayIndex === index;
  });

  return {
    visitors: matched?.visitors || 0,
    respondents: matched?.respondents || 0,
    reached: matched?.reached || 0,
  };
});


  const visitorData = weeklyData.map((day) => day.visitors);
  const respondentData = weeklyData.map((day) => day.respondents);
  const reachedData = weeklyData.map((day) => day.reached);


  const dataofprogress = [
    {
      progress: 80,
      color: "#AC4EFF",
      backgroundColor: "#02CBE6",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto py-4 px-4 gap-6">
      {/* Statistics Section */}
      <div className="w-full lg:w-2/3 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 px-5 py-3">Statistics</h1>
        <div className="bg-white p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <BarChart
              series={[
                { data: visitorData, label: "Visitors" },
                { data: respondentData, label: "Respondents" },
                { data: reachedData, label: "Reached" },
              ]}
              height={390}
              colors={["#6494FF", "#FF931E", "#AC4EFF"]}
              xAxis={[
                {
                  data: daysOfWeek,
                  scaleType: "band",
                },
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full lg:w-1/3 flex flex-col border border-gray-300">
        <h1 className="text-xl font-bold mb-6 px-5 py-4 border-b border-gray-200">
          Progress
        </h1>

        <div className="flex flex-col items-center w-full px-4">
          <div className="relative w-60 h-50 mb-8">
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
                strokeDasharray={`${dataofprogress[0].progress * 0.528} 100`}
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute top-25 left-1/2 transform -translate-x-1/2 text-center">
              <div
                className="rounded-full p-3 flex items-center justify-center"
                style={{
                  transform: `rotate(${
                    (dataofprogress[0].progress / 100) * 180 - 140
                  }deg)`,
                  transition: "transform 0.3s ease",
                  backgroundColor: dataofprogress[0].color,
                }}
              >
                <CiLocationArrow1 size={25} className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex w-full h-25 justify-between">
            <div className="w-1/2 text-center border-r h-15 border-gray-400">
              <h3 className="text-md font-semibold flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dataofprogress[0].color }}
                ></span>
                Progress
              </h3>
              <div className="text-xl">{dataofprogress[0].progress}%</div>
            </div>

            <div className="w-1/2 text-center">
              <h3 className="text-md font-semibold flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dataofprogress[0].backgroundColor }}
                ></span>
                In Progress
              </h3>
              <div className="text-xl">
                {100 - dataofprogress[0].progress}%
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-end w-full pt-6 px-4">
          <a href="/ContactUs">
            <button
              type="button"
              className="border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-100 text-sm md:text-base"
            >
              View all contacts
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
