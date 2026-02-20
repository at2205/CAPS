"use client";

import React, { useState } from "react";

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
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Activate / Deactivate Service
        </div>

        {/* BODY */}
        <div className="px-10 py-10">
          <div className="flex justify-center">
            <div className="w-[520px]">

              {/* SERVICE */}
              <div className="mb-4 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Select Service
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option value="AADHAR">AADHAR</option>
                </select>
              </div>

              {/* ACTION */}
              <div className="mb-4 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Select Action
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                  name="action"
                  value={formData.action}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option value="Activate">Activate</option>
                  <option value="Deactivate">Deactivate</option>
                </select>
              </div>

              {/* BUTTON */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                >
                  Continue
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateDeactivateService;
