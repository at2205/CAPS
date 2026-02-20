"use client";
import React, { useState } from "react";

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

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Retail Pricing PG / Settlement
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleSubmit}>

            {/* CLIENT ID ROW */}
            <div className="flex items-center justify-center mb-4">
              <label className="w-[180px] text-right text-sm font-semibold">
                Client ID :
              </label>

              <div className="w-[260px] ml-3">
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button
                type="button"
                className="ml-3 px-3 py-1 text-sm text-white rounded-md bg-[#4fa2c2] hover:opacity-90 shadow"
              >
                Go
              </button>
            </div>

            {/* STATUS */}
            <div className="text-center min-h-[24px]">
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              {loading && (
                <div className="flex justify-center">
                  <div className="h-4 w-4 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default RetailPricingPGSettlement;
