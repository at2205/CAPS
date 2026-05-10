"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function RetailPricingPGSettlement() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [clientId, setClientId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientId) {
      setError("Please enter Client ID");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      setLoading(false);
      setSuccess("Client details fetched successfully");
    }, 1000);
  };

  const handleClear = () => {
    setClientId("");
    setSuccess("");
    setError("");
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
        title="Retail Pricing PG / Settlement"
        description="Fetch and manage retail pricing settlement details"
      />

      {/* MAIN CARD */}
      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* CLIENT ID */}
            <form onSubmit={handleSubmit}>
              <FieldRow label="Client ID">
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="capsInput"
                  placeholder="Enter Client ID"
                />
              </FieldRow>

              {/* GO BUTTON (inline aligned) */}
              <div className="flex justify-center mb-2">
                <button
                  type="button"
                  className="capsButtonSecondary min-w-[100px]"
                >
                  Go
                </button>
              </div>

              {/* STATUS */}
              <div className="text-center text-sm mb-2">
                {success && <p className="text-green-600">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                {loading && <p className="text-gray-500">Loading...</p>}
              </div>

              {/* BUTTONS */}
              <div className="text-center mt-4 flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="capsButton min-w-[140px]"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="capsButtonSecondary min-w-[140px]"
                >
                  Clear
                </button>
              </div>
            </form>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default RetailPricingPGSettlement;
