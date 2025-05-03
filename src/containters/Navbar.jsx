import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Boxes, Package, Menu } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tokenExists, setTokenExists] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    setTokenExists(!!token);
  }, [location]);

  // Close sidebar only on small/medium screens
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };
  
  if (tokenExists === null) return null;

  // If token doesn't exist, don't render the navbar
  if (!tokenExists) return null;

  return (
    
    <>
      {/* Hamburger icon - visible only on sm and md screens */}
      <div className="lg:hidden bg-white  border-gray-400 absolute justify-start items-start">
        <button onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 h-full w-54 bg-white border-r border-gray-400 z-50 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block`}
      >
        <nav className="h-full flex flex-col">
          <ul className="flex-1 px-3 pt-4">
            <SidebarItem
              icon={<Boxes size={20} />}
              text="DASHBOARD"
              to="/Dashboard"
              active={location.pathname === "/Dashboard"}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={<Package size={20} />}
              text="ADD EMPLOYEE"
              to="/addEmployee"
              active={location.pathname === "/addEmployee"}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={<Package size={20} />}
              text="EMPLOYEE LIST"
              to="/EmployeeList"
              active={location.pathname === "/EmployeeList"}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={<Package size={20} />}
              text="Contact Us"
              to="/contactus"
              active={location.pathname === "/contactus"}
              onClick={handleLinkClick}
            />
            <hr className="border-gray-400" />
          </ul>
        </nav>
      </aside>

      {/* Overlay with blur */}
      {isSidebarOpen && (
        <div
          className="fixed mt-20 inset-0 backdrop-blur-sm bg-white/30 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export function SidebarItem({ icon, text, to, active, onClick }) {
  return (
    <li
      className={`relative flex flex-col items-start py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-blue-700 text-white" : "text-black"
      }`}
      onClick={onClick}
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
