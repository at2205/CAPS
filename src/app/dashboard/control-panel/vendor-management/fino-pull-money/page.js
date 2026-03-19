"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function FinoPullMoney() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formValues?.amountToPull) {
      setError("Please enter amount");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    // 🔴 API CALL HERE
    setTimeout(() => {
      setLoading(false);
      setSuccess("Amount pull request submitted successfully");
    }, 1000);
  };

  const handleClear = () => {
    setFormValues({});
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
      <CapsCard
        title="Fino Pull Money"
        description="Submit pull money request"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* AVAILABLE BALANCE */}
            <FieldRow label="Available Balance">
              <span className="font-semibold text-sm">
                ₹ 1000
              </span>
            </FieldRow>

            {/* AMOUNT */}
            <FieldRow label="Enter Amount To Pull">
              <input
                type="number"
                name="amountToPull"
                value={formValues?.amountToPull || ""}
                onChange={handleInputChange}
                className="capsInput"
                placeholder="Enter amount"
              />
            </FieldRow>

            {/* STATUS */}
            <div className="text-center text-sm mb-2">
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {loading && <p className="text-gray-500">Loading...</p>}
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

export default FinoPullMoney;
