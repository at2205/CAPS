"use client";
import React, { useState } from "react";

function ViewCutOffManagement() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({ fullId: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setSuccess("");
    setError("");

    if (!formValues.fullId) {
      setError("Please enter full id");
      setLoading(false);
      return;
    }

    // 🔴 API CALL HERE
    setTimeout(() => {
      setSuccess("Submit successfully.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-white">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          View Cut-Off Management
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <div className="p-6">
            <form>
              
              {/* FULL ID ROW */}
              <div className="mb-4 flex items-center justify-center">
                <label className="w-[200px] text-right font-semibold text-sm whitespace-nowrap">
                  Enter Full Id :
                </label>

                <input
                  type="text"
                  name="fullId"
                  placeholder="Enter full id"
                  onChange={handleInputChange}
                  className="ml-3 w-[220px] border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
                />
              </div>

              {/* STATUS MESSAGE */}
              <div className="flex justify-center items-center gap-3 mb-3 text-sm">
                {success && (
                  <span className="text-green-600">{success}</span>
                )}
                {error && (
                  <span className="text-red-500">{error}</span>
                )}
                {loading && (
                  <span className="text-gray-500 animate-pulse">
                    Loading...
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-5 py-1.5 text-white text-sm rounded-md shadow-md
                    bg-[#4fa2c2] hover:opacity-90
                    ${loading ? "opacity-60 cursor-not-allowed" : ""}
                  `}
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

export default ViewCutOffManagement;
