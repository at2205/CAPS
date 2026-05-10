"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const UnblockUserOtp = () => {
  const [userType, setUserType] = useState("AG");
  const [userId, setUserId] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selected, setSelected] = useState([]);

  const [otpData, setOtpData] = useState([]);

  const handleSubmit = async () => {
    if (!userId) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please Enter User ID" });
      return;
    }
    try {
      const payload = { userIdy: userId, userTypeData: userType };
      const params = new URLSearchParams();
      params.append("adminUserFormBean", JSON.stringify(payload));
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.unblockOtpDetails,
        params
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0" && data.data) {
        const record = data.data[0];
        setOtpData([
          { key: "Login_OTP_Count", label: "Login OTP", count: record.Login_OTP_Count || 0 },
          { key: "create_mpin_otp_count", label: "Create MPIN OTP", count: record.create_mpin_otp_count || 0 },
          { key: "forgot_mpin_otp_count", label: "Forgot MPIN OTP", count: record.forgot_mpin_otp_count || 0 },
          { key: "forgot_password_otp_count", label: "Forgot Password OTP", count: record.forgot_password_otp_count || 0 },
        ]);
        setShowTable(true);
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No record found" });
        setShowTable(false);
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Technical error. Please try again." });
    }
  };

  const toggleCheckbox = (key) => {
    setSelected((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const updateSingle = async (key) => {
    try {
      const payload = {
        otpIdy: userId,
        userTypeData: userType,
        statusColumnName: key + "_status",
        messageColumnName: key + "_msg",
        countColumnName: key,
      };
      const params = new URLSearchParams();
      params.append("adminUserFormBean", JSON.stringify(payload));
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.unblockOtpSingleUpdate,
        params
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "OTP count reset.", timer: 1500, showConfirmButton: false });
        handleSubmit();
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Update failed." });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Technical error." });
    }
  };

  const updateAll = async () => {
    if (selected.length === 0) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select at least one OTP type" });
      return;
    }
    try {
      const payload = {
        otpIdy: userId,
        userTypeData: userType,
        columnName: selected.join(","),
      };
      const params = new URLSearchParams();
      params.append("adminUserFormBean", JSON.stringify(payload));
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.unblockOtpUpdateAll,
        params
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "All OTP counts reset.", timer: 1500, showConfirmButton: false });
        setSelected([]);
        handleSubmit();
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Update failed." });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Technical error." });
    }
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
