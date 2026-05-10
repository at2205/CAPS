"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

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
      Swal.fire({ icon: "warning", title: "Validation", text: "Please Enter Full User ID", timer: 1500, showConfirmButton: false });
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const payload = { fromDate, toDate, searchBy, userId: userId.trim() };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.search,
        new URLSearchParams({ adminUserFormBean: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

      if (data.status === "0" && data.trackingList) {
        setTrackingList(data.trackingList);
        if (data.trackingList.length === 0) setMessage("No record found");
      } else {
        setTrackingList([]);
        setMessage(data.message || "No record found");
      }
    } catch {
      setMessage("Technical error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="User Tracking Details"
        description="Track agent login activity and device/location info"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-center text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
            {message}
          </div>
        )}

        {/* ================= FILTER ================= */}
        <div className="flex justify-center mb-6">
          <div>

            {/* FROM DATE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
              <label className="text-right font-medium">
                From Date
              </label>
              <div className="text-center">:</div>
              <input
                type="date"
                className="capsInput"
                value={fromDate}
                max={today}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            {/* TO DATE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
              <label className="text-right font-medium">
                To Date
              </label>
              <div className="text-center">:</div>
              <input
                type="date"
                className="capsInput"
                value={toDate}
                max={today}
                min={fromDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            {/* SELECT */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
              <label className="text-right font-medium">
                Select
              </label>
              <div className="text-center">:</div>
              <select
                className="capsInput"
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
              <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
                <label className="text-right font-medium">
                  User ID
                </label>
                <div className="text-center">:</div>
                <input
                  type="text"
                  className="capsInput"
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
            <div className="text-center mt-4">
              <button
                className="capsButton min-w-[120px]"
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
            <table className="min-w-full border border-[#226b88] text-sm text-center">

              <thead>
                <tr className="capsColor">
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

      </PageCard>
    </div>
  );
};

export default UserTrackingDetails;
