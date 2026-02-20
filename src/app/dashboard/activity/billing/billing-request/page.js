"use client";
import React, { useState } from "react";

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
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Billing Request
        </div>

        {/* BODY */}
        <div className="px-4 py-4">
          <form onSubmit={handleSubmit}>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-center text-sm">
                
                <thead className="bg-gray-100">
                  <tr>
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
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-2xl shadow 
                           bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                           hover:opacity-90 transition"
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

export default BillingRequest;
