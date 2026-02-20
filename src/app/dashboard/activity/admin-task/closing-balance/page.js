"use client";

import React, { useState } from "react";

const ClosingBalance = () => {
  const [formData, setFormData] = useState({
    dob: "",
    userType: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 min-h-[300px] rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Closing Balance
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <div className="flex justify-center">
            <form className="w-[520px]" onSubmit={handleSubmit}>

              {/* DATE */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Date of Birth :
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* USER TYPE */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Type of User :
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
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
              <div className="mb-6 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  User Id :
                </label>
                <input
                  type="text"
                  name="userId"
                  placeholder="Enter short ID only"
                  value={formData.userId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* BUTTON */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosingBalance;
