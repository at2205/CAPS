"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function Channel() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* 🔵 HEADER */}
      <CapsCard
        title="Management Report"
        description="Channel Transaction Report"
      />

 
          <PageCard>

            <div className="max-w-2xl mx-auto space-y-6">

              {/* Report Type */}
              <FormRow label="Report Type">
                <select
                  className="capsSelect w-80"
                  required
                >
                  <option value="">Select</option>
                  <option value="Live Recharge Transaction">
                    Live Recharge Transaction
                  </option>
                </select>
              </FormRow>

              {/* From Date */}
              <FormRow label="From Date">
                <input
                  type="date"
                  className="capsInput w-80"
                  required
                />
              </FormRow>

              {/* To Date */}
              <FormRow label="To Date">
                <input
                  type="date"
                  className="capsInput w-80"
                  required
                />
              </FormRow>

              {/* Error + Loader */}
              <div className="text-center">
                {error && (
                  <p className="text-red-600 text-sm">
                    {error}
                  </p>
                )}

                {loading && (
                  <div className="flex justify-center mt-2">
                    <div className="animate-spin h-6 w-6 border-4 border-[#4c95b3] border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-2">
                <button className="capsButton min-w-[120px]">
                  View
                </button>

                <button className="capsButton min-w-[120px]">
                  Download
                </button>
              </div>

            </div>

          </PageCard>
        </div>
      
  );
}

/* PERFECT ALIGN ROW */
const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium whitespace-nowrap">
      {label}
    </div>
    <div className="text-center">:</div>
    <div>{children}</div>
  </div>
);

export default Channel;
