"use client";

import React, { useState } from "react";

const MATMActivationRequest = () => {
  const [channel, setChannel] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ channel, fromDate, toDate });
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          MATM Activation Request
        </div>

        {/* BODY */}
        <div className="px-10 py-6 flex justify-center">
          <div className="w-[520px]">

            <form onSubmit={handleSubmit}>

              {/* CHANNEL */}
              <div className="mb-5 flex items-start">
                <label className="w-[200px] text-right font-semibold pt-2 mr-4">
                  Channel :
                </label>

                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                >
                  <option value="">Select Channel</option>
                  <option value="AG">Retailer</option>
                  <option value="DS">Distributor</option>
                </select>
              </div>

              {/* FROM DATE */}
              <div className="mb-5 flex items-start">
                <label className="w-[200px] text-right font-semibold pt-2 mr-4">
                  From Date :
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* TO DATE */}
              <div className="mb-6 flex items-start">
                <label className="w-[200px] text-right font-semibold pt-2 mr-4">
                  To Date :
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* BUTTONS */}
              <div className="text-center mt-6 flex justify-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Download
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MATMActivationRequest;
