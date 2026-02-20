"use client";
import React, { useState } from "react";

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
  };

  const checkAvailability = (field) => {
    alert(`Checking availability for ${field}`);
  };

  const renderRow = (label, name, type = "text") => (
    <tr>
      <td className="text-right font-semibold w-[35%]">{label}</td>
      <td className="w-[5%] text-center">:</td>
      <td className="w-[60%]">
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA2C2]"
        />
      </td>
    </tr>
  );

  const renderCheckRow = (label, name) => (
    <tr>
      <td className="text-right font-semibold">{label}</td>
      <td className="text-center">:</td>
      <td>
        <div className="flex items-center">
          <input
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="w-[300px] border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA2C2]"
          />
          <span
            onClick={() => checkAvailability(label)}
            className="text-red-500 text-xs ml-2 cursor-pointer whitespace-nowrap"
          >
            Check Availability
          </span>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex justify-center mt-4">
      <div className="w-[850px] rounded-xl shadow-sm overflow-hidden bg-white border border-gray-200">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-2 text-[18px] bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Self Profile
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          
          {/* PERSONAL DETAILS */}
          <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl mb-3">
            Personal Details
          </div>

          <div className="flex justify-center">
            <table className="w-[80%] text-sm">
              <tbody className="space-y-2">
                {renderRow("First Name", "firstName")}
                {renderRow("Last Name", "lastName")}
                {renderRow("Date of Birth", "dob", "date")}

                <tr>
                  <td className="text-right font-semibold">Gender</td>
                  <td className="text-center">:</td>
                  <td>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA2C2]"
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className="text-right font-semibold">
                    Company / Firm Type
                  </td>
                  <td className="text-center">:</td>
                  <td>
                    <select
                      name="companyType"
                      value={form.companyType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA2C2]"
                    >
                      <option value="">Select</option>
                      <option>Proprietorship</option>
                      <option>Partnership</option>
                      <option>Private Limited</option>
                      <option>Limited</option>
                      <option>NGO</option>
                    </select>
                  </td>
                </tr>

                {renderRow("Company / Shop Name", "companyName")}
                {renderCheckRow("Email ID", "emailId")}
                {renderCheckRow("Mobile Number", "mobileNo")}
              </tbody>
            </table>
          </div>

          {/* PAN DETAILS */}
          <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl mt-6 mb-3">
            PAN Details
          </div>

          <div className="flex justify-center">
            <table className="w-[70%] text-sm">
              <tbody>
                {renderRow("PAN Number", "panNo")}
              </tbody>
            </table>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-5 py-1.5 text-white text-sm rounded-md bg-[#4FA2C2] hover:opacity-90 shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelfProfile;
