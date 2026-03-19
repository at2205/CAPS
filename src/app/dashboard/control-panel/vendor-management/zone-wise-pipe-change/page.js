"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      {/* HEADER */}
      <CapsCard
        title="Zone Wise Pipe Change"
        description="Update retailer pipe configuration based on zone"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <form onSubmit={handleSubmit}>

              <FieldRow label="Retail ID">
                <select
                  name="retailId"
                  value={formValues.retailId}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">Select</option>
                  <option value="item">item</option>
                  <option value="item1">item1</option>
                  <option value="item2">item2</option>
                </select>
              </FieldRow>

              <FieldRow label="Zone">
                <select
                  name="zone"
                  value={formValues.zone}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">Select</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </FieldRow>

              <FieldRow label="Service">
                <input
                  type="text"
                  name="service"
                  value={formValues.service}
                  onChange={handleInputChange}
                  placeholder="Enter service"
                  className="capsInput"
                />
              </FieldRow>

              {/* STATUS */}
              <div className="text-center text-sm min-h-[24px]">
                {success && <p className="text-green-600">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                {loading && <p className="text-gray-500">Processing...</p>}
              </div>

              {/* BUTTON */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="capsButton min-w-[140px]"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default ZoneWisePipeChange;
