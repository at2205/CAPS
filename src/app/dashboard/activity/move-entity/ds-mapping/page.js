"use client";

import React, { useState } from "react";

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
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Move Entity
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-10 flex justify-center">
          <div className="w-[520px]">

            {/* MASTER DISTRIBUTOR ID */}
            <div className="mb-5 flex items-center">
              <label className="font-semibold w-1/2 text-right mr-3">
                Master Distributor ID
              </label>

              <input
                type="text"
                name="masterDistributorId"
                placeholder="Full MDS Id"
                value={formData.masterDistributorId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
              />
            </div>

            {/* DISTRIBUTOR ID */}
            <div className="mb-6 flex items-start">
              <label className="font-semibold w-1/2 text-right mr-3 pt-2">
                Distributor ID
              </label>

              <textarea
                name="distributorId"
                rows={4}
                placeholder="Full DS Id (Use comma for separating multiple ids)"
                value={formData.distributorId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-white rounded-2xl shadow
                           bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                           hover:opacity-90 transition"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DSMapping;
