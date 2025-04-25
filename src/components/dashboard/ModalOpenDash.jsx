import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaRegUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { replyToChat } from "../../redux/actions/chatAction.js";

const ModalOpenDash = ({ open, handleClose, data }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [status, setStatus] = useState("");

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

  const handleSendReply = () => {
    const payload = {
      request: replyMessage,
      createdBy: 1,
    };

    dispatch(replyToChat(ip, payload));
    setReplyMessage("");
  };

  return (
    <>
      {open && (
        <div
          className="modal-overlay fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end items-start overflow-hidden"
          onClick={handleClickOutside}
        >
          <div className="modal-content bg-white sm:w-[90%] md:w-[70%] lg:w-[30%] h-full overflow-y-auto border-l border-gray-300 px-4 py-4 flex flex-col gap-3 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold mt-2 mb-1">Personal Details</h2>

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
                  <span className="text-gray-700">Nationality: {data?.nationality}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <FaRegUser className="text-gray-500" />
                  <span className="text-gray-700">Status: {status || "Not found"}</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 px-3 py-2 rounded-md">
              <h2 className="text-base font-semibold mb-1">Message</h2>
              <p className="text-sm text-gray-700 mb-2 line-clamp-4">
                {data?.message}
              </p>
            </div>

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
                  onClick={handleSendReply}
                >
                  Send
                </button>
              </div>
            </div>

            <div className="mt-auto">
              <button
                className="bg-black text-white w-full py-2 rounded-md text-sm"
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

export default ModalOpenDash;
