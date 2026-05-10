"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

    setLoading(true);
    setSuccess("");
    setError("");

    if (!formValues?.slectInventoryType || formValues?.slectInventoryType === "select") {
      setError("Please select inventory type");
      setLoading(false);
      return;
    }

    if (!formValues?.from || !formValues?.to) {
      setError("Please select date range");
      setLoading(false);
      return;
    }

    console.log("form fields", formValues);

    // 🔴 API CALL HERE
    setTimeout(() => {
      setLoading(false);
      setSuccess("Inventory updated successfully");
    }, 1000);
  };

  const handleClear = () => {
    setFormValues({});
    setSuccess("");
    setError("");
  };

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Controller Inventory Package"
        description="Update inventory availability date range"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* INVENTORY TYPE */}
            <FieldRow label="Select Inventory Type">
              <select
                name="slectInventoryType"
                value={formValues?.slectInventoryType || "select"}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="select">Select</option>
                <option value="Holiday">Holiday</option>
              </select>
            </FieldRow>

            {/* FROM DATE */}
            <FieldRow label="From">
              <input
                type="date"
                name="from"
                value={formValues?.from || ""}
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            {/* TO DATE */}
            <FieldRow label="To">
              <input
                type="date"
                name="to"
                value={formValues?.to || ""}
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            {/* STATUS */}
            <div className="text-center mb-2 text-sm">
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {loading && <p className="text-gray-500">Loading...</p>}
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="capsButtonSecondary min-w-[140px]"
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default HolidaysController;
