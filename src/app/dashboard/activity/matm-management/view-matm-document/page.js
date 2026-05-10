"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const ViewMATMDocuments = () => {
  const [channel, setChannel] = useState("");
  const [agentId, setAgentId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [matmList, setMatmList] = useState([]);
  const [action, setAction] = useState("Approve");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [referenceNo, setReferenceNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channel) { Swal.fire({ icon: "warning", title: "Validation", text: "Please select channel", timer: 1500, showConfirmButton: false }); return; }
    if (!agentId) { Swal.fire({ icon: "warning", title: "Validation", text: "Please enter agent id", timer: 1500, showConfirmButton: false }); return; }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), userType: channel, agentId: agentId.trim() };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.getMatmDocuments,
        new URLSearchParams({ adminUserFormBean: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setMatmList(data.matmList || []);
        setReferenceNo(data.referenceNo || "");
        setShowResult(true);
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No records found" });
        setShowResult(false);
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const handleActionSubmit = async () => {
    if ((action === "Reject" || action === "Pending At Bank") && !remark) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Remark is required", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), agentId: agentId.trim(), action: action.toLowerCase(), remark, referenceNo };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.updateMatmDocumentStatus,
        new URLSearchParams({ adminUserFormBean: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Status updated successfully" });
        handleSubmit({ preventDefault: () => {} });
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Update failed" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="View MATM Document"
        description="Search and verify MATM uploaded documents"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* SEARCH FORM */}
            <form onSubmit={handleSubmit}>

              {/* CHANNEL */}
              <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
                <label className="text-right font-medium">
                  Channel
                </label>
                <div className="text-center">:</div>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="capsInput"
                >
                  <option value="">Select Channel</option>
                  <option value="AG">Retailer</option>
                  <option value="DS">Distributor</option>
                </select>
              </div>

              {/* AGENT ID */}
              <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
                <label className="text-right font-medium">
                  Enter Full Agent ID
                </label>
                <div className="text-center">:</div>
                <input
                  type="text"
                  placeholder="Enter Full Agent ID"
                  value={agentId}
                  onChange={(e) =>
                    setAgentId(e.target.value.toUpperCase())
                  }
                  className="capsInput"
                />
              </div>

              {/* BUTTON */}
              <div className="text-center mb-4">
                <button type="submit" className="capsButton min-w-[120px]">
                  Submit
                </button>
              </div>

            </form>

            {/* RESULT */}
            {showResult && (
              <>
                <div className="capsColor text-center py-2 font-semibold rounded-md mb-6">
                  MATM Details
                </div>

                {/* INFO CARDS */}
                <div className="grid grid-cols-2 gap-4 mb-6">

                  <div className="border border-[#226b88] rounded-lg p-4 text-center shadow-sm">
                    <div className="text-sm text-gray-500 font-medium">
                      Agent ID
                    </div>
                    <div className="font-bold text-lg">
                      {agentId}
                    </div>
                  </div>

                  <div className="border border-[#226b88] rounded-lg p-4 text-center shadow-sm">
                    <div className="text-sm text-gray-500 font-medium">
                      Channel
                    </div>
                    <div className="font-bold text-lg">
                      {channel === "AG"
                        ? "Retailer"
                        : "Distributor"}
                    </div>
                  </div>

                </div>

                {/* IMAGE */}
                <div className="flex justify-center mb-6">
                  <img
                    src="https://via.placeholder.com/500x280?text=MATM+Device+Image"
                    alt="MATM"
                    className="rounded-lg border border-[#226b88] shadow-sm"
                  />
                </div>

                {/* ACTION BOX */}
                <div className="flex flex-wrap gap-4 justify-center items-center">

                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="capsInput w-[200px]"
                  >
                    <option value="Approve">Approve</option>
                    <option value="Pending At Bank">
                      Pending At Bank
                    </option>
                    <option value="Reject">Reject</option>
                  </select>

                  {(action === "Reject" ||
                    action === "Pending At Bank") && (
                    <input
                      type="text"
                      placeholder="Enter remark (max 50 chars)"
                      maxLength={50}
                      value={remark}
                      onChange={(e) =>
                        setRemark(e.target.value)
                      }
                      className="capsInput w-[260px]"
                    />
                  )}

                  <button
                    onClick={handleActionSubmit}
                    className="capsButton min-w-[120px]"
                  >
                    Submit
                  </button>

                </div>
              </>
            )}

          </div>
        </div>

      </PageCard>
    </div>
  );
};

export default ViewMATMDocuments;
