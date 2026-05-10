"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ApplyPricePlan = () => {
  const [searchData, setSearchData] = useState({
    planName: "",
    channel: "select",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!searchData.planName.trim()) {
      alert("Please enter price plan name");
      return false;
    }
    if (searchData.channel === "select") {
      alert("Please select channel");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setMessage("");

      await new Promise((r) => setTimeout(r, 1200));

      setMessage("Price Plan Loaded Successfully!");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchData({ planName: "", channel: "select" });
    setMessage("");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-start justify-center mb-3">
      <label className="w-[240px] text-right text-sm font-semibold pt-1">
        {label}
      </label>
      <div className="w-[280px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Control Panel > Create Price Plan"
        description="Load and configure pricing plans"
      />

      <PageCard>
        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-4 text-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-md py-2">
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <Row label="Price Plan Name :">
            <input
              name="planName"
              value={searchData.planName}
              onChange={handleChange}
              placeholder="Enter price plan name"
              disabled={loading}
              className={`${inputClass} disabled:bg-gray-100`}
            />
          </Row>

          <Row label="Channel :">
            <select
              name="channel"
              value={searchData.channel}
              onChange={handleChange}
              disabled={loading}
              className={`${inputClass} disabled:bg-gray-100`}
            >
              <option value="select">Please Select Channel</option>
              <option value="MDS">Master Distributor</option>
              <option value="DS">Distributor</option>
              <option value="Agent">Retailer</option>
            </select>
          </Row>

          {/* BUTTONS */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="capsButton px-10 flex items-center gap-2 disabled:opacity-50"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="capsButtonSecondary px-10"
            >
              Clear
            </button>
          </div>
        </form>
      </PageCard>
    </div>
  );
};

export default ApplyPricePlan;
