"use client";

import React, { useState } from "react";

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

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const inputSm =
    "w-full border border-gray-300 rounded-md px-2 py-1 text-sm " +
    "focus:outline-none focus:ring-1 focus:ring-[#4c95b3]";

  const selectSm =
    "w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-white " +
    "focus:outline-none focus:ring-1 focus:ring-[#4c95b3]";

  const buttonStyle =
    "px-6 py-2 text-white rounded-xl shadow-md text-sm font-medium " +
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

  const buttonSm =
    "px-3 py-1 text-white rounded-lg shadow text-sm font-medium " +
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Schedule Auto Debit
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-6">

          {/* ===== SEARCH FORM ===== */}
          <form onSubmit={handleSubmit} className="flex justify-center">
            <div className="w-[520px]">

              <div className="mb-5 flex items-center">
                <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                  Agent / DS / SDS / MDS / API ID
                </label>

                <input
                  type="text"
                  name="agentId"
                  className={inputStyle}
                  value={formData.agentId}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center mb-4">
                <button type="submit" className={buttonStyle}>
                  Submit
                </button>
              </div>

            </div>
          </form>

          {/* ===== RESULT TABLE ===== */}
          {submitted && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-center">
                <thead className="bg-[#f1f8fb] font-semibold">
                  <tr>
                    <th className="border px-3 py-2">ID</th>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Wallet</th>
                    <th className="border px-3 py-2">Hold Balance</th>
                    <th className="border px-3 py-2">Partial Adj</th>
                    <th className="border px-3 py-2">Services</th>
                    <th className="border px-3 py-2">Remarks</th>
                    <th className="border px-3 py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border px-3 py-2">AG12345</td>
                    <td className="border px-3 py-2">
                      DANGI NARVATBHAI RAMANBHAI
                    </td>
                    <td className="border px-3 py-2">0.00</td>

                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="balance"
                        className={inputSm}
                        value={formData.balance}
                        onChange={handleChange}
                      />
                    </td>

                    <td className="border px-2 py-1">
                      <select
                        name="partialAdjustmentAllowed"
                        className={selectSm}
                        value={formData.partialAdjustmentAllowed}
                        onChange={handleChange}
                      >
                        <option value="">--select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>

                    <td className="border px-2 py-1">
                      <select
                        name="services"
                        className={selectSm}
                        value={formData.services}
                        onChange={handleChange}
                      >
                        <option value="">--select--</option>
                      </select>
                    </td>

                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        name="remarks"
                        className={inputSm}
                        value={formData.remarks}
                        onChange={handleChange}
                      />
                    </td>

                    <td className="border px-3 py-2">
                      <button className={buttonSm}>
                        Submit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ScheduleAutoDebit;
