"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const Maker = () => {
  const [agentId, setAgentId] = useState("");
  const [message, setMessage] = useState("");
  const [agentDetails, setAgentDetails] = useState([]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agentId.trim()) {
      setMessage("Please enter User Id.");
      return;
    }

    if (/[^a-zA-Z0-9]/.test(agentId)) {
      setMessage("Please enter valid Agent ID.");
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("agentId", agentId.trim());
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.uploadQrCode, params);
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setMessage("Submitted successfully");
        setAgentDetails(data.agentDetails || data.data || []);
      } else {
        setMessage(data.message || "Submission failed");
      }
    } catch {
      setMessage("Technical error");
    }
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    setAgentId("");
    setMessage("");
    setAgentDetails([]);
  };

  const badgeStyle = (status) => {
    if (status === "Approved")
      return "bg-green-100 text-green-700";
    if (status === "Rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Maker"
        description="Upload and verify QR code status"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-center text-sm font-semibold
                          bg-blue-100 text-blue-700 rounded-md py-2">
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mb-6">

          <div className="flex justify-center">
            <div>

              {/* AGENT ID */}
              <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">

                <label className="text-right font-medium">
                  Agent Id
                </label>

                <div className="text-center">:</div>

                <input
                  type="text"
                  value={agentId}
                  maxLength={12}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="capsInput"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-4 mt-2">
                <button
                  type="submit"
                  className="capsButton min-w-[100px]"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 rounded-md border border-gray-400
                             hover:bg-gray-100 transition text-sm"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </form>

        {/* TABLE */}
        {agentDetails.length > 0 && (
          <>
            <div className="capsColor text-center py-2 font-semibold rounded-md mb-3">
              Agent Details
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">

                <thead>
                  <tr className="capsColor">
                    <th className="border p-2">Agent Name</th>
                    <th className="border p-2">Agent ID</th>
                    <th className="border p-2">Agent ID Status</th>
                    <th className="border p-2">QR Status</th>
                    <th className="border p-2">Remark</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {agentDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {item.agentName}
                      </td>

                      <td className="border p-2 font-medium">
                        {item.agentId}
                      </td>

                      <td className="border p-2">
                        {item.status}
                      </td>

                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${badgeStyle(
                            item.qrStatus
                          )}`}
                        >
                          {item.qrStatus}
                        </span>
                      </td>

                      <td className="border p-2">
                        {item.remark || "NA"}
                      </td>

                      <td className="border p-2">
                        {item.qrStatus === "Pending" ? "-" : "NA"}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default Maker;
