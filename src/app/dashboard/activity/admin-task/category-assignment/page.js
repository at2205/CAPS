"use client";

import React, { useState } from "react";

const CategoryAssignment = () => {
  const [assignCategory, setAssignCategory] = useState("");

  const handleSubmit = () => {
    if (!assignCategory) {
      alert("Please Select Category.");
      return;
    }
    console.log("Selected Category:", assignCategory);
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 min-h-[260px] rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Category Assignment
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <div className="flex justify-center">
            <div className="w-[520px]">

              {/* CATEGORY */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Assign Category :
                </label>

                <select
                  value={assignCategory}
                  onChange={(e) => setAssignCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                >
                  <option value="">Select</option>
                  <option value="Category-D">Category-D</option>
                  <option value="Category-Demo">Category-Demo</option>
                  <option value="Category-Free">Category-Free</option>
                  <option value="Category-Kalpna">Category-Kalpna</option>
                  <option value="Category-MDMH10428">Category-MDMH10428</option>
                  <option value="Category-MDPB10401">Category-MDPB10401</option>
                  <option value="Category-POP-Premium">Category-POP-Premium</option>
                  <option value="Category-Postpaid">Category-Postpaid</option>
                  <option value="Category-Prepaid">Category-Prepaid</option>
                </select>
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAssignment;
