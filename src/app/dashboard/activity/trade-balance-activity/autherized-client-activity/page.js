"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AuthorizedClientActivity = () => {
  const [authorizedClientActivity, setAuthorizedClientActivity] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authorizedClientActivity === "myDeposit") {
      router.push("/authorized-client-activity/my-deposit");
    } 
    else if (authorizedClientActivity === "tradeBalanceRequest") {
      router.push("/authorized-client-activity/trade-balance-request");
    } 
    else if (authorizedClientActivity === "tradeBalancePush") {
      router.push("/authorized-client-activity/trade-balance-push");
    }
  };

  const selectStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const buttonStyle =
    "px-6 py-2 text-white rounded-xl shadow-md text-sm font-medium " +
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Authorized Client Activity
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-6 flex justify-center">
          <form className="w-[520px]" onSubmit={handleSubmit}>

            {/* SELECT */}
            <div className="mb-6 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Select
              </label>

              <select
                className={selectStyle}
                value={authorizedClientActivity}
                onChange={(e) =>
                  setAuthorizedClientActivity(e.target.value)
                }
                required
              >
                <option value="">--select--</option>
                <option value="myDeposit">My Deposit</option>
                <option value="tradeBalanceRequest">
                  Trade Balance Request
                </option>
                <option value="tradeBalancePush">
                  Trade Balance Push
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button type="submit" className={buttonStyle}>
                Continue
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorizedClientActivity;
