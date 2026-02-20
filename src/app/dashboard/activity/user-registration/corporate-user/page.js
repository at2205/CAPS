"use client";
import React, { useState, useEffect } from "react";

/* ================= WHITE LABEL COMPONENT ================= */
const WhiteLabelRegistration = () => {
  return (
    <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">
      <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
        White Label Registration
      </div>

      <div className="p-10 text-center text-gray-600">
        White Label Form Here
      </div>
    </div>
  );
};

/* ================= CORPORATE USER ================= */
const CorporateUser = () => {
  const [selectUser, setSelectUser] = useState("");
  const [showWL, setShowWL] = useState(false);

  const handleContinue = () => {
    if (!selectUser) {
      alert("Please Select User.");
      return;
    }

    if (selectUser === "WL_CLIENT") {
      setShowWL(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start">

      {!showWL && (
        <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

          {/* HEADER */}
          <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
            Corporate User
          </div>

          {/* BODY */}
          <div className="px-10 py-10">
            <div className="flex justify-center">
              <div className="w-[520px]">

                {/* SELECT */}
                <div className="mb-6 flex items-center">
                  <label className="font-semibold mr-4 w-1/2 text-right">
                    Select :
                  </label>

                  <select
                    value={selectUser}
                    onChange={(e) => setSelectUser(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5fa9c7]"
                  >
                    <option value="">--select--</option>
                    <option value="WL_CLIENT">WL Client</option>
                  </select>
                </div>

                {/* BUTTON */}
                <div className="text-center">
                  <button
                    onClick={handleContinue}
                    className="px-8 py-2 text-white rounded-[16px] shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                  >
                    Continue
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {showWL && <WhiteLabelRegistration />}
    </div>
  );
};

export default CorporateUser;
