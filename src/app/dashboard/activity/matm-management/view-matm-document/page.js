"use client";

import React, { useState } from "react";

const ViewMATMDocuments = () => {
  const [channel, setChannel] = useState("");
  const [agentId, setAgentId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [action, setAction] = useState("Approve");
  const [remark, setRemark] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!channel) {
      alert("Please select channel");
      return;
    }
    if (!agentId) {
      alert("Please enter agent id");
      return;
    }

    setShowResult(true);
  };

  const handleActionSubmit = () => {
    if (
      (action === "Reject" || action === "Pending At Bank") &&
      !remark
    ) {
      alert("Remark is required");
      return;
    }

    alert("Action submitted (API later)");
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          View MATM Document
        </div>

        {/* BODY */}
        <div className="px-10 py-6 flex justify-center">
          <div className="w-[620px]">

            {/* SEARCH FORM */}
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

              {/* AGENT ID */}
              <div className="mb-6 flex items-start">
                <label className="w-[200px] text-right font-semibold pt-2 mr-4">
                  Enter Full Agent ID :
                </label>

                <input
                  type="text"
                  placeholder="Enter Full Agent ID"
                  value={agentId}
                  onChange={(e) =>
                    setAgentId(e.target.value.toUpperCase())
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 
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
            </form>

            {/* RESULT */}
            {showResult && (
              <>
                <div className="font-bold text-center mt-10 mb-5 text-lg">
                  MATM Details
                </div>

                {/* INFO CARDS */}
                <div className="grid grid-cols-2 gap-4 mb-6">

                  <div className="border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-sm text-gray-500 font-medium">
                      Agent ID
                    </div>
                    <div className="font-bold text-lg">
                      {agentId}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 text-center shadow-sm">
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
                    className="rounded-lg border border-gray-300 shadow-sm"
                  />
                </div>

                {/* ACTION BOX */}
                <div className="flex flex-wrap gap-4 justify-center items-center">

                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 
                               focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
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
                      className="border border-gray-300 rounded-md px-3 py-2 
                                 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                    />
                  )}

                  <button
                    onClick={handleActionSubmit}
                    className="px-5 py-2 text-white rounded-2xl shadow
                               bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                               hover:opacity-90 transition"
                  >
                    Submit
                  </button>

                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMATMDocuments;
