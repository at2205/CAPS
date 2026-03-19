"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function ScheduleAutoDebit() {
  const [formData, setFormData] = useState({
    agentId: "",
    balance: "",
    partialAdjustmentAllowed: "",
    services: "",
    remarks: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Schedule Auto Debit"
        description="Configure and manage auto debit settings"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* SEARCH FORM */}
        <form onSubmit={handleSubmit} className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">

            <label className="text-right font-medium">
              Agent / DS / SDS / MDS / API ID
            </label>

            <div className="text-center">:</div>

            <input
              type="text"
              name="agentId"
              value={formData.agentId}
              onChange={handleChange}
              className="capsInput"
            />

          </div>

          <div className="ml-6">
            <button type="submit" className="capsButton min-w-[120px]">
              Submit
            </button>
          </div>
        </form>

        {/* RESULT TABLE */}
        {submitted && (
          <>
            <div className="capsColor text-center py-2 font-semibold rounded-md mb-4">
              Auto Debit Details
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">
                <thead>
                  <tr className="capsColor">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Wallet</th>
                    <th className="border p-2">Hold Balance</th>
                    <th className="border p-2">Partial Adj</th>
                    <th className="border p-2">Services</th>
                    <th className="border p-2">Remarks</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border p-2">AG12345</td>
                    <td className="border p-2">
                      DANGI NARVATBHAI RAMANBHAI
                    </td>
                    <td className="border p-2">0.00</td>

                    <td className="border p-1">
                      <input
                        type="text"
                        name="balance"
                        value={formData.balance}
                        onChange={handleChange}
                        className="capsInput px-2 py-1 text-sm"
                      />
                    </td>

                    <td className="border p-1">
                      <select
                        name="partialAdjustmentAllowed"
                        value={formData.partialAdjustmentAllowed}
                        onChange={handleChange}
                        className="capsSelect px-2 py-1 text-sm"
                      >
                        <option value="">--select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>

                    <td className="border p-1">
                      <select
                        name="services"
                        value={formData.services}
                        onChange={handleChange}
                        className="capsSelect px-2 py-1 text-sm"
                      >
                        <option value="">--select--</option>
                      </select>
                    </td>

                    <td className="border p-1">
                      <input
                        type="text"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="capsInput px-2 py-1 text-sm"
                      />
                    </td>

                    <td className="border p-2">
                      <button className="capsButton px-4 py-1 text-sm">
                        Submit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
}

export default ScheduleAutoDebit;
