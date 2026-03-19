"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const AepsReports = () => {
  const [selectType, setSelectType] = useState("all");
  const [agentId, setAgentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const err = {};

    if (selectType === "-1") {
      if (!agentId.trim()) {
        err.agentId = "Agent ID is required";
        Swal.fire("Validation Error", "Agent ID is required", "warning");
      } else if (!agentId.startsWith("AG")) {
        err.agentId = "Agent ID must start with AG";
        Swal.fire("Validation Error", "Agent ID must start with AG", "warning");
      } else if (agentId.length < 5) {
        err.agentId = "Agent ID must be at least 5 characters";
        Swal.fire(
          "Validation Error",
          "Agent ID must be at least 5 characters",
          "warning",
        );
      }
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  /* ================= FILE DOWNLOAD FUNCTION ================= */

  const downloadFile = async (downloadUrl, fileName) => {
    try {
      const fileResponse = await axiosInstance.get(downloadUrl, {
        responseType: "blob",
      });

      const blob = new Blob([fileResponse.data]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "AEPS_Report.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw error;
    }
  };

  /* ================= API CALL ================= */

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      Swal.fire({
        title: "Generating AEPS Report...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const agent = selectType === "-1" ? agentId : "all";

      const response = await axiosInstance.get(
        endpoints.customerCareEndpoints.downloadAepsReport,
        {
          params: { agentId: agent },
        },
      );

      if (response.data.status !== "success") {
        throw new Error(response.data.message);
      }

      const downloadUrl = response.data.downloadUrl;
      const fileName = response.data.fileName;

      await downloadFile(downloadUrl, fileName);

      /* CLOSE LOADING ALERT */
      Swal.close();

      /* SUCCESS ALERT */
      Swal.fire({
        icon: "success",
        title: "Download Completed",
        text: "Excel downloaded successfully",
        confirmButtonColor: "#226b88",
      });
    } catch (error) {
      console.error(error);

      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Failed to download report",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      {/* HEADER */}
      <CapsCard
        title="AEPS Reports"
        description="Download AEPS Excel Reports (All / Agent ID Wise)"
      />

      {/* FORM CARD */}
      <PageCard>
        <div className="flex justify-center">
          <div className="grid gap-4 w-full max-w-xl">
            {/* SELECT TYPE */}
            <div className="grid grid-cols-[180px_20px_1fr] items-center gap-3">
              <label className="text-right font-medium">Select</label>

              <div className="text-center">:</div>

              <select
                className="capsSelect"
                value={selectType}
                onChange={(e) => {
                  setSelectType(e.target.value);
                  setAgentId("");
                  setErrors({});
                }}
              >
                <option value="all">All</option>
                <option value="-1">ID-Wise</option>
              </select>
            </div>

            {/* AGENT ID */}
            {selectType === "-1" && (
              <div className="grid grid-cols-[180px_20px_1fr] items-start gap-3">
                <label className="text-right font-medium">Agent ID</label>

                <div className="text-center">:</div>

                <div>
                  <input
                    type="text"
                    placeholder="Enter Agent ID (AGXXXX)"
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value.toUpperCase())}
                    className={`w-full ${
                      errors.agentId ? "capsInputError" : "capsInput"
                    }`}
                  />

                  {errors.agentId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.agentId}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* BUTTON */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[220px]"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default AepsReports;
