"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const MobileNoticeAlert = () => {

  const [title, setTitle] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [sentTo, setSentTo] = useState("");
  const [agentFile, setAgentFile] = useState(null);
  const [dateTime, setDateTime] = useState("");

  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showAgentFile, setShowAgentFile] = useState(false);

  const [tableData, setTableData] = useState([]);

  /* ================= HANDLERS ================= */

  const handleNotificationType = (val) => {
    setNotificationType(val);
    setShowText(val === "1" || val === "3");
    setShowImage(val === "2" || val === "3");
  };

  const handleSentTo = (val) => {
    setSentTo(val);
    setShowAgentFile(val === "Selected" || val === "selected-ds");
  };

  const validateImage = (file) => {
    if (file.size > 1048576) {
      alert("Image must be less than 1MB");
      return false;
    }
    if (!["image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only JPG/JPEG allowed");
      return false;
    }
    return true;
  };

  const validateExcel = (file) => {
    const ext = file.name.split(".").pop();
    if (!["xls", "xlsx"].includes(ext)) {
      alert("Only .xls/.xlsx allowed");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return alert("Enter Notification Title");
    if (!notificationType) return alert("Select Notification Type");
    if (!sentTo) return alert("Select Sent To");
    if (!dateTime) return alert("Select Date Time");

    if (showText && !message) return alert("Enter Message");
    if (showImage && !image) return alert("Upload Image");
    if (showAgentFile && !agentFile) return alert("Upload Agent File");

    console.log("Form Submitted");
  };

  return (
    
    <div className="p-6  min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Mobile Notice – Alert"
        description="Send scheduled mobile notifications"
      />

      {/* FORM CARD */}
      <PageCard>
 <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>

          <FormRow label="Notification Title">
            <input
              className="capsInput w-80"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormRow>

          <FormRow label="Select Notification Type">
            <select
              className="capsSelect w-80"
              onChange={(e) =>
                handleNotificationType(e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="2">Image Notification</option>
              <option value="1">Text Notification</option>
              <option value="3">
                Link Notification with Image
              </option>
            </select>
          </FormRow>

          {showText && (
            <FormRow label="Notification Message / Link">
              <textarea
                rows={3}
                className="capsInput w-80"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormRow>
          )}

          {showImage && (
            <FormRow label="Image (jpg < 1MB)">
              <input
                type="file"
                accept="image/jpeg,image/jpg"
                className="capsInput w-full"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (validateImage(file)) setImage(file);
                }}
              />
            </FormRow>
          )}

          <FormRow label="Sent To">
            <select
              className="capsSelect w-80"
              onChange={(e) => handleSentTo(e.target.value)}
            >
              <option value="">Select</option>
              <option value="ALL">ALL Agents</option>
              <option value="Selected">Selected Agents</option>
              <option value="ALL-DS">All Distributors</option>
              <option value="selected-ds">
                Selected Distributors
              </option>
            </select>
          </FormRow>

          {showAgentFile && (
            <FormRow label="Full AgentId (.xls/.xlsx)">
              <input
                type="file"
                className="capsInput w-80"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (validateExcel(file)) setAgentFile(file);
                }}
              />
            </FormRow>
          )}

          <FormRow label="Notification Date/Time">
            <input
              type="datetime-local"
              className="capsInput w-80"
              value={dateTime}
              onChange={(e) =>
                setDateTime(e.target.value)
              }
            />
          </FormRow>

          <div className="text-center mt-8">
            <button className="capsButton min-w-[120px]">
              Submit
            </button>
          </div>

        </form>
</div>
      </PageCard>

      {/* TABLE CARD */}
      <PageCard>
        <h3 className="capsText font-semibold mb-4 text-center">
          Scheduled Notification
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#226b88] text-sm">
            <thead>
              <tr className="bg-[#a74312] text-white">
                <th className="p-2 border">Sr</th>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Action</th>
                <th className="p-2 border">Download</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{row.id}</td>
                  <td className="p-2 border">{row.title}</td>
                  <td className="p-2 border">{row.type}</td>
                  <td className="p-2 border">{row.user}</td>
                  <td className="p-2 border">{row.date}</td>
                  <td className="p-2 border">
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                      Disable
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageCard>

    </div>
  );
};

/* ===== FIXED ALIGNMENT ROW ===== */

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[250px_20px_1fr] items-center gap-4 mb-6">
    <label className="text-right font-medium">
      {label}
    </label>
    <div className="text-center">:</div>
    <div className="max-w-2xl">
      {children}
    </div>
  </div>
);

export default MobileNoticeAlert;
