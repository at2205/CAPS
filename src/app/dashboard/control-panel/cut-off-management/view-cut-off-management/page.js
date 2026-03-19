"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function ViewCutOffManagement() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({ fullId: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setSuccess("");
    setError("");

    if (!formValues.fullId) {
      setError("Please enter full id");
      setLoading(false);
      return;
    }

    // 🔴 API CALL HERE
    setTimeout(() => {
      setSuccess("Submit successfully.");
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setFormValues({ fullId: "" });
    setSuccess("");
    setError("");
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="View Cut-Off Management"
        description="View cut-off configuration by Full ID"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* FULL ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
              <label className="text-right font-medium">
                Enter Full Id
              </label>
              <div className="text-center">:</div>

              <input
                type="text"
                name="fullId"
                value={formValues.fullId}
                placeholder="Enter full id"
                onChange={handleInputChange}
                className="capsInput"
              />
            </div>

            {/* STATUS MESSAGE */}
            <div className="text-center text-sm mb-2">
              {success && (
                <p className="text-green-600">{success}</p>
              )}
              {error && (
                <p className="text-red-500">{error}</p>
              )}
              {loading && (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                onClick={handleClear}
                className="capsButtonSecondary min-w-[140px]"
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default ViewCutOffManagement;
