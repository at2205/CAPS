"use client";

import React, { useState } from "react";

const ActivityAssignment = () => {
  const [portalUserId, setPortalUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitForm = () => {
    if (!portalUserId.trim()) {
      alert("Please enter portal user id.");
      return;
    }

    setLoading(true);
    setMessage("");

    // frontend-only (API later)
    setTimeout(() => {
      setLoading(false);
      setMessage(`Search submitted for User ID: ${portalUserId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 min-h-[260px] rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Activity Assignment Search
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {message && (
            <div className="text-center mb-4 text-[#2c3e50] font-medium">
              {message}
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-[520px]">

              {/* USER ID */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  User ID :
                </label>

                <input
                  type="text"
                  value={portalUserId}
                  onChange={(e) => setPortalUserId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  onClick={submitForm}
                  disabled={loading}
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAssignment;
