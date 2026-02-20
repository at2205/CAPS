"use client";

import React, { useState } from "react";

const AgentGeographyUpdate = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select the file.");
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();
    if (!["xls", "xlsx"].includes(ext)) {
      setMessage("Please upload only .xls or .xlsx file.");
      return;
    }

    setMessage("File uploaded successfully.");
    setShowResult(true);
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const buttonStyle =
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] text-white " +
    "px-6 py-2 rounded-xl shadow-md text-sm font-medium hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[900px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Agent Geography Update
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6">

          {/* MESSAGE */}
          {message && (
            <div className="mb-4 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
              {message}
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-[520px]">

              <form onSubmit={handleSubmit}>

                {/* FILE INPUT */}
                <div className="mb-4 flex items-start">
                  <label className="w-[220px] text-right pr-4 pt-2 font-semibold text-sm">
                    Please Select The File :
                  </label>

                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".xls,.xlsx"
                      className={inputStyle}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      .xls / .xlsx format only
                    </p>
                  </div>
                </div>

                {/* DOWNLOAD FORMAT */}
                <div className="mb-4 flex items-center">
                  <div className="w-[220px]" />

                  <a
                    href="/GeographyUpdateSample.xlsx"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#3d89a6] font-medium hover:underline"
                  >
                    Click To Download Format
                  </a>
                </div>

                {/* BUTTON */}
                <div className="text-center mt-2">
                  <button type="submit" className={buttonStyle}>
                    Submit
                  </button>
                </div>
              </form>

              {/* RESULT TABLE */}
              {showResult && (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">Success Count</th>
                        <th className="border px-3 py-2">Failed Count</th>
                        <th className="border px-3 py-2">Report</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border px-3 py-2 font-bold text-green-600">
                          0
                        </td>
                        <td className="border px-3 py-2 font-bold text-red-600">
                          0
                        </td>
                        <td className="border px-3 py-2">
                          <a
                            href="#"
                            className="text-indigo-600 hover:underline"
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
      </div>
    </div>
  );
};

export default AgentGeographyUpdate;
