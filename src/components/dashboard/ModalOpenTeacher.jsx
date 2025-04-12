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
            <h2 className="text-2xl font-bold mt-10">Personal Details</h2>
            <div className="border border-gray-300 px-4 py-4 rounded-lg">
              <div className="flex items-center justify-between ">
                {/* Circle Picture and Name */}
                <div className="flex items-center justify-around gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex"></div>
                  <div className=" flex flex-col">
                    <p className="font-semibold">{name}</p>
                    <p className="font-semibold">{ip}</p>
                  </div>
                </div>
                <span className="text-gray-600 cursor-pointer flex border border-gray-300 rounded-md px-2 py-1 items-center gap-2">
                  <FaPhoneAlt size={15} />
                  <p>call</p>
                </span>
              </div>
              <div className="flex flex-col gap-1 pt-2 px-2">
                {/* Phone Number */}
                <div className="flex items-center gap-2 ">
                  <FaPhoneAlt className=" text-gray-500" />
                  <div className="flex gap-2">
                    <p className="text-sm">Phone No:</p>
                    <p className="text-sm text-gray-500">{phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ">
                <FaEnvelope className=" text-gray-500" />
                <div className="flex gap-2">
                    <p className="text-sm">Email:</p>
                    <p className="text-sm text-gray-500">{email}</p>
                  </div>
                </div>
               
                
                {/* Additional Information */}
                <div className="flex items-center gap-2">
                  <FaRegUser className=" text-gray-500" />
                  <div className="flex gap-2">
                    <p className="text-sm">Date:</p>
                    <p className="text-sm text-gray-500">{data?.date}</p>
                  </div>
                 
                </div>
                <div className="flex items-center gap-2">
                  <FaRegUser className=" text-gray-500" />
                  <div className="flex gap-2">
                    <p className="text-sm">Nationality:</p>
                    <p className="text-sm text-gray-500">{data?.nationality}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegUser className=" text-gray-500" />
                  <div className="flex gap-2">
                    <p className="text-sm">Status:</p>
                    <p className="text-sm text-gray-500">{status || "not found"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Div - Message */}
            <div className="flex flex-col border border-gray-300 px-4 py-2 rounded-lg">
              <h2 className="text-lg ">Message</h2>
              <p className="px-2 py-2">{message}</p>
              <button className="hover:bg-gray-300 w-1/4  text-black border border-gray-300 px-2 py-1 rounded-md">
                Reply
              </button>
            </div>

            {/* Third Div - Subject */}
            <div className=" border border-gray-300 px-4 py-1 rounded-lg">
              <div className="py-1">
              <h2 className="text-lg ">Subject</h2>
              <input
                type="text"
                placeholder="Subject"
                className="w-full  px-2 py-1 border border-gray-300 rounded-lg"
              />
                </div>
                <div>

              <h3 className="text-lg py-1">Message</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
                </div>
                <div className="py-2">

              <button className="hover:bg-gray-300  text-black border border-gray-300 px-2 py-1 w-1/4 rounded-md">
                Send
              </button>
                </div>
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
