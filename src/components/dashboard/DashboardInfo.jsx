import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import ModalOpenTeacher from "./ModalOpenTeacher";

const TABLE_HEAD = [
  "Name/Ip",
  "Email",
  "Phone No.",
  "Date",
  "Nationality",
  "Message",
  "Make a Call",
  "Status",
  "Action"
];

const sortKeyMap = {
  "Name/Ip": "name",
  Email: "email",
  "Phone No.": "phone",
  Status: "isLive",
};

function DashboardInfo() {
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, SetData] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const rowsPerPage = 4;

  useEffect(() => {
    const dummyData = [
      {
        _id: "1",
        name: "Amit Kumar",
        ip: "IP123456",
        email: "amitk@gmail.com",
        phone: "95637-89264",
        date: "2025-01-14",
        nationality: "Indian",
        message: "Do you offer services for.....",
        callTime: "Jan 20, 2025 9:00 AM",
        isLive: true,
      },
      {
        _id: "2",
        name: "Arjun Mehta",
        ip: "IP2345678",
        email: "arjun.mehta@gmail.com",
        phone: "98765-43210",
        date: "2025-01-10",
        nationality: "Indian",
        message: "Looking for IT consulting for.....",
        callTime: "Jan 20, 2025 9:00 AM",
        isLive: true,
      },
      {
        _id: "3",
        name: "Sofia Garcia",
        ip: "IP3456789",
        email: "amitk@gmail.com",
        phone: "95637-89264",
        date: "2025-01-14",
        nationality: "Indian",
        message: "Do you offer services for.....",
        callTime: "N/A",
        isLive: false,
      },
    ];

    setTableRows(dummyData);
  }, []);

  const filteredRows = tableRows.filter((teacher) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      teacher.name?.toLowerCase().includes(searchTermLower) ||
      String(teacher.phone)?.toLowerCase().includes(searchTermLower) ||
      teacher.nationality?.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    const getNestedValue = (obj, key) => {
      if (!obj || !key) return undefined;

      return key.split(".").reduce((o, k) => {
        if (o && o[k] !== undefined) {
          return o[k];
        }
        return undefined;
      }, obj);
    };

    const aValue = getNestedValue(a, sortConfig.key);
    const bValue = getNestedValue(b, sortConfig.key);

    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortConfig.direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleSort = (column) => {
    if (column === "Name/Ip") {
      const direction =
        sortConfig.key === "name" && sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      setSortConfig({ key: "name", direction });
    } else {
      const key = sortKeyMap[column];
      const direction =
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      setSortConfig({ key, direction });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleToggleLiveStatus = (id) => {
    setTableRows((prevRows) =>
      prevRows.map((teacher) =>
        teacher._id === id ? { ...teacher, isLive: !teacher.isLive } : teacher
      )
    );
  };

  const handleOpenModal = (teacher = null) => {
    if (teacher) {
      SetData(teacher);
      setEditingId(teacher._id);
    } else {
      SetData("");
      setEditingId(null);
    }
    setIsModalOpen(true);
  };
  const handleSaveTeacher = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-full p-4 border border-gray-200 mb-25">
        <div className="flex flex-col sm:flex-row justify-start gap-4 mb-4 ">
          <div className="relative mt-4 sm:mt-0 sm:w-72">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
          <div className="flex flex-col border border-gray-400 rounded-md h-10 w-25">
            <div className="flex items-center py-1 justify-evenly ">
              <CiCalendar size={30} className=" items-center text-gray-600" />
              <p className="text-gray-500">Filter</p>
            </div>
          </div>
          <div className="flex flex-col border border-gray-400 rounded-md h-10 w-30 ">
            <div className="flex items-center py-1 justify-around ">
              <p className="text-gray-500">All Status</p>
              <IoIosArrowDown
                size={25}
                className=" items-center text-gray-400 mt-1"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          {tableRows.length === 0 ? (
            <div className="text-center p-4">No Data Found</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className={`p-3 text-left text-sm font-medium ${
                        head !== "Message" && head !== "Make a Call" && head !== "Status" && head !== "Action"
                          ? "cursor-pointer hover:bg-gray-200"
                          : "cursor-default"
                      }`}
                      onClick={() =>
                        head !== "Status" ? handleSort(head) : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        {head}
                        {head !== "Message" && head !== "Make a Call" && head !== "Status" && head !== "Action" && (
                          <ChevronUpDownIcon className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((teacher) => (
                    <tr key={teacher._id}>
                      <td className="text-sm py-2 pl-2 w-52 break-words">
                        <strong>{teacher.name}</strong>
                        <br />
                        {teacher.ip}
                      </td>
                      <td className="text-sm py-2 pl-2 w-40 break-words">
                        {teacher.email}
                      </td>
                      <td className="text-sm py-2 pl-2 w-64 break-words">
                        {teacher.phone}
                      </td>
                      <td className="text-sm py-2 pl-2 w-40 break-words">
                        {teacher.date}
                      </td>
                      <td className="text-sm py-2 pl-2 w-40 break-words">
                        {teacher.nationality}
                      </td>
                      <td className="text-sm py-2 pl-2 w-64">
                        {teacher.message}
                      </td>
                      <td className="text-sm py-2 pl-2 w-32 break-words">
                        {teacher.callTime}
                      </td>
                      <td className="p-3 text-center w-32 ">
                        <span onClick={() => handleToggleLiveStatus(teacher._id)}>
                          {teacher.isLive ? (
                            <p className="text-white bg-purple-600 rounded-xl text-center px-2 py-1">
                              Replied
                            </p>
                          ) : (
                            <p className="text-white bg-orange-500 rounded-xl text-center px-2 py-1">
                              Pending
                            </p>
                          )}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          className="flex items-center text-black hover:text-blue-500"
                          onClick={() => handleOpenModal(teacher)}
                        >
                          <IoEyeOutline size={25} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No teachers available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ModalOpenTeacher
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveTeacher}
        data={data}
        isEditing={!!editingId}
      />
    </>
  );
}

export default DashboardInfo;
