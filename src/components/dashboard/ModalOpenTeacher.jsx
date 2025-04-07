import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaCommentDots,
  FaRegUser,
  FaRegCircle,
  FaPhone,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  createTeacher,
  updateTeacherById,
  getAllTeachers,
} from "../../redux/actions/teacherAction.js";

const ModalOpenTeacher = ({
  open,
  handleClose,
  handleSave,
  isEditing,
  data,
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (open && data) {
      setName(data?.name || "");
      setIp(data?.ip || "");
      setPhone(data?.phone || "");
      setEmail(data?.email || "");
      setMessage(data?.message || "");
      setStatus(data?.status || "");
    }
  }, [open, data]);

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submit logic
  };

  return (
    <>
      {open && (
        <div
          className="modal-overlay fixed inset-0 backdrop-blur flex justify-end items-center overflow-auto" // Allow background scrolling
          onClick={handleClickOutside}
        >
          <div className="modal-content px-10 border border-gray-300 bg-white w-1/3 overflow-auto h-full flex flex-col gap-4 ">
            {/* First Div - Personal Details */}
            <h2 className="text-2xl py-2">Personal Details</h2>
            <div className="border border-gray-300 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                {/* Circle Picture and Name */}
                <div className="flex items-center justify-around">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <FaRegCircle size={10} />
                  </div>
                  <div className="ml-2 flex flex-col">
                    <p className="font-semibold">{name}</p>
                    <p className="font-semibold">{ip}</p>
                  </div>
                </div>
                <span className="text-gray-600 cursor-pointer flex border border-gray-300 rounded-md px-2 py-1 items-center gap-2">
                  <FaPhoneAlt size={18} />
                  Call
                </span>
              </div>

              {/* Phone Number */}
              <div className="flex items-center mb-1">
                <FaPhoneAlt className="mr-2 text-gray-500" />
                <p className="text-sm">{phone}</p>
              </div>
              {/* Email */}
              <div className="flex items-center mb-1">
                <FaEnvelope className="mr-2 text-gray-500" />
                <p className="text-sm">{email}</p>
              </div>
              {/* Additional Information */}
              <div className="flex items-center mb-1">
                <FaRegUser className="mr-2 text-gray-500" />
                <p className="text-sm">Date: {data?.date}</p>
              </div>
              <div className="flex items-center mb-1">
                <FaRegUser className="mr-2 text-gray-500" />
                <p className="text-sm">Nationality: {data?.nationality}</p>
              </div>
              <div className="flex items-center mb-1">
                <FaRegUser className="mr-2 text-gray-500" />
                <p className="text-sm">Status: {status}</p>
              </div>
            </div>

            {/* Second Div - Message */}
            <div className="flex flex-col border border-gray-300 px-2 py-2 rounded-lg">
              <h2 className="text-lg ">Message</h2>
                <p className="px-2 py-2">{message}</p>
              <button className="bg-gray-400 w-1/4  text-white px-2 py-1 rounded-md">
                Reply
              </button>
            </div>

            {/* Third Div - Subject */}
            <div className=" border border-gray-300 py-2 px-2 rounded-lg">
              <h2 className="text-lg py-1">Subject</h2>
              <input
                type="text"
                placeholder="Subject"
                className="w-full  px-2 py-1 border border-gray-300 rounded-lg"
              />
              <h3 className="text-lg py-1">Message</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button className="bg-gray-400 text-white px-2 py-1 w-1/4 rounded-md">
                Send
              </button>
            </div>

            {/* Make a Call Button */}
            <div className="text-center">
              <button
                className="bg-black justify-start flex text-white px-6 py-3 rounded-md"
                onClick={() => alert("Calling...")}
              >
                Make a Call
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOpenTeacher;
