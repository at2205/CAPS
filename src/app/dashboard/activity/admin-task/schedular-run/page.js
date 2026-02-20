"use client";

import React, { useState } from "react";

const SchedulerRun = () => {
  const [schedulerType, setSchedulerType] = useState("select");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!schedulerType || schedulerType === "select") {
      alert("Please select Scheduler Name");
      return;
    }

    // frontend only
    alert(`Scheduler Run : ${schedulerType}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 min-h-[260px] rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Scheduler Run
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <div className="flex justify-center">
            <form className="w-[520px]" onSubmit={handleSubmit}>

              {/* SELECT */}
              <div className="mb-6 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Scheduler Name :
                </label>

                <select
                  value={schedulerType}
                  onChange={(e) => setSchedulerType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                >
                  <option value="select">Select</option>
                  <option value="webSchedular">Web Scheduler</option>
                  <option value="ApiSchedular">API Scheduler</option>
                  <option value="MappSchedular">MAPP Scheduler</option>
                </select>
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerRun;
