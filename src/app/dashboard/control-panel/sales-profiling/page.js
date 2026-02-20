"use client";
import React, { useState, useEffect } from "react";

const SalesProfiling = () => {
  const [activeTab, setActiveTab] = useState("add");

  const [formData, setFormData] = useState({
    name: "",
    aesId: "",
    agentId: "",
    mobileNo: "",
    emailId: "",
    distributorId: "",
    fulldistributorId: "",
  });

  const [disableData, setDisableData] = useState({
    personName: "-1",
  });

  const [salesPersonList, setSalesPersonList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSalesPersonList([
      "JOHN DOE - BS-001",
      "JANE SMITH - BS-002",
      "ROBERT JOHNSON - BS-003",
    ]);
  }, []);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((p) => ({
      ...p,
      [name]: name === "name" ? value.toUpperCase() : value,
    }));
  };

  const handleDigitOnly = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validateAddForm = () => {
    const {
      name,
      aesId,
      agentId,
      mobileNo,
      emailId,
      distributorId,
      fulldistributorId,
    } = formData;

    if (!name.trim()) return alert("Enter Sales Person Name"), false;
    if (!aesId.trim()) return alert("Enter Employee BS ID"), false;
    if (!agentId.trim()) return alert("Enter Agent ID"), false;

    if (!/^[6-9]\d{9}$/.test(mobileNo))
      return alert("Enter valid 10 digit Mobile Number"), false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId))
      return alert("Enter valid Email ID"), false;

    if (!distributorId.trim())
      return alert("Enter Distributor ID"), false;

    if (!fulldistributorId.trim())
      return alert("Enter Full Distributor ID"), false;

    return true;
  };

  const validateDisableForm = () => {
    if (disableData.personName === "-1")
      return alert("Select Sales Person to disable"), false;

    return true;
  };

  /* ---------------- RESET ---------------- */
  const resetForm = () => {
    setFormData({
      name: "",
      aesId: "",
      agentId: "",
      mobileNo: "",
      emailId: "",
      distributorId: "",
      fulldistributorId: "",
    });

    setDisableData({ personName: "-1" });
    setMessage("");
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "add" && !validateAddForm()) return;
    if (activeTab === "disable" && !validateDisableForm()) return;

    try {
      setLoading(true);
      setMessage("");

      await new Promise((r) => setTimeout(r, 1200));

      setMessage(
        activeTab === "add"
          ? "Sales person added successfully!"
          : "Sales person disabled successfully!"
      );

      resetForm();
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ROW HELPER ---------------- */
  const renderRow = (
    label,
    name,
    placeholder,
    handler = handleChange
  ) => (
    <div className="flex items-center mb-4">
      <label className="w-[260px] text-right pr-4 font-semibold text-sm">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        name={name}
        value={formData[name]}
        onChange={handler}
        placeholder={placeholder}
        disabled={loading}
        className="w-[280px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6]"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start">

      {/* MAIN CARD */}
      <div className="w-[900px] mt-10 bg-white rounded-xl shadow-sm border border-gray-200">

        {/* HEADER */}
        <div className="text-white font-bold text-[18px] px-6 py-4 rounded-t-xl bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6]">
          Sales Profiling
        </div>

        {/* BODY */}
        <div className="py-10">

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="w-1/2 mx-auto mb-6 text-center bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
              {message}
            </div>
          )}

          {/* TAB BUTTONS */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("add")}
              className={`px-8 py-2 text-sm text-white rounded-md transition ${
                activeTab === "add"
                  ? "bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1]"
                  : "bg-gray-400"
              }`}
            >
              Add New
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("disable")}
              className={`px-8 py-2 text-sm text-white rounded-md transition ${
                activeTab === "disable"
                  ? "bg-gradient-to-b from-[#666] to-[#444]"
                  : "bg-gray-400"
              }`}
            >
              Disable
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center">

            {activeTab === "add" ? (
              <>
                {renderRow("Sales Person Name", "name", "Enter name")}
                {renderRow("Employee BS ID", "aesId", "Enter ID", handleDigitOnly)}
                {renderRow("Employee Agent ID", "agentId", "Enter Agent ID")}
                {renderRow("Mobile Number", "mobileNo", "Enter Mobile", handleDigitOnly)}
                {renderRow("Email ID", "emailId", "Enter Email")}
                {renderRow("Distributor ID", "distributorId", "Enter Distributor ID", handleDigitOnly)}
                {renderRow("Full Distributor ID", "fulldistributorId", "Enter Full ID")}
              </>
            ) : (
              <div className="flex items-center mb-6">
                <label className="w-[260px] text-right pr-4 font-semibold text-sm">
                  Select Sales Person
                </label>

                <select
                  value={disableData.personName}
                  onChange={(e) =>
                    setDisableData({ personName: e.target.value })
                  }
                  className="w-[280px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6]"
                >
                  <option value="-1">Select</option>
                  {salesPersonList.map((p, i) => (
                    <option key={i}>{p}</option>
                  ))}
                </select>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex justify-center gap-8 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-2 text-white text-sm rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1] flex items-center gap-2 disabled:opacity-50"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                Submit
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="px-10 py-2 text-white text-sm rounded-full bg-gradient-to-b from-[#666] to-[#444] disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalesProfiling;
