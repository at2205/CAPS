"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ActivateDeactivateService = () => {
  const [formData, setFormData] = useState({
    service: "",
    action: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.service) {
      alert("Please select Service");
      return;
    }
    if (!formData.action) {
      alert("Please select Action");
      return;
    }

    console.log(formData);
    alert("Submitted Successfully");
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Activate / Deactivate Service"
        description="Manage service activation status"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* SERVICE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                Select Service
              </label>

              <div className="text-center">:</div>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="capsSelect"
              >
                <option value="">-- Select --</option>
                <option value="AADHAR">AADHAR</option>
              </select>
            </div>

            {/* ACTION */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                Select Action
              </label>

              <div className="text-center">:</div>

              <select
                name="action"
                value={formData.action}
                onChange={handleChange}
                className="capsSelect"
              >
                <option value="">-- Select --</option>
                <option value="Activate">Activate</option>
                <option value="Deactivate">Deactivate</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="capsButton min-w-[120px]"
              >
                Continue
              </button>
            </div>

          </div>
        </div>

      </PageCard>
    </div>
  );
};

export default ActivateDeactivateService;
