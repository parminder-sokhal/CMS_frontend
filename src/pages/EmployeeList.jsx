// Add these to imports (top of file)
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/actions/authAction";

const TABLE_HEAD = [
  "Name/Email",
  "Phone",
  "Date of Birth",
  "Role",
  "Company",
  "Status",
];

function EmployeeList() {
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users?.length > 0) {
      setTableRows(
        users.map((user) => ({
          id: user.uuId,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          dob: new Date(user.dob).toLocaleDateString(),
          role: user.role?.name || "N/A",
          company: user.companyData?.name || "N/A",
          status: user.accountStatus === "Active" ? "Active" : "UnActive",
        }))
      );
    }
  }, [users]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key, direction });
  };

  const sortedRows = [...tableRows].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    return sortConfig.direction === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const filteredRows = sortedRows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleToggleStatus = (id) => {
    setTableRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "Active" ? "UnActive" : "Active" }
          : row
      )
    );
  };

  return (
    <div className="w-full p-5">
      {/* Search Bar */}
      <div className="relative mb-4 w-full md:w-1/4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : currentRows.length === 0 ? (
          <div className="text-center p-4">No Employees Found</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-xs text-gray-700">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="p-2 text-left font-semibold whitespace-nowrap cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                      handleSort(head.toLowerCase().replace(/ /g, "").replace("/", ""))
                    }
                  >
                    <div className="flex items-center gap-1">
                      {head}
                      <ChevronUpDownIcon className="h-4 w-4" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-1 w-52">
                    <strong>{row.name}</strong>
                    <br />
                    <span className="text-xs text-gray-500">{row.email}</span>
                  </td>
                  <td className="p-1 whitespace-nowrap">{row.phone}</td>
                  <td className="p-1 whitespace-nowrap">{row.dob}</td>
                  <td className="p-1 whitespace-nowrap">{row.role}</td>
                  <td className="p-1 whitespace-nowrap">{row.company}</td>
                  <td className="p-1 whitespace-nowrap">
                    <span
                      onClick={() => handleToggleStatus(row.id)}
                      className={`w-20 text-white px-5 py-1 justify-center flex rounded-xl text-xs font-medium cursor-pointer  ${
                        row.status === "Active" ? "bg-purple-600" : "bg-orange-500"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
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
  );
}

export default EmployeeList;
