"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function CaptureGeoLocation() {

  const [file, setFile] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    successCount: 0,
    failedCount: 0
  });

  // =========================
  // Upload File
  // =========================

  const handleSubmit = async () => {

    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "File Required",
        text: "Please Select File.",
        timer: 1800,
        showConfirmButton: false
      });
      return;
    }

    if (!file.name.toLowerCase().endsWith(".xlsx")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please Upload File Having Extension .xlsx Only.",
      });
      return;
    }

    setLoading(true);
    setShowResult(false);

    try {

      const formData = new FormData();

      formData.append("file1", file);

      const adminPayload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType")
      };

      formData.append(
        "adminUserFormBean",
        JSON.stringify(adminPayload)
      );

      const response = await axiosInstance.post(
        endpoints.daModuleEndpoints.captureGeoLocation,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (data?.status === "1") {

        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: data?.message || "Upload failed",
          timer: 1800,
          showConfirmButton: false
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data?.message || "File Uploaded Successfully"
      });

      setResult({
        successCount: data.totalSuccessCount || 0,
        failedCount: data.totalFailedCount || 0
      });

      setShowResult(true);

    } catch (error) {

      console.error("Upload Error:", error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error?.response?.data?.message ||
          "File upload failed. Please try again.",
          timer: 1800,
          showConfirmButton: false
      });

    } finally {
      setLoading(false);
    }

  };

  // =========================
  // Download Report
  // =========================

  const handleDownloadReport = async () => {

    try {

      const response = await axiosInstance.get(
        endpoints.daModuleEndpoints.downloadRetailerReport,
        {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = "AgentData_Report.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {

      console.error("Download Error:", error);

      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download report",
        timer: 1800,
        showConfirmButton: false
      });

    }

  };

  return (

    <div className="p-6 text-[#226b88]">

      <CapsCard
        title="DA Module > Capture Geo Location"
        description="Upload geo location excel file"
      />

      <PageCard>

        <div className="flex justify-center">

          <div className="w-[520px] space-y-4">

            {/* File Upload */}

            <div className="grid grid-cols-[200px_10px_1fr] items-start">

              <label className="text-sm font-semibold text-right pt-2">
                Please Select The File
              </label>

              <div className="text-center pt-2">:</div>

              <div>

                <input
                  type="file"
                  accept=".xlsx"
                  disabled={loading}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setShowResult(false);
                  }}
                  className="capsInput"
                />

                <p className="text-xs text-gray-500 mt-1">
                  .xlsx format only
                </p>

                {file && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected: {file.name}
                  </p>
                )}

              </div>

            </div>

            {/* Download Format */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">

              <div />
              <div />

              <a
                href="/CaptureGeoLocation.xlsx"
                download
                className="text-sm font-semibold hover:underline"
              >
                Click To Download Format
              </a>

            </div>

            {/* Submit Button */}

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

            {/* Result Table */}

            {showResult && (

              <div className="pt-4">

                <table className="w-full border text-sm text-center">

                  <thead className="bg-gray-100">

                    <tr>
                      <th className="border px-3 py-2">
                        Success Count
                      </th>

                      <th className="border px-3 py-2">
                        Failed Count
                      </th>

                      <th className="border px-3 py-2">
                        Report
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    <tr>

                      <td className="border px-3 py-2 font-bold text-green-600">
                        {result.successCount}
                      </td>

                      <td className="border px-3 py-2 font-bold text-red-600">
                        {result.failedCount}
                      </td>

                      <td className="border px-3 py-2">

                        <button
                          onClick={handleDownloadReport}
                          className="text-blue-600 underline"
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

export default CaptureGeoLocation;