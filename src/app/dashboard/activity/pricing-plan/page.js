"use client";

import React, { useEffect, useState } from "react";

const PrincingPlan = () => {
  const [formData, setFormData] = useState({
    name: "",
    crgper: "",
    crgfx: "",
    validity: "",
  });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans([
      {
        planname: "Basic",
        chargeinpercentage: "2%",
        fixedcharge: "10",
        validity: "2026-12-31",
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = () => {
    if (
      !formData.name ||
      !formData.crgper ||
      !formData.crgfx ||
      !formData.validity
    ) {
      alert("All fields required");
      return;
    }

    setPlans([
      ...plans,
      {
        planname: formData.name,
        chargeinpercentage: formData.crgper,
        fixedcharge: formData.crgfx,
        validity: formData.validity,
      },
    ]);

    setFormData({
      name: "",
      crgper: "",
      crgfx: "",
      validity: "",
    });
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Pricing Plan
        </div>

        {/* ===== BODY ===== */}
        <div className="px-8 py-10">

          {/* ===== FORM ===== */}
          <div className="flex justify-center mb-10">
            <div className="w-[520px] space-y-5">

              {[
                { label: "Pricing Plan Name", name: "name", type: "text" },
                { label: "Charges in %", name: "crgper", type: "text" },
                { label: "Fixed Charges", name: "crgfx", type: "text" },
                { label: "Validity", name: "validity", type: "date" },
              ].map((field) => (
                <div key={field.name} className="flex items-center gap-4">
                  <label className="w-1/2 text-right font-semibold">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
              ))}

              {/* BUTTON */}
              <div className="text-center pt-2">
                <button
                  onClick={submitForm}
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>

            </div>
          </div>

          {/* ===== TABLE ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm text-center">

              <thead className="bg-blue-50 font-semibold">
                <tr>
                  <th className="border p-2">Plan Name</th>
                  <th className="border p-2">Charge (%)</th>
                  <th className="border p-2">Fixed Charge</th>
                  <th className="border p-2">Validity</th>
                </tr>
              </thead>

              <tbody>
                {plans.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border p-2 font-semibold text-[#3d89a6]">
                      {p.planname}
                    </td>
                    <td className="border p-2">
                      {p.chargeinpercentage}
                    </td>
                    <td className="border p-2">
                      {p.fixedcharge}
                    </td>
                    <td className="border p-2">
                      {p.validity}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrincingPlan;
