"use client";
import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    setTimeout(() => {
      setLoading(false);
      setSuccess("API pricing details submitted successfully");
    }, 1000);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[160px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          API Pricing
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleSubmit}>

            <Row label="API ID :">
              <select
                name="apiId"
                required
                className={inputClass}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                <option value="1">Item One</option>
                <option value="2">Item Two</option>
                <option value="3">Item Three</option>
              </select>
            </Row>

            <Row label="Category :">
              <select
                name="category"
                required
                className={inputClass}
                onChange={handleInputChange}
              >
                <option value="Postpaid">Postpaid</option>
              </select>
            </Row>

            <Row label="Main Service :">
              <select
                name="mainService"
                required
                className={inputClass}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                <option value="AEPS">AEPS</option>
                <option value="Micro ATM">Micro ATM</option>
              </select>
            </Row>

            {/* CONDITIONAL SUB SERVICE */}
            {formValues.mainService === "AEPS" && (
              <Row label="Sub Service :">
                <select
                  name="subService"
                  required
                  className={inputClass}
                  onChange={handleInputChange}
                >
                  <option value="Cash Withdrawal">Cash Withdrawal</option>
                  <option value="Balance Enquiry">Balance Enquiry</option>
                  <option value="Mini Statement">Mini Statement</option>
                  <option value="Aadhaar Pay">Aadhaar Pay</option>
                </select>
              </Row>
            )}

            <Row label="Pipe :">
              <select
                name="pipe"
                required
                className={inputClass}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                <option value="FINO">Fino Bank</option>
                <option value="Fino Smart">FinoSmart Bank</option>
                <option value="Fingpay">Fingpay</option>
                <option value="Yes Bank">Yes Bank</option>
                <option value="Airtel Bank">Airtel Bank</option>
                <option value="IserveU">IserveU</option>
              </select>
            </Row>

            {/* STATUS */}
            <div className="text-center min-h-[28px] mb-2">
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              {loading && (
                <div className="flex justify-center">
                  <div className="h-4 w-4 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-3">
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

export default APIPricing;
