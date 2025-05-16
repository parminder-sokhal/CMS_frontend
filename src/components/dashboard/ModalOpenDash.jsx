import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaRegUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { replyToChat } from "../../redux/actions/chatAction.js";
import {
  updateContactCallDate,
  updateContactActivity,
} from "../../redux/actions/contactAction.js";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";

const ModalOpenDash = ({ open, handleClose, data, refresh }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [status, setStatus] = useState("");
  const [showCallBox, setShowCallBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const timeOptions = [
    { value: "09:00 AM", label: "09:00 AM" },
    { value: "09:30 AM", label: "09:30 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "12:30 PM", label: "12:30 PM" },
    // Add more as needed
  ];

  useEffect(() => {
    if (open && data) {
      setName(data?.name || "");
      setIp(data?.ip || "");
      setPhone(data?.phone || "");
      setEmail(data?.email || "");
      setReplyMessage("");
      setStatus(data?.status || "");
    }
  }, [open, data]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;

    const payload = {
      message: replyMessage,
      createdBy: 1,
    };

    try {
      await dispatch(replyToChat(data?.chatid, payload));
      setReplyMessage("");

      if (refresh) {
        refresh(); // ✅ triggers fetchLatestContacts in parent
      }
    } catch (error) {
      console.error("Failed to send reply", error);
    }
  };

  const handleMarkAsCompleted = () => {
    if (data?._id) {
      dispatch(updateContactActivity(data._id));
      handleClose();
    }
  };

  return (
    <>
      {open && (
        <div
          className="modal-overlay fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end items-start overflow-hidden"
          onClick={handleClickOutside}
        >
          <div className="modal-content bg-white sm:w-[90%] md:w-[70%] lg:w-[30%] h-full overflow-y-auto border-l border-gray-300 px-4 py-4 flex flex-col gap-3 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold mt-2 mb-1">
                Personal Details
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-black"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            <div className="border border-gray-300 p-3 rounded-md">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex gap-3 items-center">
                  <div className="w-9 h-9 rounded-full bg-gray-300"></div>
                  <div className="text-sm">
                    <p className="font-medium">{name}</p>
                    <p className="text-gray-500">{ip}</p>
                  </div>
                </div>
                <button className="text-gray-600 text-sm border border-gray-300 rounded-md px-3 py-1 flex items-center gap-2 hover:bg-gray-100">
                  <FaPhoneAlt size={13} />
                  Call
                </button>
              </div>

              <div className="flex flex-col gap-2 pt-3 text-sm px-1">
                <div className="flex gap-2 items-center">
                  <FaPhoneAlt className="text-gray-500" />
                  <span className="text-gray-700">Phone: {phone}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaEnvelope className="text-gray-500" />
                  <span className="text-gray-700">Email: {email}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaRegUser className="text-gray-500" />
                  <span className="text-gray-700">Date: {data?.date}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaRegUser className="text-gray-500" />
                  <span className="text-gray-700">
                    Nationality: {data?.nationality}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaRegUser className="text-gray-500" />
                  <span className="text-gray-700">
                    Status: {status || "Not found"}
                  </span>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="border border-gray-300 px-3 py-2 rounded-md">
              <h2 className="text-base font-semibold mb-1">Message</h2>
              <p className="text-sm text-gray-700 mb-2 line-clamp-4">
                {data?.message}
              </p>
            </div>

            {data?.replied?.length > 0 && (
              <div className="border border-gray-300 px-3 py-2 rounded-md">
                <h2 className="text-base font-semibold mb-1">Replied</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  {data.replied.map((line, idx) => (
                    <p key={idx}>• {line}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Reply Input Section */}
            <div className="border border-gray-300 px-3 py-2 rounded-md space-y-2">
              <div>
                <h3 className="text-base font-semibold mb-1">Reply</h3>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write your message"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  rows={4}
                />
              </div>
              <div className="text-right">
                <button
                  className="text-sm border border-gray-300 px-4 py-1 rounded hover:bg-gray-100"
                  disabled={!replyMessage.trim()}
                  onClick={handleSendReply}
                >
                  Send
                </button>
              </div>
            </div>

            <div className="relative w-full mt-auto">
              {/* Overlay when showCallBox is true */}
              {showCallBox && (
                <div
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                  onClick={() => setShowCallBox(false)}
                />
              )}
              <div className="flex justify-between items-center gap-2 mt-3">
                <button
                  className="bg-green-700 text-white w-1/2 py-2 rounded-md text-sm relative z-50"
                  onClick={handleMarkAsCompleted}
                >
                  Mark as completed
                </button>

                <button
                  className="bg-black text-white w-1/2 py-2 rounded-md text-sm relative z-50"
                  onClick={() => setShowCallBox(true)}
                >
                  Make a Call
                </button>
              </div>
              {showCallBox && (
                <div className="absolute z-50 bottom-full mb-2 right-0 sm:left-0 sm:right-auto w-full sm:w-[280px] bg-white border border-gray-300 rounded-md shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold">
                      Schedule Your Appointment
                    </h3>
                    <button
                      onClick={() => setShowCallBox(false)}
                      className="text-gray-500 hover:text-black"
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-xs mb-1 text-gray-600">
                        Select Date
                      </label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    {/* Time Slot - Currently disabled */}
                    {/* 
      <div>
        <label className="block text-xs mb-1 text-gray-600">Select Time Slot</label>
        <Select
          options={timeOptions}
          value={selectedTime}
          onChange={setSelectedTime}
          placeholder="Choose a time"
        />
      </div>
      */}

                    <div className="text-right">
                      <button
                        disabled={!selectedDate}
                        className={`text-sm px-4 py-1 rounded ${
                          selectedDate
                            ? "bg-black text-white hover:opacity-90"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (selectedDate && data?._id) {
                            dispatch(
                              updateContactCallDate(data._id, {
                                date: selectedDate,
                              })
                            );
                          }
                          setShowCallBox(false);
                          handleClose();
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOpenDash;
