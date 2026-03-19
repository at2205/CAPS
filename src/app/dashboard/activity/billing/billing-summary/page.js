"use client";

import React from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const BillingSummary = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Billing Summary Submitted");
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Billing Summary"
        description="Overview of billing device and service counts"
      />

      {/* MAIN CARD */}
      <PageCard>

        <form onSubmit={handleSubmit}>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#226b88] text-center text-sm">

              <thead>
                <tr className="capsColor">
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

                  <td className="border p-2 text-yellow-500 font-semibold">
                    0
                  </td>

                  <td className="border p-2 text-red-500 font-semibold">
                    0
                  </td>

                  <td className="border p-2 text-green-600 font-semibold">
                    0
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end mt-4">
            <button type="submit" className="capsButton">
              Submit
            </button>
          </div>

        </form>

      </PageCard>
    </div>
  );
};

export default BillingSummary;
