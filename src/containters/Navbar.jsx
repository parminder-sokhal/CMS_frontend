import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Boxes, Package, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  return (
    <div>
      <aside className="h-screen w-64 bg-white border-r border-gray-400">
        <nav className="h-full flex flex-col">
          <ul className="flex-1 px-3">
            <SidebarItem
              icon={<Boxes size={20} />}
              text="DASHBOARD"
              to="/Dashboard"
              active={location.pathname === "/Dashboard"}
            />
            <SidebarItem
              icon={<Package size={20} />}
              text="ADD EMPLOYEE"
              to="/addEmployee"
              active={location.pathname === "/addEmployee"}
            />
            <hr className="my-3 border-gray-400" />
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, to, active }) {
  return (
    <li
      className={`relative flex flex-col items-start py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-blue-700 text-white" : "text-black"
      }`}
    >
      {to ? (
        <Link to={to} className="w-full block">
          <div className="flex items-center">
            {icon}
            <span className="ml-3">{text}</span>
          </div>
        </Link>
      ) : (
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{text}</span>
        </div>
      )}
    </li>
  );
}
