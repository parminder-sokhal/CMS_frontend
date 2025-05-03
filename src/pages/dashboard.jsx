import React from "react";
import HeaderBoard from "../components/dashboard/HeaderBoard";
import Statistics from "../components/dashboard/Statistics";
import DashboardInfo from "../components/dashboard/DashboardInfo";

function dashboard() {
  return (
    <div>
      <HeaderBoard />
      <DashboardInfo/>
    </div>
  );
}

export default dashboard;
