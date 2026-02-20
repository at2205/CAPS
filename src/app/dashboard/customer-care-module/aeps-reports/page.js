"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const AepsReports = () => {
  const [selectType, setSelectType] = useState("all");
  const [agentId, setAgentId] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const validateForm = () => {
    const err = {};

    if (selectType === "-1") {
      if (!agentId.trim()) {
        err.agentId = "Agent ID is required";
      } else if (!agentId.startsWith("AG")) {
        err.agentId = "Agent ID must start with AG";
      } else if (agentId.length < 5) {
        err.agentId = "Agent ID must be at least 5 characters";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setApiMessage("Downloading Excel...");

      const body =
        selectType === "-1"
          ? `allAgent=-1&agentId=${encodeURIComponent(agentId)}`
          : "allAgent=all";

      const res = await fetch(
        "http://localhost:8281/CustomerModule/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        }
      );

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const excelBlob = new Blob([blob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(excelBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `AEPS_${selectType === "-1" ? agentId : "ALL"}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setApiMessage("Excel downloaded successfully ✅");
    } catch (error) {
      console.error(error);
      setApiMessage("Download failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      {/* HEADER CARD */}
      <CapsCard
        title="AEPS Reports"
        description="Download AEPS Excel reports (All or ID-Wise)"
      />

      {/* FORM CARD */}
      <PageCard>

        {/* STATUS MESSAGE */}
        {apiMessage && (
          <div className="text-center mb-4 text-sm font-medium text-blue-700 bg-blue-100 py-2 rounded">
            {apiMessage}
          </div>
        )}

        <div className="flex justify-center">
          <div className="grid gap-4 w-full max-w-xl">

            {/* SELECT TYPE */}
            <div className="grid grid-cols-[180px_20px_1fr] items-center gap-3">
              <label className="text-right font-medium">
                Select
              </label>
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

            {/* AGENT ID FIELD */}
            {selectType === "-1" && (
              <div className="grid grid-cols-[180px_20px_1fr] items-start gap-3">
                <label className="text-right font-medium">
                  Agent ID
                </label>
                <div className="text-center">:</div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Agent ID (AGxxxx)"
                    value={agentId}
                    onChange={(e) =>
                      setAgentId(e.target.value.toUpperCase())
                    }
                    className={`w-full ${
                      errors.agentId
                        ? "capsInputError"
                        : "capsInput"
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

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[220px] flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Downloading...
                  </>
                ) : (
                  "Submit & Download"
                )}
              </button>
            </div>

          </div>
        </div>

      </PageCard>
    </div>
  );
};

export default AepsReports;
