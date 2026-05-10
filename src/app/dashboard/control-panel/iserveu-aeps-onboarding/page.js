"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function IserveuOnboarding() {
  const [formData, setFormData] = useState({
    apiId: "",
    agentId: "",
    userId: typeof window !== "undefined" ? localStorage.getItem("userId") : "",
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    area: "",
    pincode: "",
    mobileNumber: "",
    shopName: "",
    panNumber: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= INPUT HANDLERS =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNoSpaces = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.replace(/\s/g, "").toUpperCase(),
    }));
  };

  const handleDigitOnly = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    const f = formData;

    if (!f.apiId.trim())
      return Swal.fire("Error", "Please Enter API ID", "error");

    if (!f.agentId.trim() || f.agentId.length < 5)
      return Swal.fire("Error", "Agent ID must be at least 5 characters", "error");

    if (!f.firstName.trim() || f.firstName.length < 3)
      return Swal.fire("Error", "First Name must be at least 3 characters", "error");

    if (!f.lastName.trim())
      return Swal.fire("Error", "Please Enter Last Name", "error");

    if (!f.companyName.trim() || f.companyName.length < 3)
      return Swal.fire("Error", "Company Name must be at least 3 characters", "error");

    if (!f.address.trim() || f.address.length < 5)
      return Swal.fire("Error", "Address must be at least 5 characters", "error");

    if (!f.area.trim())
      return Swal.fire("Error", "Please Enter Area", "error");

    if (!f.pincode || f.pincode.length !== 6)
      return Swal.fire("Error", "Pincode must be 6 digits", "error");

    const mobilePattern = /^[6-9][0-9]{9}$/;
    if (!mobilePattern.test(f.mobileNumber))
      return Swal.fire("Error", "Enter valid Mobile Number", "error");

    if (!f.shopName.trim())
      return Swal.fire("Error", "Enter Shop Name", "error");

    if (!f.panNumber || f.panNumber.length !== 10)
      return Swal.fire("Error", "PAN must be 10 characters", "error");

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        endpoints.controlPEndpoints.iserveuOnboarding,
        formData
      );

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (data.status === "0") {
        Swal.fire("Success", data.message || "Submitted Successfully", "success");
        handleReset();
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server Error", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================
  const handleReset = () => {
    setFormData({
      apiId: "",
      agentId: "",
      firstName: "",
      lastName: "",
      companyName: "",
      address: "",
      area: "",
      pincode: "",
      mobileNumber: "",
      shopName: "",
      panNumber: "",
    });
  };

  // ================= UI =================
  const renderRow = (label, name, placeholder, handler = handleChange, max = 50) => (
    <div className="grid grid-cols-[200px_10px_1fr] items-center">
      <label className="text-sm font-semibold text-right">
      {label} <span className="text-red-500">*</span>
    </label>
      <div className="text-center">:</div>
      <input
        name={name}
        value={formData[name]}
        onChange={handler}
        placeholder={placeholder}
        maxLength={max}
        disabled={loading}
        className="capsInput"
      />
    </div>
  );

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard title="ISERVEU AEPS Onboarding" />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            {renderRow("API ID", "apiId", "Enter API ID", handleNoSpaces)}
            {renderRow("Agent ID", "agentId", "Enter Agent ID", handleNoSpaces)}
            {renderRow("First Name", "firstName", "Enter First Name")}
            {renderRow("Last Name", "lastName", "Enter Last Name")}
            {renderRow("Company Name", "companyName", "Enter Company Name")}
            {renderRow("Address", "address", "Enter Address", handleChange, 200)}
            {renderRow("Area", "area", "Enter Area")}
            {renderRow("Pin Code", "pincode", "Enter Pincode", handleDigitOnly, 6)}
            {renderRow("Mobile", "mobileNumber", "Enter Mobile", handleDigitOnly, 10)}
            {renderRow("Shop Name", "shopName", "Enter Shop")}
            {renderRow("PAN", "panNumber", "Enter PAN", handleNoSpaces, 10)}

            <div className="text-center pt-2 space-x-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton px-10"
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>

              <button
                onClick={handleReset}
                disabled={loading}
                className="capsButton px-10 bg-gray-500"
              >
                RESET
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default IserveuOnboarding;