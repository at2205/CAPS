"use client";

import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Pricing Plan"
        description="Create and manage pricing plans"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* FORM */}
        <div className="flex justify-center mb-10">
          <div>

            {/* PLAN NAME */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Pricing Plan Name
              </label>
              <div className="text-center">:</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* CHARGES % */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Charges in %
              </label>
              <div className="text-center">:</div>
              <input
                type="text"
                name="crgper"
                value={formData.crgper}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* FIXED CHARGES */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Fixed Charges
              </label>
              <div className="text-center">:</div>
              <input
                type="text"
                name="crgfx"
                value={formData.crgfx}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* VALIDITY */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                Validity
              </label>
              <div className="text-center">:</div>
              <input
                type="date"
                name="validity"
                value={formData.validity}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                onClick={submitForm}
                className="capsButton min-w-[120px]"
              >
                Submit
              </button>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#226b88] text-sm text-center">

            <thead>
              <tr className="capsColor">
                <th className="border p-2">Plan Name</th>
                <th className="border p-2">Charge (%)</th>
                <th className="border p-2">Fixed Charge</th>
                <th className="border p-2">Validity</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((p, i) => (
                <tr key={i}>
                  <td className="border p-2 font-semibold">
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

      </PageCard>
    </div>
  );
};

export default PrincingPlan;
