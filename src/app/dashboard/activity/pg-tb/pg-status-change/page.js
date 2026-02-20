"use client";

import React, { useState } from "react";

const PGStatusChange = () => {
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transactionId.trim()) {
      alert("Please enter Transaction Id");
      return;
    }

    console.log("Transaction Id:", transactionId);
    alert("Status change submitted (frontend only)");
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          PG Status Change
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="flex justify-center">
            <div className="w-[600px]">

              {/* INPUT ROW */}
              <div className="flex items-center mb-6">
                <label className="font-semibold w-[150px] text-right mr-4">
                  Transaction Id
                </label>

                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  maxLength={40}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PGStatusChange;
