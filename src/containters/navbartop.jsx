import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

function Navbartop() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tokenExists, setTokenExists] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    setTokenExists(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    dispatch(logout());
    navigate("/signin");
  };

  if (!tokenExists) return null;

  return (
    <>
      <header className="flex justify-between items-center px-3 sm:px-6 md:px-10 py-4 bg-white shadow-sm relative flex-wrap">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-1  rtl:space-x-reverse">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="/images/techtimes.png"
              alt="Logo"
              className="h-10 w-auto max-w-[140px] sm:max-w-[120px] xs:max-w-[100px]"
            />
          </a>
          <div className="text-base sm:text-lg font-bold text-blue-700 whitespace-nowrap">
            Techtimes.co.in
          </div>
        </div>

        {/* Right side - User Info & Dropdown */}
        <div className="flex items-center mt-3 sm:mt-0 ">
          <div
            className="relative flex items-center  cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="/images/admin1.png"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col pl-2 text-right text-xs sm:text-sm">
              <span className="text-gray-700 font-semibold">
                {user?.role?.name}
              </span>
              <span className="text-gray-900 font-medium">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <ChevronDown size={18} />
          </div>

          {showDropdown && (
            <div className="absolute top-16 right-4 sm:right-10 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="w-full text-sm px-4 py-2 text-left bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <hr className="border-gray-300" />
    </>
  );
}

export default Navbartop;
