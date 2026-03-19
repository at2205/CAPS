"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const AgentBlacklisting = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateAndSubmit = () => {
    if (!file) {
      alert("Please select the file.");
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();
    if (!["xls", "xlsx", "csv"].includes(ext)) {
      alert("Please select excel file only (.xls, .xlsx, .csv)");
      return;
    }

    setLoading(true);

    // 🔴 API CALL PLACEHOLDER
    setTimeout(() => {
      setLoading(false);
      setMessage("File uploaded successfully");
      setResult({
        successCount: 10,
        failedCount: 2,
      });
    }, 1500);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Agent Blacklisting Update"
        description="Upload excel file to update blacklisted agents"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-center py-2 rounded-md bg-green-100 text-green-700 font-medium">
            {message}
          </div>
        )}

        <div className="flex justify-center">
          <div>

            {/* FILE INPUT */}
            <div className="grid grid-cols-[220px_20px_260px] items-start gap-4 mb-2">

              <label className="text-right font-medium pt-2">
                Please Select The File
              </label>

              <div className="text-center pt-2">:</div>

              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileChange}
                className="capsInput"
              />
            </div>

            <div className="text-center text-xs text-gray-500 mb-4">
              .xls / .xlsx / .csv only
            </div>

            {/* DOWNLOAD FORMAT */}
            <div className="text-center mb-5">
              <a
                href="/pages/Reports/CCModule/ProfileUpdate/AgentBlacklistingUpdates.xlsx"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#226b88] hover:underline"
              >
                Click To Download Format
              </a>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                onClick={validateAndSubmit}
                disabled={loading}
                className="capsButton min-w-[120px]"
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </div>

          </div>
        </div>

        {/* RESULT TABLE */}
        {result && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-[#226b88] text-center text-sm">

              <thead>
                <tr className="capsColor">
                  <th className="border p-2">Success Count</th>
                  <th className="border p-2">Failed Count</th>
                  <th className="border p-2">Report</th>
                </tr>
              </thead>

              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-2 text-green-600 font-semibold">
                    {result.successCount}
                  </td>

                  <td className="border p-2 text-red-600 font-semibold">
                    {result.failedCount}
                  </td>

                  <td className="border p-2">
                    <a
                      href="/download/agent-blacklist-report"
                      className="text-sm font-semibold text-[#226b88] hover:underline"
                    >
                      Download Report
                    </a>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        )}

      </PageCard>
    </div>
  );
};

export default AgentBlacklisting;
