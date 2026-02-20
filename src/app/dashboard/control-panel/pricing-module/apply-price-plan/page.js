"use client";
import React, { useState } from "react";

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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-xl shadow-sm">

        {/* HEADER */}
        <div className="text-white font-bold text-[18px] px-6 py-4 rounded-t-xl bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6]">
          Apply Price Plan
        </div>

        {/* BODY */}
        <div className="bg-white py-12">

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="w-1/2 mx-auto mb-6 text-center bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
              {message}
            </div>
          )}

          {/* FORM CONTAINER */}
          <div className="w-[65%] mx-auto">
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* USER TYPE */}
              <div className="flex items-center">
                <label className="w-[240px] text-right pr-4 text-sm">
                  User Business Model :
                </label>

                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-[260px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6]"
                >
                  <option value="select">Please select User</option>
                  <option value="agent">Agent</option>
                  <option value="distributor">DS</option>
                  <option value="mds">MDS</option>
                </select>
              </div>

              {/* USER ID */}
              <div className="flex items-center">
                <label className="w-[240px] text-right pr-4 text-sm">
                  Full User Id :
                </label>

                <input
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="Enter user ID"
                  disabled={loading || formData.userType === "select"}
                  className="w-[260px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6] disabled:bg-gray-100"
                />
              </div>

              {/* PLAN ID */}
              <div className="flex items-center">
                <label className="w-[240px] text-right pr-4 text-sm">
                  Price Plan Name/ID :
                </label>

                <input
                  name="planId"
                  value={formData.planId}
                  onChange={handleChange}
                  placeholder="Enter price plan name or ID"
                  disabled={loading || formData.userType === "select"}
                  className="w-[260px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6] disabled:bg-gray-100"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-6 pt-4">
                <button
                  type="submit"
                  disabled={loading || formData.userType === "select"}
                  className="px-8 py-2 text-white text-sm rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1] hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50"
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
                  className="px-8 py-2 text-white text-sm rounded-full bg-gradient-to-b from-[#666] to-[#444] hover:opacity-90 transition disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* INFO CARDS */}
          <div className="flex justify-center gap-6 mt-10">

            {/* INSTRUCTIONS */}
            <div className="w-[420px] bg-[#fff1f1] rounded-xl p-5 shadow-md">
              <h5 className="font-semibold border-b pb-2 mb-3">
                Instructions
              </h5>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Select the user's business model (Agent, DS, or MDS)</li>
                <li>Enter the full user ID</li>
                <li>Enter the price plan name or ID</li>
                <li>Click Submit to map the price plan to the user</li>
              </ul>
            </div>

            {/* BUSINESS MODEL DETAILS */}
            <div className="w-[420px] bg-[#fff1f1] rounded-xl p-5 shadow-md">
              <h5 className="font-semibold border-b pb-2 mb-3">
                Business Model Details
              </h5>

              <p className="text-sm">
                <b>Agent:</b> Retail-level user with basic pricing
              </p>
              <p className="text-sm">
                <b>DS (Distributor):</b> Mid-level distributor with volume-based pricing
              </p>
              <p className="text-sm">
                <b>MDS:</b> Top-level distributor with premium pricing plans
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplyPricePlanUser;
