"use client";
import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const BillingRequest = () => {
  const [checkedRows, setCheckedRows] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCheckboxChange = (rowId) => {
    setCheckedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleSelectAllChange = () => {
    const checked = !isAllChecked;
    setIsAllChecked(checked);
    setCheckedRows({ 1: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Rows:", checkedRows);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Billing Request"
        description="Review and process billing requests"
      />

      {/* MAIN CARD */}
      <PageCard>

        <form onSubmit={handleSubmit}>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#226b88] text-center text-sm">

              <thead>
                <tr className="capsColor">
                  <th className="border p-2">
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={handleSelectAllChange}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Request By</th>
                  <th className="border p-2">User Name</th>
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Remark</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={checkedRows[1] || false}
                      onChange={() => handleCheckboxChange(1)}
                      className="w-4 h-4"
                    />
                  </td>

                  <td className="border p-2">1</td>
                  <td className="border p-2">28/03/2023</td>
                  <td className="border p-2">AG125728</td>
                  <td className="border p-2">SATYENDRA</td>
                  <td className="border p-2">PAN CARD</td>
                  <td className="border p-2">1000</td>
                  <td className="border p-2">1</td>

                  <td className="border p-2 text-green-600 font-semibold">
                    Success
                  </td>

                  <td className="border p-2">Success</td>
                  <td className="border p-2">Success</td>
                </tr>
              </tbody>

            </table>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-5">
            <button type="submit" className="capsButton">
              Submit
            </button>
          </div>

        </form>

      </PageCard>
    </div>
  );
};

export default BillingRequest;
