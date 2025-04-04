import React from "react";
import { Bell, ChevronDown } from "lucide-react";

function navbartop() {
  return (
    <>
    <header className="container flex items-center justify-between px-10 bg-white p-4  border-gray-100 shadow-sm">
      <div className="flex items-center justify-between  space-x-3 rtl:space-x-reverse">
      <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/images/techtimes.png"
              className="h-16"
              alt="Logo"
            />
          </a>
        <div className="text-lg font-bold text-blue-700">Techtimes.co.in</div>
      </div>
      <div className="flex items-center space-x-4">
        <Bell size={24} className="cursor-pointer text-blue-700" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="/images/admin1.png"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium">Admin</span>
            <span className="text-xs text-black">admin@domain.com</span>
          </div>
          <ChevronDown size={18} />
        </div>
      </div>
    </header>
    <hr className="border-gray-400"/>

    </>
  );
}

export default navbartop;
