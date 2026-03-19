"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function ROMapping() {
  const [formData, setFormData] = useState({
    distributorId: "",
    retailerId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.distributorId || !formData.retailerId) {
      alert("Please fill all fields");
      return;
    }

    console.log(formData);
    alert("Move Entity submitted (frontend only)");
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Move Entity"
        description="Map retailer under selected distributor"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* DISTRIBUTOR ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">

              <label className="text-right font-medium">
                Distributor ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="distributorId"
                placeholder="Full Distributor Id"
                value={formData.distributorId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* RETAILER ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">

              <label className="text-right font-medium">
                Retailer ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="retailerId"
                placeholder="Full Retailer Id"
                value={formData.retailerId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center mt-4">
              <button
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
}

export default ROMapping;
