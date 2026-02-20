"use client";

import React, { useState } from "react";
import axios from "axios";

const Maker = () => {
  const [agentId, setAgentId] = useState("");
  const [message, setMessage] = useState("");
  const [agentDetails, setAgentDetails] = useState([]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agentId.trim()) {
      setMessage("Please enter User Id.");
      return;
    }

    if (/[^a-zA-Z0-9]/.test(agentId)) {
      setMessage("Please enter valid Agent ID.");
      return;
    }

    try {
      const res = await axios.post("/api/qrcode/upload", { agentId });
      setMessage("Submitted successfully");
      setAgentDetails(res.data || []);
    } catch {
      setMessage("Technical error");
    }
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    setAgentId("");
    setMessage("");
    setAgentDetails([]);
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const badgeStyle = (status) => {
    if (status === "Approved")
      return "bg-green-100 text-green-700";
    if (status === "Rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Maker
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6">

          {/* MESSAGE */}
          {message && (
            <div className="mb-4 text-center text-sm font-semibold
                            text-blue-700 bg-blue-100 border border-blue-200
                            rounded-lg py-2">
              {message}
            </div>
          )}

          {/* ===== FORM ===== */}
          <form onSubmit={handleSubmit} className="mb-6">

            <div className="flex justify-center mb-4">
              <div className="w-[400px]">
                <label className="block font-semibold mb-1">
                  Agent Id
                </label>

                <input
                  type="text"
                  value={agentId}
                  maxLength={12}
                  onChange={(e) => setAgentId(e.target.value)}
                  className={inputStyle}
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="px-5 py-2 text-white rounded-xl shadow text-sm
                           bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                           hover:opacity-90 transition"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2 rounded-xl shadow border border-gray-400
                           hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* ===== TABLE ===== */}
          {agentDetails.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-center">

                <thead className="bg-gray-100 font-semibold">
                  <tr>
                    <th className="border p-2">Agent Name</th>
                    <th className="border p-2">Agent ID</th>
                    <th className="border p-2">Agent ID Status</th>
                    <th className="border p-2">QR Status</th>
                    <th className="border p-2">Remark</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {agentDetails.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">
                        {item.agentName}
                      </td>
                      <td className="border p-2 font-medium">
                        {item.agentId}
                      </td>
                      <td className="border p-2">
                        {item.status}
                      </td>

                      {/* QR STATUS BADGE */}
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeStyle(
                            item.qrStatus
                          )}`}
                        >
                          {item.qrStatus}
                        </span>
                      </td>

                      <td className="border p-2">
                        {item.remark || "NA"}
                      </td>

                      <td className="border p-2">
                        {item.qrStatus === "Pending" ? "-" : "NA"}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Maker;
