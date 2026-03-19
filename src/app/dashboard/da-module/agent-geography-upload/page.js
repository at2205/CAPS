"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function AgentGeographyUpdate() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* ================= FILE UPLOAD ================= */

  const handleSubmit = async () => {
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "File Required",
        text: "Please Select The File.",
      });
      return;
    }

    const ext = file.name.split(".").pop().toLowerCase();

    if (!["xls", "xlsx"].includes(ext)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please Upload Only .xls or .xlsx File.",
      });
      return;
    }

    setLoading(true);
    setMessage("");
    setShowResult(false);

    try {
      const formData = new FormData();

      formData.append("file1", file);

      const adminPayload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType"),
        portalId: localStorage.getItem("portalId"),
      };

      formData.append("adminUserFormBean", JSON.stringify(adminPayload));

      const response = await axiosInstance.post(
        endpoints.daModuleEndpoints.geographyUpdate,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (data?.status === "1") {
        setMessage(data?.message || "Upload failed.");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: data?.message || "File Uploaded Successfully.",
      });

      setResult(data);
      setShowResult(true);
    } catch (error) {
      console.error("Upload error:", error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error?.response?.data?.message ||
          "File upload failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= DOWNLOAD REPORT ================= */

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(
        endpoints.daModuleEndpoints.downloadGeoReport,
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "Geography_Update_Report.xlsx";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);

      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download report.",
      });
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Agent Geography Update"
        description="Upload agent geography update file"
      />

      <PageCard>
        {message && (
          <p
            className={`text-center font-semibold mb-4 text-sm ${
              showResult ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">
            {/* ================= FILE INPUT ================= */}

            <div className="grid grid-cols-[200px_10px_1fr] items-start">
              <label className="text-sm font-semibold text-right pt-2">
                Please Select The File
              </label>

              <div className="text-center pt-2">:</div>

              <div>
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  disabled={loading}
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];

                    setFile(selectedFile);
                    setShowResult(false);
                    setMessage("");
                    setResult(null);
                  }}
                  className="capsInput"
                />

                <p className="text-xs text-gray-500 mt-1">
                  .xls / .xlsx format only
                </p>

                {file && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>

            {/* ================= DOWNLOAD FORMAT ================= */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <div />
              <div />

              <a
                href="/AgentGeographyUpdate.xlsx"
                download
                className="text-sm font-semibold hover:underline"
              >
                Click To Download Format
              </a>
            </div>

            {/* ================= SUBMIT BUTTON ================= */}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton px-10"
              >
                {loading ? "Uploading..." : "SUBMIT"}
              </button>
            </div>

            {/* ================= RESULT TABLE ================= */}

            {showResult && result && (
              <div className="pt-4">
                <table className="w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2">Success Count</th>
                      <th className="border px-3 py-2">Failed Count</th>
                      <th className="border px-3 py-2">Report</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border px-3 py-2 font-bold text-green-600">
                        {result.successCount ?? 0}
                      </td>

                      <td className="border px-3 py-2 font-bold text-red-600">
                        {result.failedCount ?? 0}
                      </td>

                      <td className="border px-3 py-2">
                        <button
                          onClick={handleDownloadReport}
                          className="text-blue-600 font-semibold underline"
                        >
                          Download Report
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default AgentGeographyUpdate;
