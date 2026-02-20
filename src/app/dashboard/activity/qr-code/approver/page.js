"use client";

import React, { useState } from "react";

const Approver = () => {
  const [agents] = useState([
    {
      agentId: "AG001",
      agentName: "Rahul Sharma",
      status: "Active",
      createdBy: "USER100",
    },
    {
      agentId: "AG002",
      agentName: "Amit Verma",
      status: "Inactive",
      createdBy: "USER200",
    },
  ]);

  const currentUser = "USER300";
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState({});
  const [statuses, setStatuses] = useState({});

  const handleSubmit = (agent, index) => {
    if (!remarks[index]) {
      setMessage("Please enter remark.");
      return;
    }
    if (!statuses[index] || statuses[index] === "Pending") {
      setMessage("Please select status.");
      return;
    }

    setMessage(`Agent ${agent.agentId} updated successfully`);
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const selectStyle = inputStyle;

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Checker
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6">

          {/* MESSAGE */}
          {message && (
            <div className="mb-4 text-center text-sm font-semibold text-green-700 bg-green-100 border border-green-200 rounded-lg py-2">
              {message}
            </div>
          )}

          {/* ===== TABLE ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm text-center">

              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="border p-2">Sr. No.</th>
                  <th className="border p-2">Agent Name</th>
                  <th className="border p-2">Agent ID</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Remark</th>
                  <th className="border p-2">Action Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {agents.map((agent, index) => (
                  <tr key={agent.agentId} className="hover:bg-gray-50">

                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{agent.agentName}</td>
                    <td className="border p-2 font-medium">
                      {agent.agentId}
                    </td>

                    {/* STATUS BADGE */}
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          agent.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </td>

                    {/* REMARK */}
                    <td className="border p-2">
                      <input
                        type="text"
                        value={remarks[index] || ""}
                        onChange={(e) =>
                          setRemarks({
                            ...remarks,
                            [index]: e.target.value,
                          })
                        }
                        className={inputStyle}
                      />
                    </td>

                    {/* ACTION STATUS */}
                    <td className="border p-2">
                      <select
                        value={statuses[index] || "Pending"}
                        onChange={(e) =>
                          setStatuses({
                            ...statuses,
                            [index]: e.target.value,
                          })
                        }
                        className={selectStyle}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Success">Success</option>
                        <option value="Reject">Reject</option>
                        <option value="Discard">Discard</option>
                      </select>
                    </td>

                    {/* BUTTON */}
                    <td className="border p-2">
                      <button
                        onClick={() => handleSubmit(agent, index)}
                        className="px-4 py-2 text-white rounded-xl shadow text-sm
                                   bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                                   hover:opacity-90 transition"
                      >
                        Submit
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Approver;
