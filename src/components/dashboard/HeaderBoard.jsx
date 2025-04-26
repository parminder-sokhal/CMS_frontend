import React, { useState } from "react";
import { GiProgression } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import Dateselected from "./dateselected";

const data = {
  totalVisitors: 100,
  respondents: 50,
  visitorsWeReached: 30,
};

const HeaderBoard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateChange = (startDate, endDate) => {
    setSelectedDateRange({ start: startDate, end: endDate });
    console.log({ startDate, endDate });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header + Date Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <div className="w-full md:w-1/2 flex justify-start md:justify-end">
          <Dateselected />
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Total Visitors */}
        <div className="flex flex-col px-4 py-4 min-w-72 border rounded-md shadow-sm bg-[#0000FE] text-white">
          <div className="flex items-center gap-2">
            <p className="bg-white text-[#0000FE] rounded-full p-1">
              <GiProgression size={25} />
            </p>
            <h3 className="text-lg md:text-xl font-semibold">Total Visitors</h3>
          </div>
          <div className="pl-10 p-1">
            <p className="text-3xl md:text-4xl font-bold">{data.totalVisitors}</p>
          </div>
        </div>

        {/* Respondents */}
        <div className="flex flex-col px-4 py-4 min-w-72 border rounded-md shadow-sm bg-[#FF931E] text-white">
          <div className="flex items-center gap-2">
            <p className="bg-white text-[#FF931E] rounded-full p-1">
              <GiProgression size={25} />
            </p>
            <h3 className="text-lg md:text-xl font-semibold">Respondents</h3>
          </div>
          <div className="pl-10 p-1 flex items-center justify-between">
            <p className="text-3xl md:text-4xl font-bold">{data.respondents}</p>
            <p className="bg-white text-[#FF931E] rounded-full p-1">
              <FaArrowRight size={25} />
            </p>
          </div>
        </div>

        {/* Visitors We Reached */}
        <div className=" flex flex-col px-4 py-4 min-w-72 border rounded-md shadow-sm bg-[#AC4EFF] text-white">
          <div className="flex items-center gap-2">
            <p className="bg-white text-[#AC4EFF] rounded-full p-1">
              <GiProgression size={25} />
            </p>
            <h3 className="text-lg md:text-xl font-semibold">Visitors We Reached</h3>
          </div>
          <div className="pl-10 p-1 flex items-center justify-between">
            <p className="text-3xl md:text-4xl font-bold">{data.visitorsWeReached}</p>
            <p className="bg-white text-[#AC4EFF] rounded-full p-1">
              <FaArrowRight size={25} />
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HeaderBoard;
