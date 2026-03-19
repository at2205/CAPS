"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function DSMapping() {
  const [formData, setFormData] = useState({
    masterDistributorId: "",
    distributorId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.masterDistributorId || !formData.distributorId) {
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
        description="Map distributor under selected master distributor"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* MASTER DISTRIBUTOR ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">

              <label className="text-right font-medium">
                Master Distributor ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="masterDistributorId"
                placeholder="Full MDS Id"
                value={formData.masterDistributorId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* DISTRIBUTOR ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-start gap-4 mb-6">

              <label className="text-right font-medium pt-2">
                Distributor ID
              </label>

              <div className="text-center pt-2">:</div>

              <textarea
                name="distributorId"
                rows={4}
                placeholder="Full DS Id (Use comma for separating multiple ids)"
                value={formData.distributorId}
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
                Submit
              </button>
            </div>

          </div>
        </div>

      </PageCard>
    </div>
  );
}

export default DSMapping;
