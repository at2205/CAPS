"use client";
import React, { useState } from "react";

const SalesProfiling = () => {
  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    aesId: "",
    agentId: "",
    mobileNo: "",
    emailId: "",
    distributorId: "",
    fulldistributorId: "",
    personName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    if (!formData.name) return alert("Please enter sales person name.");
    if (!formData.aesId) return alert("Please enter Employee BS ID.");
    if (!formData.agentId) return alert("Please enter Full Agent ID.");
    if (!/^[6-9][0-9]{9}$/.test(formData.mobileNo))
      return alert("Please enter valid mobile number.");
    if (!formData.emailId) return alert("Please enter Email ID.");
    if (!formData.distributorId)
      return alert("Please enter Distributor Id.");
    if (!formData.fulldistributorId)
      return alert("Please enter Full Distributor Id.");

    alert("Add New Sales Person – UI OK ✅ (API later)");
  };

  const handleDisable = () => {
    if (!formData.personName)
      return alert("Please select sales person.");
    alert("Disable Sales Person – UI OK ✅ (API later)");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      aesId: "",
      agentId: "",
      mobileNo: "",
      emailId: "",
      distributorId: "",
      fulldistributorId: "",
      personName: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start">

      <div className="w-[900px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Sales Profiling
        </div>

        {/* BODY */}
        <div className="px-10 py-6 flex justify-center">
          <div className="w-[600px]">

            {/* MODE SWITCH */}
            <div className="text-center mb-6 space-x-8">
              <label className="font-semibold cursor-pointer">
                <input
                  type="radio"
                  className="mr-2"
                  checked={mode === "add"}
                  onChange={() => setMode("add")}
                />
                Add New
              </label>

              <label className="font-semibold cursor-pointer">
                <input
                  type="radio"
                  className="mr-2"
                  checked={mode === "disable"}
                  onChange={() => setMode("disable")}
                />
                Disable
              </label>
            </div>

            {/* ADD MODE */}
            {mode === "add" && (
              <>
                {[
                  ["Sales Person Name", "name"],
                  ["Employee BS ID", "aesId"],
                  ["Employee Agent ID", "agentId"],
                  ["Mobile Number", "mobileNo"],
                  ["Email ID", "emailId"],
                  ["Distributor ID (Numeric)", "distributorId"],
                  ["Full Distributor ID", "fulldistributorId"],
                ].map(([label, name], i) => (
                  <div key={i} className="mb-4 flex items-center">
                    <label className="w-1/2 text-right pr-4 font-semibold">
                      {label} :
                    </label>

                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5fa9c7]"
                    />
                  </div>
                ))}

                <div className="text-center mt-6 space-x-4">
                  <button
                    onClick={handleAdd}
                    className="px-8 py-2 text-white rounded-[16px] shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                  >
                    ADD
                  </button>

                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* DISABLE MODE */}
            {mode === "disable" && (
              <>
                <div className="mb-6 flex items-center">
                  <label className="w-1/2 text-right pr-4 font-semibold">
                    Select Sales Person :
                  </label>

                  <select
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5fa9c7]"
                  >
                    <option value="">
                      --- Select Sales Person ---
                    </option>
                    <option value="Person1">Person1</option>
                    <option value="Person2">Person2</option>
                  </select>
                </div>

                <div className="text-center mt-6 space-x-4">
                  <button
                    onClick={handleDisable}
                    className="px-8 py-2 bg-red-600 text-white rounded-[16px] shadow hover:bg-red-700 transition"
                  >
                    Disable
                  </button>

                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesProfiling;
