"use client";
import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // 🔹 Dummy submit
    setTimeout(() => {
      setLoading(false);
      setSuccess("Retail pricing details submitted successfully");
    }, 1000);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-4">
      <label className="w-[200px] text-right text-sm font-semibold">
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
          Retail Pricing
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleSubmit}>

            {/* Client ID */}
            <Row label="Client ID :">
              <input
                name="clientId"
                required
                onChange={handleInputChange}
                className={inputClass}
              />
            </Row>

            {/* MDS ID */}
            <Row label="MDS ID :">
              <select
                name="mdsId"
                required
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">--Select--</option>
                <option value="MDS001">MDS001</option>
              </select>
            </Row>

            {/* Category */}
            <Row label="Category :">
              <select
                name="category"
                required
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="Postpaid">Postpaid</option>
              </select>
            </Row>

            {/* Main Service */}
            <Row label="Main Service :">
              <select
                name="mainService"
                required
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">--Select--</option>
                <option value="AEPS">AEPS</option>
                <option value="Micro ATM">Micro ATM</option>
              </select>
            </Row>

            {/* Pipe */}
            <Row label="Pipe :">
              <select
                name="pipe"
                required
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="FINO">Fino Bank</option>
                <option value="Fino Smart">FinoSmart Bank</option>
                <option value="Fingpay">Fingpay</option>
                <option value="Yes Bank">Yes Bank</option>
                <option value="Airtel Bank">Airtel Bank</option>
                <option value="IserveU">IserveU</option>
              </select>
            </Row>

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

            {/* BUTTON */}
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

export default RetailPricing;
