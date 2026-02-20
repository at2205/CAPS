"use client";

import React, { useState } from "react";

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
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Agent Blacklisting Update
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {/* MESSAGE */}
          {message && (
            <div className="mb-4 text-center py-2 rounded-md bg-green-100 text-green-700 font-medium">
              {message}
            </div>
          )}

          {/* FILE INPUT */}
          <div className="mb-5 flex items-start">
            <label className="w-1/3 text-right font-semibold pt-2 pr-4">
              Please Select The File :
            </label>

            <div className="w-2/3">
              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 
                           file:mr-3 file:px-3 file:py-1 file:border-0 
                           file:rounded-md file:bg-[#4c95b3] file:text-white
                           hover:file:bg-[#3d89a6]"
              />
              <p className="text-xs text-gray-500 mt-1">
                .xls / .xlsx / .csv only
              </p>
            </div>
          </div>

          {/* DOWNLOAD FORMAT */}
          <div className="mb-6 flex">
            <div className="w-1/3"></div>
            <div className="w-2/3">
              <a
                href="/pages/Reports/CCModule/ProfileUpdate/AgentBlacklistingUpdates.xlsx"
                target="_blank"
                rel="noreferrer"
                className="text-[#3d89a6] hover:underline"
              >
                Click To Download Format
              </a>
            </div>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-4">
            <button
              onClick={validateAndSubmit}
              disabled={loading}
              className="px-6 py-2 text-white rounded-2xl shadow 
                         bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                         hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>

          {/* RESULT TABLE */}
          {result && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border border-gray-300 text-center text-sm">
                <thead className="bg-gray-100">
                  <tr>
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
                        className="text-[#3d89a6] hover:underline"
                      >
                        Download Report
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AgentBlacklisting;
