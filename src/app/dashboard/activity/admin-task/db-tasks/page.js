"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DBTasks = () => {
  const [dbTasks, setDbTasks] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!dbTasks) {
      alert("Please select DB Task");
      return;
    }

    console.log("Selected Task:", dbTasks);

    // ✅ Next.js Navigation
    if (dbTasks === "BALANCE_INFO") {
      router.push("/db-task/balances");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 min-h-[260px] rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          DB Tasks
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <div className="flex justify-center">
            <div className="w-[520px]">

              {/* SELECT TASK */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Select :
                </label>

                <select
                  value={dbTasks}
                  onChange={(e) => setDbTasks(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                >
                  <option value="">--select--</option>
                  <option value="BALANCE_INFO">Balance Info</option>
                </select>
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBTasks;
