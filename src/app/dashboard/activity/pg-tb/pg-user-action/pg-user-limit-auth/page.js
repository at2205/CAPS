"use client";

import React, { useState } from "react";

const PGUserLimitAuth = () => {
  const [data] = useState({
    date: "2025-01-10",
    userId: "PG12345",
    limits: [
      { id: 1, channel: "UPI", amt: "5000", daily: "50000" },
      { id: 2, channel: "CARD", amt: "10000", daily: "100000" },
    ],
  });

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          PG User Limit Auth
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-8">

          {/* ===== INFO SECTION ===== */}
          <div className="flex justify-center mb-6">
            <div className="w-[400px] text-sm">
              <div className="flex mb-2">
                <span className="w-28 text-right font-semibold">Date</span>
                <span className="px-2">:</span>
                <span>{data.date}</span>
              </div>

              <div className="flex">
                <span className="w-28 text-right font-semibold">User Id</span>
                <span className="px-2">:</span>
                <span>{data.userId}</span>
              </div>
            </div>
          </div>

          {/* ===== LIMIT TABLE ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm text-center">

              <thead className="bg-[#eef7fb] font-semibold">
                <tr>
                  <th className="border p-2">Channel Name</th>
                  <th className="border p-2">Amount / Transaction</th>
                  <th className="border p-2">Daily Limit</th>
                  <th className="border p-2">Authorize</th>
                </tr>
              </thead>

              <tbody>
                {data.limits.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border p-2">{row.channel}</td>
                    <td className="border p-2">{row.amt}</td>
                    <td className="border p-2">{row.daily}</td>
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="flex justify-center gap-6 mt-8">

            <button
              className="px-6 py-2 text-white rounded-2xl shadow
                         bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                         hover:opacity-90 transition"
            >
              Submit
            </button>

            <button
              className="px-6 py-2 rounded-2xl shadow bg-gray-200
                         font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PGUserLimitAuth;
