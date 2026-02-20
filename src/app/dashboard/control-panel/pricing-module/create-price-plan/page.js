"use client";
import React, { useState } from "react";

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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-xl shadow-sm">

        {/* HEADER */}
        <div className="text-white font-bold text-[18px] px-6 py-4 rounded-t-xl bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6]">
          Create Price Plan
        </div>

        {/* BODY */}
        <div className="bg-[#fafafa] py-12">

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="w-1/2 mx-auto mb-6 text-center bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
              {message}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >

            {/* PRICE PLAN NAME */}
            <div className="flex items-center">
              <label className="w-[220px] text-right pr-4 font-bold text-[15px]">
                Price Plan Name :
              </label>

              <input
                name="planName"
                value={searchData.planName}
                onChange={handleChange}
                placeholder="Enter price plan name"
                disabled={loading}
                className="w-[260px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6]"
              />
            </div>

            {/* CHANNEL */}
            <div className="flex items-center">
              <label className="w-[220px] text-right pr-4 font-bold text-[15px]">
                Channel :
              </label>

              <select
                name="channel"
                value={searchData.channel}
                onChange={handleChange}
                disabled={loading}
                className="w-[260px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6]"
              >
                <option value="select">
                  Please Select Channel
                </option>
                <option value="MDS">
                  Master Distributor
                </option>
                <option value="DS">
                  Distributor
                </option>
                <option value="Agent">
                  Retailer
                </option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-6 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 text-white text-[15px] rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1] hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50"
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
                className="px-8 py-2 text-white text-[15px] rounded-full bg-gradient-to-b from-[#666] to-[#444] hover:opacity-90 transition disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyPricePlan;
