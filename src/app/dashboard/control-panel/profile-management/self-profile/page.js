"use client";
import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const SelfProfile = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    companyType: "",
    companyName: "",
    emailId: "",
    mobileNo: "",
    panNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const checkAvailability = (field) => {
    alert(`Checking availability for ${field}`);
  };

  const renderInputRow = (label, name, type = "text") => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="capsInput"
      />
    </div>
  );

  const renderSelectRow = (label, name, options) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="capsInput"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const renderCheckRow = (label, name) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div className="flex items-center gap-2">
        <input
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="capsInput"
        />
        <span
          onClick={() => checkAvailability(label)}
          className="text-red-500 text-xs cursor-pointer whitespace-nowrap"
        >
          Check Availability
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Self Profile"
        description="Update your personal and PAN details"
      />

      {/* MAIN CARD */}
      <PageCard>

        <form onSubmit={handleSubmit}>

          <div className="flex justify-center">
            <div>

              {/* PERSONAL FIELDS */}
              {renderInputRow("First Name", "firstName")}
              {renderInputRow("Last Name", "lastName")}
              {renderInputRow("Date of Birth", "dob", "date")}

              {renderSelectRow("Gender", "gender", [
                "Male",
                "Female",
              ])}

              {renderSelectRow("Company / Firm Type", "companyType", [
                "Proprietorship",
                "Partnership",
                "Private Limited",
                "Limited",
                "NGO",
              ])}

              {renderInputRow("Company / Shop Name", "companyName")}

              {renderCheckRow("Email ID", "emailId")}
              {renderCheckRow("Mobile Number", "mobileNo")}

              {/* PAN */}
              <div className="mt-6">
                {renderInputRow("PAN Number", "panNo")}
              </div>

              {/* BUTTON */}
              <div className="text-center mt-6">
                <button type="submit" className="capsButton min-w-[140px]">
                  Submit
                </button>
              </div>

            </div>
          </div>

        </form>

      </PageCard>
    </div>
  );
};

export default SelfProfile;
