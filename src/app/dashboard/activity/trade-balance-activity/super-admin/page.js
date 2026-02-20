"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SuperAdmin = () => {
  const [superAdmin, setSuperAdmin] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (superAdmin === "Self-Action") {
      router.push("/self-Action");
    } else if (superAdmin === "Portal Admin Request") {
      router.push("/portal-admin-request");
    } else if (superAdmin === "Portal Admin Push") {
      router.push("/portal-admin-push");
    }
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const buttonStyle =
    "px-6 py-2 text-white rounded-xl shadow-md text-sm font-medium " +
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[900px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Super Admin
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-6">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="w-[520px]">

                {/* SELECT */}
                <div className="mb-5 flex items-center">
                  <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                    Select
                  </label>

                  <select
                    className={inputStyle}
                    value={superAdmin}
                    onChange={(e) => setSuperAdmin(e.target.value)}
                    required
                  >
                    <option value="">--select--</option>
                    <option value="Self-Action">Self-Action</option>
                    <option value="Portal Admin Request">
                      Portal Admin Request
                    </option>
                    <option value="Portal Admin Push">
                      Portal Admin Push
                    </option>
                  </select>
                </div>

                {/* BUTTON */}
                <div className="text-center">
                  <button type="submit" className={buttonStyle}>
                    Continue
                  </button>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
