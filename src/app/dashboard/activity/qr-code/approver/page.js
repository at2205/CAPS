"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const Approver = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState({});
  const [statuses, setStatuses] = useState({});

  const fetchCheckerData = async () => {
    try {
      setLoading(true);
      const response = await urlencodedInstance.get(endpoints.activityEndpoints.checker);
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setAgents(data.agentDetails || []);
      }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCheckerData(); }, []);

  const handleSubmit = async (agent, index) => {
    if (!remarks[index]) {
      setMessage("Please enter remark.");
      return;
    }
    if (!statuses[index] || statuses[index] === "Pending") {
      setMessage("Please select status.");
      return;
    }
    try {
      const payload = { agentId: agent.agentId || agent.userId, qrStatus: statuses[index], remark: remarks[index] };
      const params = new URLSearchParams();
      params.append("agentId", payload.agentId);
      params.append("qrStatus", payload.qrStatus);
      params.append("remark", payload.remark);
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.updateQrStatus, params);
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: "Status updated", timer: 1200, showConfirmButton: false });
        fetchCheckerData();
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Update failed" });
      }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Checker"
        description="Approve or reject agent actions"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-center text-sm font-semibold
                          bg-green-100 text-green-700 rounded-md py-2">
            {message}
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#226b88] text-sm text-center">

            <thead>
              <tr className="capsColor">
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
                <tr key={agent.agentId}>

                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{agent.agentName}</td>
                  <td className="border p-2 font-medium">
                    {agent.agentId}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
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
                      className="capsInput"
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
                      className="capsSelect"
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
                      className="capsButton px-4 py-2 text-sm"
                    >
                      Submit
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </PageCard>
    </div>
  );
};

export default Approver;
