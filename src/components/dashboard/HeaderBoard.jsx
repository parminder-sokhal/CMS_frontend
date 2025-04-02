import React, { useState } from "react";
import Select from "react-select";
import { GiProgression } from "react-icons/gi";

// Data for all months
const data = {
  January: {
    totalVisitors: 100,
    respondents: 50,
    visitorsWeReached: 30,
  },
  February: {
    totalVisitors: 120,
    respondents: 60,
    visitorsWeReached: 40,
  },
  March: {
    totalVisitors: 150,
    respondents: 70,
    visitorsWeReached: 50,
  },
  December: {
    totalVisitors: 80,
    respondents: 40,
    visitorsWeReached: 20,
  },
  // Add more months data here...
};

// Transforming the data into options for react-select
const monthOptions = Object.keys(data).map((month) => ({
  value: month,
  label: month,
}));

const HeaderBoard = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedData, setSelectedData] = useState(data[selectedMonth]);

  // Handle month change
  const handleMonthChange = (selectedOption) => {
    const month = selectedOption.value;
    setSelectedMonth(month);
    setSelectedData(data[month]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex items-center space-x-2">
          <h2 className="text-md">Select Month</h2>

          {/* Dropdown using react-select */}
          <Select
            className="basic-single w-44"
            classNamePrefix="select"
            defaultValue={{ value: selectedMonth, label: selectedMonth }}
            onChange={handleMonthChange}
            options={monthOptions}
            isClearable={false}
            isSearchable={true}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-rows justify-start gap-6">
  <div className="p-4 border rounded-md shadow-sm bg-blue-700 text-white ">
  <div className="flex items-center gap-2">
  <p><GiProgression size={25}/></p>
    <h3 className="text-xl font-semibold flex">Total Visitors</h3>
  </div>
    <p className="text-4xl font-bold mt-4">{selectedData.totalVisitors}</p>
  </div>

  <div className="p-4 border rounded-md shadow-sm bg-orange-500 text-white ">
  <div className="flex items-center gap-2">
  <p><GiProgression size={25}/></p>
   
    <h3 className="text-xl font-semibold">Respondents</h3>
  </div>
    <p className="text-4xl font-bold mt-4">{selectedData.respondents}</p>
  </div>

  <div className="p-4 border rounded-md shadow-sm bg-purple-600 text-white ">
  <div className="flex items-center gap-2">
  <p><GiProgression size={25}/></p>
    <h3 className="text-xl font-semibold">Visitors We Reached</h3>
  </div>
    <p className="text-4xl font-bold mt-4">{selectedData.visitorsWeReached}</p>
  </div>
</div>

    </div>
  );
};

export default HeaderBoard;
