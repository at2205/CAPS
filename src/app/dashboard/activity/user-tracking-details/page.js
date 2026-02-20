"use client";

import React, { useState } from "react";
import axios from "axios";

const UserTrackingDetails = () => {
  const today = new Date().toISOString().slice(0, 10);

  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [searchBy, setSearchBy] = useState("all");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingList, setTrackingList] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (searchBy === "id" && !userId.trim()) {
      alert("Please Enter Full User ID");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/user-tracking", {
        fromDate,
        toDate,
        searchBy,
        userId,
      });

      setTrackingList(res.data || []);

      if (!res.data || res.data.length === 0) {
        setMessage("No record found");
      } else {
        setMessage("");
      }
    } catch {
      setMessage("Technical error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const buttonStyle =
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] text-white " +
    "px-6 py-2 rounded-xl shadow-md text-sm font-medium hover:opacity-90 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Activity &gt; User Tracking Details
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6">

          {/* MESSAGE */}
          {message && (
            <div className="mb-4 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
              {message}
            </div>
          )}

          {/* ================= FILTER ================= */}
          <div className="flex justify-center mb-6">
            <div className="w-[400px]">

              {/* FROM DATE */}
              <div className="mb-3 flex items-start">
                <label className="w-[200px] text-right pr-4 pt-2 font-semibold text-sm">
                  From Date :
                </label>
                <input
                  type="date"
                  className={inputStyle}
                  value={fromDate}
                  max={today}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              {/* TO DATE */}
              <div className="mb-3 flex items-start">
                <label className="w-[200px] text-right pr-4 pt-2 font-semibold text-sm">
                  To Date :
                </label>
                <input
                  type="date"
                  className={inputStyle}
                  value={toDate}
                  max={today}
                  min={fromDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              {/* SELECT */}
              <div className="mb-3 flex items-start">
                <label className="w-[200px] text-right pr-4 pt-2 font-semibold text-sm">
                  Select :
                </label>
                <select
                  className={inputStyle}
                  value={searchBy}
                  onChange={(e) => {
                    setSearchBy(e.target.value);
                    setUserId("");
                  }}
                >
                  <option value="all">All</option>
                  <option value="id">ID-Wise</option>
                </select>
              </div>

              {/* USER ID */}
              {searchBy === "id" && (
                <div className="mb-3 flex items-start">
                  <label className="w-[200px] text-right pr-4 pt-2 font-semibold text-sm">
                    User ID :
                  </label>
                  <input
                    type="text"
                    className={inputStyle}
                    value={userId}
                    maxLength={25}
                    placeholder="Full User Id"
                    onChange={(e) =>
                      setUserId(e.target.value.toUpperCase())
                    }
                  />
                </div>
              )}

              {/* BUTTON */}
              <div className="text-center mt-5">
                <button
                  className={buttonStyle}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>

          {/* ================= TABLE ================= */}
          {trackingList.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="w-full border border-gray-300 text-sm text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">S.N.</th>
                    <th className="border px-3 py-2">Agent Id</th>
                    <th className="border px-3 py-2">Agent Name</th>
                    <th className="border px-3 py-2">Latitude / Longitude</th>
                    <th className="border px-3 py-2">Device Info</th>
                    <th className="border px-3 py-2">Channel</th>
                    <th className="border px-3 py-2">Address</th>
                    <th className="border px-3 py-2">Created Date</th>
                    <th className="border px-3 py-2">Image</th>
                  </tr>
                </thead>

                <tbody>
                  {trackingList.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{item.agentId}</td>
                      <td className="border px-3 py-2">{item.agentName}</td>

                      <td className="border px-3 py-2">
                        <a
                          href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Open location
                        </a>
                      </td>

                      <td className="border px-3 py-2">{item.deviceInfo}</td>
                      <td className="border px-3 py-2">{item.channel}</td>
                      <td className="border px-3 py-2">{item.address}</td>
                      <td className="border px-3 py-2">{item.createdDate}</td>

                      <td className="border px-3 py-2">
                        <a
                          href={item.imagePath}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          View Image
                        </a>
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

export default UserTrackingDetails;
