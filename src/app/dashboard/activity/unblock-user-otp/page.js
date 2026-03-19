"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const UnblockUserOtp = () => {
  const [userType, setUserType] = useState("AG");
  const [userId, setUserId] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selected, setSelected] = useState([]);

  const otpData = [
    { key: "Login_OTP_Count", label: "Login OTP", count: 3 },
    { key: "create_mpin_otp_count", label: "Create MPIN OTP", count: 1 },
    { key: "forgot_mpin_otp_count", label: "Forgot MPIN OTP", count: 4 },
    { key: "forgot_password_otp_count", label: "Forgot Password OTP", count: 0 },
  ];

  const handleSubmit = () => {
    if (!userId) {
      alert("Please Enter User ID");
      return;
    }
    setShowTable(true);
  };

  const toggleCheckbox = (key) => {
    setSelected((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const updateSingle = (key) => {
    alert(`Single update triggered for ${key}`);
  };

  const updateAll = () => {
    if (selected.length === 0) {
      alert("Please select at least one OTP type");
      return;
    }
    alert(`Update all for: ${selected.join(", ")}`);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Unblock User OTP"
        description="Reset blocked OTP counters for selected services"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* FORM */}
        <div className="flex justify-center mb-6">
          <div>

            {/* USER TYPE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
              <label className="text-right font-medium">
                Select User Type
              </label>
              <div className="text-center">:</div>
              <select
                className="capsInput"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="AG">Agent</option>
                <option value="DS">Distributor</option>
                <option value="MDS">Master Distributor</option>
              </select>
            </div>

            {/* USER ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                User ID
              </label>
              <div className="text-center">:</div>
              <input
                type="text"
                className="capsInput"
                placeholder="User Id"
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value.toUpperCase())
                }
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button className="capsButton min-w-[120px]" onClick={handleSubmit}>
                Submit
              </button>
            </div>

          </div>
        </div>

        {/* TABLE */}
        {showTable && (
          <>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-[#226b88] text-sm text-center">

                <thead>
                  <tr className="capsColor">
                    <th className="border px-3 py-2">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? otpData.map((d) => d.key)
                              : []
                          )
                        }
                      />
                    </th>
                    <th className="border px-3 py-2">S.N.</th>
                    <th className="border px-3 py-2">Service Name</th>
                    <th className="border px-3 py-2">OTP Count</th>
                    <th className="border px-3 py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {otpData.map((row, index) => (
                    <tr key={row.key} className="hover:bg-gray-50">

                      <td className="border px-3 py-2">
                        <input
                          type="checkbox"
                          checked={selected.includes(row.key)}
                          onChange={() => toggleCheckbox(row.key)}
                        />
                      </td>

                      <td className="border px-3 py-2">
                        {index + 1}
                      </td>

                      <td
                        className={`border px-3 py-2 ${
                          row.count >= 3
                            ? "font-bold text-red-600"
                            : ""
                        }`}
                      >
                        {row.label}
                      </td>

                      <td className="border px-3 py-2">
                        {row.count}
                      </td>

                      <td className="border px-3 py-2">
                        <button
                          className="capsButton px-3 py-1 text-xs"
                          onClick={() => updateSingle(row.key)}
                        >
                          Update
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* UPDATE ALL */}
            <div className="text-center mt-6">
              <button className="capsButton min-w-[140px]" onClick={updateAll}>
                Update All
              </button>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default UnblockUserOtp;
