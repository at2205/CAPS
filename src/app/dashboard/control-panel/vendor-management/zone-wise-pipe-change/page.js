"use client";
import React, { useState } from "react";

function ZoneWisePipeChange() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    retailId: "",
    zone: "",
    service: "",
  });

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

    if (!formValues.retailId || !formValues.zone) {
      setError("Please select Retail ID and Zone");
      setLoading(false);
      return;
    }

    // 🔹 Dummy submit
    setTimeout(() => {
      setLoading(false);
      setSuccess("Zone wise pipe updated successfully");
    }, 1000);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-4">
      <label className="w-[170px] text-right text-sm font-semibold">
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
          Vendor Management &gt; Zone Wise Pipe Change
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <form onSubmit={handleSubmit}>

            <Row label="Retail ID :">
              <select
                name="retailId"
                value={formValues.retailId}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="item">item</option>
                <option value="item1">item1</option>
                <option value="item2">item2</option>
              </select>
            </Row>

            <Row label="Zone :">
              <select
                name="zone"
                value={formValues.zone}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </Row>

            <Row label="Service :">
              <input
                type="text"
                name="service"
                value={formValues.service}
                onChange={handleInputChange}
                placeholder="Enter service"
                className={inputClass}
              />
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

export default ZoneWisePipeChange;
