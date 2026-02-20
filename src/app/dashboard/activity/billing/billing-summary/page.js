"use client";

import React from "react";

const BillingSummary = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Billing Summary Submitted");
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Billing Summary
        </div>
    
        {/* BODY */}
        <div className="px-4 py-4">
          <form onSubmit={handleSubmit}>
            
            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-center text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">Request ID</th>
                    <th className="border p-2">BILLING-MANTRA DEVICE</th>
                    <th className="border p-2">RO ID</th>
                    <th className="border p-2">IRCTC ID</th>
                    <th className="border p-2">BILLING-MORPHO DEVICE</th>
                    <th className="border p-2">BILLING-MICRO ATM</th>
                    <th className="border p-2">BILLING-POS DEVICE</th>
                    <th className="border p-2">BILLING-PAN CARD</th>
                    <th className="border p-2">PENDING</th>
                    <th className="border p-2">REFUNDED</th>
                    <th className="border p-2">DELIVERED</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2">1</td>
                    <td className="border p-2">AG125728</td>
                    <td className="border p-2">1</td>
                    <td className="border p-2">1</td>
                    <td className="border p-2">0</td>
                    <td className="border p-2">1</td>
                    <td className="border p-2">1</td>
                    <td className="border p-2">0</td>
                    <td className="border p-2">0</td>
                    <td className="border p-2 text-yellow-500 font-semibold">0</td>
                    <td className="border p-2 text-red-500 font-semibold">0</td>
                    <td className="border p-2 text-green-600 font-semibold">0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingSummary;
