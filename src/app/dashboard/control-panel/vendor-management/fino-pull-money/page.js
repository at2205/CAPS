"use client";
import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    setTimeout(() => {
      setLoading(false);
      setSuccess("Amount pull request submitted successfully");
    }, 1000);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
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
          Fino Pull Money
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleSubmit}>

            {/* AVAILABLE BALANCE */}
            <Row label="Available Balance :">
              <span className="text-sm font-semibold">
                ₹ 1000
              </span>
            </Row>

            {/* AMOUNT */}
            <Row label="Enter Amount To Pull :">
              <input
                type="number"
                name="amountToPull"
                required
                onChange={handleInputChange}
                className={inputClass}
              />
            </Row>

            {/* STATUS */}
            <div className="text-center min-h-[28px]">
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

export default FinoPullMoney;
