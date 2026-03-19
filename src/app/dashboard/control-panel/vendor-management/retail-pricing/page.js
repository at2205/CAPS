"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function RetailPricing() {
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
    if (
      !formValues?.clientId ||
      !formValues?.mdsId ||
      !formValues?.category ||
      !formValues?.mainService ||
      !formValues?.pipe
    ) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    // 🔴 API CALL HERE
    setTimeout(() => {
      setLoading(false);
      setSuccess("Retail pricing details submitted successfully");
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
        title="Retail Pricing"
        description="Configure retail pricing details"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <FieldRow label="Client ID">
              <input
                name="clientId"
                value={formValues?.clientId || ""}
                onChange={handleInputChange}
                className="capsInput"
                placeholder="Enter client id"
              />
            </FieldRow>

            <FieldRow label="MDS ID">
              <select
                name="mdsId"
                value={formValues?.mdsId || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">--Select--</option>
                <option value="MDS001">MDS001</option>
              </select>
            </FieldRow>

            <FieldRow label="Category">
              <select
                name="category"
                value={formValues?.category || "Postpaid"}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="Postpaid">Postpaid</option>
              </select>
            </FieldRow>

            <FieldRow label="Main Service">
              <select
                name="mainService"
                value={formValues?.mainService || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">--Select--</option>
                <option value="AEPS">AEPS</option>
                <option value="Micro ATM">Micro ATM</option>
              </select>
            </FieldRow>

            <FieldRow label="Pipe">
              <select
                name="pipe"
                value={formValues?.pipe || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">--Select--</option>
                <option value="FINO">Fino Bank</option>
                <option value="Fino Smart">FinoSmart Bank</option>
                <option value="Fingpay">Fingpay</option>
                <option value="Yes Bank">Yes Bank</option>
                <option value="Airtel Bank">Airtel Bank</option>
                <option value="IserveU">IserveU</option>
              </select>
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

export default RetailPricing;
