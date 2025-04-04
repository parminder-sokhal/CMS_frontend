import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { ToggleLeft, ToggleRight } from "lucide-react";

const TABLE_HEAD = [
  "Name/Email",
  "Phone",
  "Experience",
  "Area",
  "Board/Subject",
  "Charge Rate",
  "Status",
];

const sortKeyMap = {
  Name: "name",
  Email: "email",
  Phone: "phone",
  Status: "isLive",
  Area: "area.name",
};

function DashboardInfo() {
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  useEffect(() => {
    const dummyData = [
      {
        _id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        aboutUs: "Experienced teacher in Math",
        area: { name: "New York" },
        board: "CBSE",
        subject: [{ name: "Math" }],
        chargeRate: "$30/hr",
        isLive: true,
      },
      {
        _id: "2",
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        aboutUs: "Passionate Science teacher",
        area: { name: "Los Angeles" },
        board: "ICSE",
        subject: [{ name: "Science" }],
        chargeRate: "$35/hr",
        isLive: false,
      },
      {
        _id: "3",
        name: "David Johnson",
        email: "davidjohnson@example.com",
        phone: "555-123-4567",
        aboutUs: "Physics enthusiast with 10 years of experience",
        area: { name: "Chicago" },
        board: "CBSE",
        subject: [{ name: "Physics" }],
        chargeRate: "$40/hr",
        isLive: true,
      },
      {
        _id: "4",
        name: "Emma Brown",
        email: "emmabrown@example.com",
        phone: "321-987-6540",
        aboutUs: "Expert in History and Geography",
        area: { name: "Houston" },
        board: "State Board",
        subject: [{ name: "History" }, { name: "Geography" }],
        chargeRate: "$28/hr",
        isLive: false,
      },
      {
        _id: "5",
        name: "Olivia Wilson",
        email: "oliviawilson@example.com",
        phone: "444-555-6666",
        aboutUs: "Specializes in English Literature",
        area: { name: "San Francisco" },
        board: "IB",
        subject: [{ name: "English Literature" }],
        chargeRate: "$45/hr",
        isLive: true,
      },
      {
        _id: "6",
        name: "James Taylor",
        email: "jamestaylor@example.com",
        phone: "333-777-8888",
        aboutUs: "Math and Science tutor with 5 years experience",
        area: { name: "Miami" },
        board: "IGCSE",
        subject: [{ name: "Math" }, { name: "Chemistry" }],
        chargeRate: "$38/hr",
        isLive: true,
      },
    ];

    setTableRows(dummyData);
  }, []);

  const filteredRows = tableRows.filter((teacher) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      teacher.name?.toLowerCase().includes(searchTermLower) ||
      String(teacher.phone)?.toLowerCase().includes(searchTermLower) ||
      teacher.area?.name?.toLowerCase().includes(searchTermLower)
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
    if (column === "Name/Email") {
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

  return (
    <div className="w-full p-6 border border-gray-400 mb-25">
      <div className="flex flex-col sm:flex-row justify-start gap-4 mb-4 ">
        <div className="relative mt-4 sm:mt-0 w-full sm:w-72">
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
            <CiCalendar size={30}  className=" items-center text-gray-600" />
            <p className="text-gray-500">Filter</p>
          </div>
        </div>
        <div className="flex flex-col border border-gray-400 rounded-md h-10 w-30 ">
          <div className="flex items-center py-1 justify-around ">
            <p className="text-gray-500">All Status</p>
            <IoIosArrowDown size={25}  className=" items-center text-gray-400 mt-1" />
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
                      head !== "Subject" &&
                      head !== "Charge Rate" &&
                      head !== "Status" &&
                      head !== "Experience" &&
                      head !== "Area"
                        ? "cursor-pointer hover:bg-gray-200"
                        : "cursor-default"
                    }`}
                    onClick={() =>
                      head !== "Status" ? handleSort(head) : undefined
                    }
                  >
                    <div className="flex items-center gap-1">
                      {head}
                      {head !== "Subject" &&
                        head !== "Charge Rate" &&
                        head !== "Status" &&
                        head !== "Experience" &&
                        head !== "Area" && (
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
                      {teacher.email}
                    </td>
                    <td className="text-sm py-2 pl-2 w-40 break-words">
                      {teacher.phone}
                    </td>
                    <td className="text-sm py-2 pl-2 w-64 break-words">
                      {teacher.aboutUs || "No about us available"}
                    </td>
                    <td className="text-sm py-2 pl-2 w-40 break-words">
                      {teacher.area?.name || "Unknown"}
                    </td>
                    <td className="text-sm py-2 pl-2 w-40 break-words">
                      {teacher.board || "Null"}
                    </td>
                    <td className="text-sm py-2 pl-2 w-64">
                      {teacher.subject?.length > 0
                        ? teacher.subject.map((sub) => sub.name).join(", ")
                        : "No subjects"}
                    </td>
                    <td className="text-sm py-2 pl-2 w-32 break-words">
                      {teacher.chargeRate}
                    </td>

                    <td className="p-3 text-center  ">
                      <span onClick={() => handleToggleLiveStatus(teacher._id)}>
                        {teacher.isLive ? (
                          <p  className="text-white bg-purple-600 rounded-xl  text-center px-2 py-1 ">Replied</p >
                        ) : (
                          <p  className="text-white bg-orange-500 rounded-xl  text-center px-2 py-1 ">Pending</p >
                        )}
                      </span>
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
  );
}

export default DashboardInfo;
