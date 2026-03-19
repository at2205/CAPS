"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function IserveuOnboarding() {
  const [formData, setFormData] = useState({
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

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const validateForm = () => {
    const f = formData;

    if (!f.apiId.trim()) return alert("Please Enter API ID.");
    if (!f.agentId.trim() || f.agentId.length < 5)
      return alert("Agent ID must be at least 5 characters.");
    if (!f.firstName.trim() || f.firstName.length < 3)
      return alert("First Name must be at least 3 characters.");
    if (!f.lastName.trim()) return alert("Please Enter Last Name.");
    if (!f.companyName.trim() || f.companyName.length < 3)
      return alert("Company Name must be at least 3 characters.");
    if (!f.address.trim() || f.address.length < 5)
      return alert("Address must be at least 5 characters.");
    if (!f.area.trim() || f.area.length < 3)
      return alert("Please Enter Area.");
    if (!f.pincode || f.pincode.length !== 6)
      return alert("Pincode must be 6 digits.");

    const mobilePattern = /^[6-9][0-9]{9}$/;
    if (!mobilePattern.test(f.mobileNumber))
      return alert("Enter valid Mobile Number.");

    if (!f.shopName.trim() || f.shopName.length < 3)
      return alert("Shop Name must be at least 3 characters.");
    if (!f.panNumber || f.panNumber.length !== 10)
      return alert("PAN Number must be 10 characters.");

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setMessage("");

      await new Promise((r) => setTimeout(r, 1500));

      setMessage("Onboarding Submitted Successfully!");
      handleReset();
    } finally {
      setLoading(false);
    }
  };

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

  const renderRow = (label, name, placeholder, handler = handleChange, max = 50) => (
    <div className="grid grid-cols-[200px_10px_1fr] items-center">
      <label className="text-sm font-semibold text-right">
        {label}
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
      <CapsCard
        title="ISERVEU AEPS Onboarding"
        description="Submit onboarding details for ISERVEU"
      />

      <PageCard>
        {message && (
          <p className="text-center text-red-500 font-semibold mb-4 text-sm">
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            {renderRow("API ID", "apiId", "Enter API ID", handleNoSpaces)}
            {renderRow("Full Agent ID", "agentId", "Enter Agent ID", handleNoSpaces)}
            {renderRow("First Name", "firstName", "Enter First Name", handleNoSpaces)}
            {renderRow("Last Name", "lastName", "Enter Last Name", handleNoSpaces)}
            {renderRow("Company Name", "companyName", "Enter Company Name")}
            {renderRow("Address", "address", "Enter Address", handleChange, 200)}
            {renderRow("Area", "area", "Enter Area")}
            {renderRow("Pin Code", "pincode", "Enter 6 Digit Pincode", handleDigitOnly, 6)}
            {renderRow("Mobile Number", "mobileNumber", "Enter Mobile Number", handleDigitOnly, 10)}
            {renderRow("Shop Name", "shopName", "Enter Shop Name")}
            {renderRow("PAN Number", "panNumber", "Enter PAN Number", handleNoSpaces, 10)}

            <div className="text-center pt-2 space-x-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton px-10"
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="capsButton px-10 bg-gray-500 hover:bg-gray-600"
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
