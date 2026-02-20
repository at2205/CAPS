"use client";
import React, { useState } from "react";

const IserveuOnboarding = () => {
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
      [name]: value.replace(/\s/g, ""),
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

    if (!f.apiId.trim()) return alert("Please enter API ID");
    if (!f.agentId.trim() || f.agentId.length < 5)
      return alert("Agent ID must be at least 5 characters");
    if (!f.firstName.trim() || f.firstName.length < 3)
      return alert("First name must be at least 3 characters");
    if (!f.lastName.trim()) return alert("Please enter last name");
    if (!f.companyName.trim() || f.companyName.length < 3)
      return alert("Company name must be at least 3 characters");
    if (!f.address.trim() || f.address.length < 5)
      return alert("Address must be at least 5 characters");
    if (!f.area.trim() || f.area.length < 5)
      return alert("Area must be at least 5 characters");
    if (!f.pincode || f.pincode.length !== 6)
      return alert("Pincode must be 6 digits");

    const mobilePattern = /^[6-9][0-9]{9}$/;
    if (!mobilePattern.test(f.mobileNumber))
      return alert("Enter valid mobile number");

    if (!f.shopName.trim() || f.shopName.length < 3)
      return alert("Shop name must be at least 3 characters");
    if (!f.panNumber || f.panNumber.length !== 10)
      return alert("PAN number must be 10 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setMessage("");

      await new Promise((r) => setTimeout(r, 1500));

      setMessage("Onboarding submitted successfully!");
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
    setMessage("");
  };

  const renderRow = (
    label,
    name,
    placeholder,
    handler = handleChange,
    max = 50
  ) => (
    <div className="flex items-center mb-4">
      <label className="w-1/3 text-right pr-4 text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        name={name}
        value={formData[name]}
        onChange={handler}
        placeholder={placeholder}
        maxLength={max}
        disabled={loading}
        className="w-[320px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6]"
      />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">

        {/* HEADER */}
        <div className="text-white font-bold text-[18px] px-6 py-4 rounded-t-xl bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6]">
          ISERVEU AEPS Onboarding
        </div>

        {/* BODY */}
        <div className="py-10">

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="w-1/2 mx-auto mb-6 text-center bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
              {message}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center"
          >
            {renderRow("API ID", "apiId", "Enter API ID", handleNoSpaces)}
            {renderRow("Full Agent ID", "agentId", "Enter Agent ID", handleNoSpaces)}
            {renderRow("First Name", "firstName", "Enter First Name", handleNoSpaces)}
            {renderRow("Last Name", "lastName", "Enter Last Name", handleNoSpaces)}
            {renderRow("Company Name", "companyName", "Enter Company Name")}
            {renderRow("Address", "address", "Enter Address", handleChange, 200)}
            {renderRow("Area", "area", "Enter Area")}
            {renderRow("Pin Code", "pincode", "Enter 6 digit pincode", handleDigitOnly, 6)}
            {renderRow("Mobile Number", "mobileNumber", "Enter 10 digit mobile number", handleDigitOnly, 10)}
            {renderRow("Shop Name", "shopName", "Enter Shop Name")}
            {renderRow("PAN Number", "panNumber", "Enter PAN Number", handleNoSpaces, 10)}

            {/* BUTTONS */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 text-white text-sm rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1] hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="px-8 py-2 text-white text-sm rounded-full bg-gradient-to-b from-[#666] to-[#444] hover:opacity-90 transition disabled:opacity-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IserveuOnboarding;
