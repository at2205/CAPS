"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function APIPricing() {
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
      !formValues?.apiId ||
      !formValues?.category ||
      !formValues?.mainService ||
      !formValues?.pipe
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (
      formValues.mainService === "AEPS" &&
      !formValues?.subService
    ) {
      setError("Please select sub service");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    // 🔴 API CALL HERE
    setTimeout(() => {
      setLoading(false);
      setSuccess("API pricing details submitted successfully");
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
        title="API Pricing"
        description="Configure API pricing details"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <FieldRow label="API ID">
              <select
                name="apiId"
                value={formValues?.apiId || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">--Select--</option>
                <option value="1">All</option>
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

            {/* CONDITIONAL SUB SERVICE */}
            {formValues.mainService === "AEPS" && (
              <FieldRow label="Sub Service">
                <select
                  name="subService"
                  value={formValues?.subService || ""}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">--Select--</option>
                  <option value="Cash Withdrawal">Cash Withdrawal</option>
                  <option value="Balance Enquiry">Balance Enquiry</option>
                  <option value="Mini Statement">Mini Statement</option>
                  <option value="Aadhaar Pay">Aadhaar Pay</option>
                </select>
              </FieldRow>
            )}

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

export default APIPricing;
