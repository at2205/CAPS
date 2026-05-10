"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function CopyPricing() {
  const [fullId, setFullId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const checkFullId = () => {
    setError("");
    setSuccess("");

    if (!fullId) {
      setError("Please enter Full Id");
      return;
    }

    console.log("Entered Full ID =>", fullId);
    setSuccess("Pricing details loaded successfully");
  };

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      
      {/* HEADER */}
      <CapsCard
        title="Copy Pricing"
        description="Copy pricing configuration using Full ID"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* FULL ID */}
            <FieldRow label="Enter Full Id">
              <input
                type="text"
                placeholder="Please enter Full Id"
                value={fullId}
                onChange={(e) => setFullId(e.target.value)}
                className="capsInput"
              />
            </FieldRow>

            {/* STATUS */}
            <div className="text-center text-sm min-h-[24px]">
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-4">
              <button
                onClick={checkFullId}
                className="capsButton min-w-[140px]"
              >
                Go
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default CopyPricing;
