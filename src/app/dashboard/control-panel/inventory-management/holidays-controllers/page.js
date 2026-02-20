"use client";
import React, { useState } from "react";

function HolidaysController() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({});

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form fields", formValues);

    setLoading(true);
    setSuccess("");
    setError("");

    setTimeout(() => {
      setLoading(false);
      setSuccess("Inventory updated successfully");
    }, 1000);
  };

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[220px] text-right font-semibold text-sm">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  return (
    <div className="min-h-screen flex justify-center items-start bg-white">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Controller Inventory Package
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              
              {/* INVENTORY TYPE */}
              <Row label="Select Inventory Type :">
                <select
                  name="slectInventoryType"
                  required
                  onChange={handleInputChange}
                  className={inputStyle}
                >
                  <option value="select">select</option>
                  <option value="Holiday">Holiday</option>
                </select>
              </Row>

              {/* FROM DATE */}
              <Row label="From :">
                <input
                  type="date"
                  name="from"
                  required
                  onChange={handleInputChange}
                  className={inputStyle}
                />
              </Row>

              {/* TO DATE */}
              <Row label="To :">
                <input
                  type="date"
                  name="to"
                  required
                  onChange={handleInputChange}
                  className={inputStyle}
                />
              </Row>

              {/* STATUS */}
              <div className="text-center mb-3 text-sm">
                {success && (
                  <p className="text-green-600">{success}</p>
                )}
                {error && (
                  <p className="text-red-500">{error}</p>
                )}
                {loading && (
                  <p className="text-gray-500 animate-pulse">
                    Loading...
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-1.5 text-white text-sm rounded-md shadow-md 
                  bg-[#4fa2c2] hover:opacity-90
                  ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HolidaysController;
