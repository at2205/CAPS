"use client";
import React, { useEffect, useState } from "react";

const AssignPlan = () => {
  const [agentId, setAgentId] = useState("");
  const [plan, setPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");

  /* ===== ON LOAD ===== */
  useEffect(() => {
    getAllPlans();
  }, []);

  const getAllPlans = () => {
    setPlans([
      { value: "", label: "-- Select Plan --" },
      { value: "Basic", label: "Basic" },
      { value: "Silver", label: "Silver" },
      { value: "Gold", label: "Gold" },
    ]);
  };

  const submitForm = () => {
    if (!agentId) {
      alert("Please enter Agent ID.");
      return;
    }

    if (!plan) {
      alert("Please select Plan.");
      return;
    }

    console.log({ agentId, plan });

    setStatusMsg("Plan assigned successfully.");
    setAgentId("");
    setPlan("");
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Assign Plan
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-10">
          <div className="flex justify-center">
            <div className="w-[520px]">

              {/* AGENT ID */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Agent ID
                </label>
                <input
                  type="text"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* PLAN */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Assign Plan
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                >
                  {plans.map((p, i) => (
                    <option key={i} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUTTON */}
              <div className="text-center mt-6">
                <button
                  onClick={submitForm}
                  className="px-6 py-2 text-white rounded-2xl shadow 
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>

              {/* STATUS MESSAGE */}
              {statusMsg && (
                <div className="text-center mt-4 font-semibold text-teal-700">
                  {statusMsg}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignPlan;
