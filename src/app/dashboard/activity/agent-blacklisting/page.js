"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const AgentBlacklisting = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateAndSubmit = async () => {
    if (!file) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select the file.", timer: 1500, showConfirmButton: false });
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();
    if (!["xls", "xlsx", "csv"].includes(ext)) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select excel file only (.xls, .xlsx, .csv)" });
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const fd = new FormData();
      fd.append("file", file);
      fd.append("ipAddress", "");
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.agentBlacklistUpload, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setMessage(data.message || "File uploaded successfully");
        setResult({ successCount: data.successCount || 0, failedCount: data.failedCount || 0 });
        if (data.downloadUrl) {
          Swal.fire({ icon: "success", title: "Success", text: `Processed. Success: ${data.successCount}, Failed: ${data.failedCount}` });
        }
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Upload failed" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong during upload" });
    } finally {
      setLoading(false);
    }
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
