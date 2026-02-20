"use client";
import React, { useState } from "react";

function CopyPricing() {
  const [fullId, setFullId] = useState("");

  const checkFullId = () => {
    if (!fullId) {
      alert("Please enter Full Id");
      return;
    }
    console.log("Entered Full ID =>", fullId);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  return (
    <div className="flex justify-center items-start">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Copy Pricing
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {/* INPUT ROW */}
          <div className="flex justify-center items-center mb-4">
            <label className="w-[180px] text-right text-sm font-semibold whitespace-nowrap">
              Enter Full Id :
            </label>

            <div className="w-[260px] ml-3">
              <input
                type="text"
                placeholder="Please enter Full Id"
                value={fullId}
                onChange={(e) => setFullId(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-3">
            <button
              onClick={checkFullId}
              className="px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CopyPricing;
