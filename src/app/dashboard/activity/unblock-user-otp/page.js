"use client";

import React, { useState } from "react";

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

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const buttonStyle =
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] text-white " +
    "px-5 py-2 rounded-xl shadow-md text-sm font-medium hover:opacity-90";

  const smallButton =
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] text-white " +
    "px-4 py-1 rounded-lg shadow text-sm hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Activity &gt; Unblock User OTP
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6">

          {/* FORM */}
          <div className="flex justify-center mb-6">
            <div className="w-[500px]">

              {/* USER TYPE */}
              <div className="mb-4 flex items-start">
                <label className="w-[200px] text-right pr-4 pt-2 font-semibold text-sm">
                  Select User Type :
                </label>

                <select
                  className={inputStyle}
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="AG">Agent</option>
                  <option value="DS">Distributor</option>
                  <option value="MDS">Master Distributor</option>
                </select>
              </div>

              {/* USER ID */}
              <div className="mb-4 flex items-start">
                <label className="w-[190px] text-right pr-4 pt-2 font-semibold text-sm">
                  User ID :
                </label>

                <input
                  type="text"
                  className={inputStyle}
                  placeholder="User Id"
                  value={userId}
                  onChange={(e) =>
                    setUserId(e.target.value.toUpperCase())
                  }
                />
              </div>

              {/* BUTTON */}
              <div className="text-center mt-6">
                <button className={buttonStyle} onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* TABLE */}
          {showTable && (
            <>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border border-gray-300 text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
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
                            className={smallButton}
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
                <button className={buttonStyle} onClick={updateAll}>
                  Update All
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default UnblockUserOtp;
