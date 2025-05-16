import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import ModalOpenDash from "./ModalOpenDash";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestContacts } from "../../redux/actions/contactAction";

const TABLE_HEAD = [
  "Name/Ip",
  "Email",
  "Phone No.",
  "Date",
  "Nationality",
  "Message",
  "Make a Call",
  "Status",
  "Action",
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

  const dispatch = useDispatch();
  const { latestContacts, loading } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchLatestContacts());
  }, [dispatch]);

  useEffect(() => {
    if (latestContacts?.length > 0) {
      setTableRows(
        latestContacts.map((contact) => ({
          _id: contact.uuId,
          name: contact.name,
          ip: contact.uuId,
          email: contact.email,
          phone: contact.phone,
          date: new Date(contact.createdAt).toLocaleDateString(),
          nationality: contact.nationlity,
          chatid: contact.chatData?.uuId,
          message: contact.chatData?.requester || "N/A",
          replied: contact.chatData?.sender || [],
          callTime: new Date(contact.makeACall).toLocaleDateString(),
          isLive: contact.isActive,
        }))
      );
    }
  }, [latestContacts]);

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
  const handleReloadAfterReply = () => {
    dispatch(fetchLatestContacts());
    dispatch(fetchContacts());
  };

  return (
    <>
      <div className="w-full p-4 border border-gray-200 mb-25">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 mb-4">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>

          {/* Sort Button */}
          <div
            className="flex items-center gap-2 border hover:bg-gray-100 border-gray-400 rounded-md px-4 py-2 cursor-pointer"
            onClick={() => handleSort("Name/Ip")}
          >
            <CiCalendar size={24} className="text-gray-600" />
            <p className="text-gray-500 text-sm">
              {sortConfig.key === "name" && sortConfig.direction === "asc"
                ? "A - Z"
                : sortConfig.key === "name" && sortConfig.direction === "desc"
                ? "Z - A"
                : "A - Z"}
            </p>
          </div>

          {/* Status Dropdown (placeholder) */}
          <div className="flex items-center justify-between border border-gray-400 rounded-md px-3 py-2 w-full md:w-auto">
            <p className="text-gray-500 text-sm">All Status</p>
            <IoIosArrowDown className="text-gray-400 ml-2" size={20} />
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          {tableRows.length === 0 ? (
            <div className="text-center p-4">No Data Found</div>
          ) : (
            <table className="min-w-[800px] md:min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-sm">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className={`p-2 text-left font-medium whitespace-nowrap ${
                        head !== "Message" &&
                        head !== "Make a Call" &&
                        head !== "Status" &&
                        head !== "Action"
                          ? "cursor-pointer hover:bg-gray-200"
                          : "cursor-default"
                      }`}
                      onClick={() =>
                        head !== "Status" ? handleSort(head) : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        {head}
                        {head !== "Message" &&
                          head !== "Make a Call" &&
                          head !== "Status" &&
                          head !== "Action" && (
                            <ChevronUpDownIcon className="h-4 w-4" />
                          )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentRows.length > 0 ? (
                  currentRows.map((teacher) => (
                    <tr key={teacher._id} className="hover:bg-gray-50">
                      <td className="p-1 whitespace-nowrap w-52">
                        <strong>{teacher.name}</strong>
                        <br />
                        <span className="text-xs text-gray-500">
                          {teacher.ip}
                        </span>
                      </td>
                      <td className="p-1 whitespace-nowrap">{teacher.email}</td>
                      <td className="p-1 whitespace-nowrap">{teacher.phone}</td>
                      <td className="p-1 whitespace-nowrap">{teacher.date}</td>
                      <td className="p-1 whitespace-nowrap">
                        {teacher.nationality}
                      </td>
                      <td className="p-1 whitespace-normal max-w-50">
                        {teacher.message}
                      </td>
                      <td className="p-1 whitespace-nowrap max-w-50">
                        {teacher.callTime}
                      </td>

                      <td className="py-1  whitespace-nowrap">
                        <span
                          onClick={() => handleToggleLiveStatus(teacher._id)}
                          className={`w-20 text-white px-5 py-1 justify-center flex rounded-xl text-xs font-medium cursor-pointer ${
                            teacher.isLive ? "bg-purple-600" : "bg-orange-500"
                          }`}
                        >
                          {teacher.isLive ? "Replied" : "Pending"}
                        </span>
                      </td>
                      <td className="p-1  whitespace-nowrap">
                        <button
                          className="text-black hover:text-blue-500"
                          onClick={() => handleOpenModal(teacher)}
                        >
                          <IoEyeOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No teachers available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border rounded-md hover:bg-gray-200 text-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 border rounded-md hover:bg-gray-200 text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ModalOpenDash
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveTeacher}
        data={data}
        isEditing={!!editingId}
        refresh={handleReloadAfterReply} 
      />
    </>
  );
}

export default DashboardInfo;
