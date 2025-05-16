import React, { useEffect, useState } from "react";
import { GiProgression } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Dateselected from "./dateselected";
import { getAllStats } from "../../redux/actions/StatisticsAction.js";
import Statistics from "./Statistics.jsx"

dayjs.extend(utc);

const HeaderBoard = () => {
  const dispatch = useDispatch();
  const allStats = useSelector((state) => state.statistics.allStats) || [];

  const [filteredStats, setFilteredStats] = useState([]);

  // const [selectedDateRange, setSelectedDateRange] = useState({
  //   start: dayjs().subtract(7, 'day').format("YYYY-MM-DD"),
  //   end: dayjs().format("YYYY-MM-DD"),
  // });
  const [selectedDateRange, setSelectedDateRange] = useState({
  start: dayjs().startOf("month").format("YYYY-MM-DD"),
  end: dayjs().endOf("month").format("YYYY-MM-DD"),
});

  
  useEffect(() => {
    dispatch(getAllStats());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDateRange && Array.isArray(allStats)) {
      const startDate = dayjs.utc(selectedDateRange.start).startOf("day");
      const endDate = dayjs.utc(selectedDateRange.end).startOf("day");

      const filtered = allStats.filter((item) => {
        const itemDate = dayjs.utc(item.date).startOf("day");
        return itemDate.isAfter(startDate.subtract(1, "day")) && itemDate.isBefore(endDate.add(1, "day"));
      });

      setFilteredStats(filtered);
    }
  }, [allStats, selectedDateRange]);

  const totalVisitors = filteredStats.reduce((sum, stat) => sum + stat.visitors, 0);
  const totalRespondents = filteredStats.reduce((sum, stat) => sum + stat.respondents, 0);
  const totalReached = filteredStats.reduce((sum, stat) => sum + stat.reached, 0);

  const handleDateChange = (startDate, endDate) => {
    setSelectedDateRange({ start: startDate, end: endDate });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <div className="w-full md:w-1/2 flex justify-start md:justify-end">
          <Dateselected onDateChange={handleDateChange} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <StatCard title="Total Visitors" value={totalVisitors} color="#0000FE" />
        <StatCard title="Respondents" value={totalRespondents} color="#FF931E" />
        <StatCard title="Visitors We Reached" value={totalReached} color="#AC4EFF" />
      </div>
        <Statistics filteredStats={filteredStats} />
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div
    className="flex flex-col px-4 py-4 min-w-72 border rounded-md shadow-sm"
    style={{ backgroundColor: color, color: "#fff" }}
  >
    <div className="flex items-center gap-2">
      <p className="bg-white" style={{ color, borderRadius: "9999px", padding: "4px" }}>
        <GiProgression size={25} />
      </p>
      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
    </div>
    <div className="pl-10 p-1 flex items-center justify-between">
      <p className="text-3xl md:text-4xl font-bold">{value}</p>
      <p className="bg-white rounded-full p-1" style={{ color }}>
        <FaArrowRight size={25} />
      </p>
    </div>
  </div>
);

export default HeaderBoard;
