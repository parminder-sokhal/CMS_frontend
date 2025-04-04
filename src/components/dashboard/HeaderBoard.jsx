import React, { useState } from "react";
import { GiProgression } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import Datepicker from "./datepicker"; 

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md">Select Date Range</h2>
        <Datepicker onChange={handleDateChange} />
      </div>

      <div className="flex flex-rows justify-start gap-6">
        <div className="p-4 w-64 border rounded-md shadow-sm bg-[#0000FE] text-white">
          <div className="flex items-center gap-2">
            <p>
              <GiProgression size={25} />
            </p>
            <h3 className="text-xl font-semibold flex">Total Visitors</h3>
          </div>
          <div className="flex flex-row py-4 px-6">
            <p className=" text-4xl font-bold ">{data.totalVisitors}</p>
          </div>
        </div>

        <div className="p-4 w-64 border rounded-md shadow-sm bg-[#FF931E] text-white">
          <div className="flex items-center gap-2">
            <p>
              <GiProgression size={25} />
            </p>

            <h3 className="text-xl font-semibold">Respondents</h3>
          </div>
          <div className="flex flex-row py-4 items-center justify-between">
            <p className=" text-4xl font-bold ">{data.respondents}</p>
            <p className="bg-white text-[#FF931E] rounded-4xl p-1">
              <FaArrowRight size={25} />
            </p>
          </div>
        </div>

        <div className="p-4 w-64 border rounded-md shadow-sm bg-[#AC4EFF] text-white">
          <div className="flex items-center gap-2">
            <p>
              <GiProgression size={25} />
            </p>
            <h3 className="text-xl font-semibold">Visitors We Reached</h3>
          </div>
          <div className="flex flex-row py-4 items-center justify-between">
            <p className=" text-4xl font-bold ">{data.visitorsWeReached}</p>
            <p className="bg-white text-[#AC4EFF] rounded-4xl p-1">
              <FaArrowRight size={25} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBoard;
