"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const ClosingBalance = () => {
  const [formData, setFormData] = useState({ dob: "", userType: "", userId: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userType || !formData.userId || !formData.dob) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please fill all fields", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), loginType: localStorage.getItem("adminUserType"), userType: formData.userType, searchUserId: formData.userId, date: formData.dob };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.closingBalance,
        new URLSearchParams({ data: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setResult(data);
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Balance retrieved", timer: 1200, showConfirmButton: false });
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No records found" });
      }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Closing Balance"
        description="Search closing balance details by user"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>

            {/* DOB */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Date of Birth
              </label>

              <div className="text-center">:</div>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* USER TYPE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Type of User
              </label>

              <div className="text-center">:</div>

              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                className="capsSelect"
              >
                <option value="">--select--</option>
                <option value="Admin">Admin</option>
                <option value="API">API</option>
                <option value="MDS">MDS</option>
                <option value="DS">DS</option>
                <option value="Agents">Agents</option>
              </select>
            </div>

            {/* USER ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                User Id
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="userId"
                placeholder="Enter short ID only"
                value={formData.userId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="capsButton min-w-[120px]"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </PageCard>
    </div>
  );
};

export default ClosingBalance;
