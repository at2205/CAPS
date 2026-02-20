"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FinanceAdmin = () => {
  const [financeAdmin, setFinanceAdmin] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (financeAdmin === "Self-Fund Request") {
      router.push("/self-fund-request");
    } else if (financeAdmin === "Trade Balance Request") {
      router.push("/trade-balance-request");
    } else if (financeAdmin === "Trade Balance Push") {
      router.push("/trade-balance-push");
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
          Finance Admin
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-6">
          <form onSubmit={handleSubmit} className="flex justify-center">
            <div className="w-[520px]">

              {/* SELECT */}
              <div className="mb-5 flex items-center">
                <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                  Select
                </label>

                <select
                  className={selectStyle}
                  value={financeAdmin}
                  onChange={(e) => setFinanceAdmin(e.target.value)}
                  required
                >
                  <option value="">--select--</option>
                  <option value="Self-Fund Request">
                    Self-Fund Request
                  </option>
                  <option value="Trade Balance Request">
                    Trade Balance Request
                  </option>
                  <option value="Trade Balance Push">
                    Trade Balance Push
                  </option>
                </select>
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="submit"
                  className={buttonStyle}
                  disabled={!financeAdmin}
                >
                  Continue
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinanceAdmin;
