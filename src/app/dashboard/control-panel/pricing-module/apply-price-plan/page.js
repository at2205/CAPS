"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ApplyPricePlanUser = () => {
  const [formData, setFormData] = useState({
    userType: "select",
    userId: "",
    planId: "",
  });

  const [userSuggestions, setUserSuggestions] = useState([]);
  const [planSuggestions, setPlanSuggestions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.userType === "select") {
      alert("Please select business model");
      return false;
    }
    if (!formData.userId.trim()) {
      alert("Please enter full user ID");
      return false;
    }
    if (!formData.planId.trim()) {
      alert("Please enter price plan name or ID");
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

      setMessage("Price plan successfully mapped to user!");
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      userType: "select",
      userId: "",
      planId: "",
    });
    setUserSuggestions([]);
    setPlanSuggestions([]);
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
        title="Control Panel > Apply Price Plan"
        description="Map pricing plans to users"
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
          <Row label="User Business Model :">
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              disabled={loading}
              className={`${inputClass} disabled:bg-gray-100`}
            >
              <option value="select">Please select User</option>
              <option value="agent">Agent</option>
              <option value="distributor">DS</option>
              <option value="mds">MDS</option>
            </select>
          </Row>

          <Row label="Full User Id :">
            <input
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter user ID"
              disabled={loading || formData.userType === "select"}
              className={`${inputClass} disabled:bg-gray-100`}
            />
          </Row>

          <Row label="Price Plan Name/ID :">
            <input
              name="planId"
              value={formData.planId}
              onChange={handleChange}
              placeholder="Enter price plan name or ID"
              disabled={loading || formData.userType === "select"}
              className={`${inputClass} disabled:bg-gray-100`}
            />
          </Row>

          {/* BUTTONS */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              type="submit"
              disabled={loading || formData.userType === "select"}
              className="capsButton px-10 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="capsButtonSecondary px-10"
            >
              Clear
            </button>
          </div>
        </form>

        {/* INFO SECTION */}
        <div className="flex justify-center gap-6 mt-8">
          {/* INSTRUCTIONS */}
          <div className="w-[420px] bg-red-50 rounded-xl p-5 border border-red-100">
            <h5 className="font-semibold border-b pb-2 mb-3">
              Instructions
            </h5>
            <ul className="text-sm list-disc pl-5 space-y-1">
              <li>Select the user's business model (Agent, DS, or MDS)</li>
              <li>Enter the full user ID</li>
              <li>Enter the price plan name or ID</li>
              <li>Click Submit to map the price plan</li>
            </ul>
          </div>

          {/* BUSINESS MODEL DETAILS */}
          <div className="w-[420px] bg-red-50 rounded-xl p-5 border border-red-100">
            <h5 className="font-semibold border-b pb-2 mb-3">
              Business Model Details
            </h5>

            <p className="text-sm">
              <b>Agent:</b> Retail-level user with basic pricing
            </p>
            <p className="text-sm">
              <b>DS (Distributor):</b> Mid-level distributor with volume pricing
            </p>
            <p className="text-sm">
              <b>MDS:</b> Top-level distributor with premium pricing
            </p>
          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default ApplyPricePlanUser;
