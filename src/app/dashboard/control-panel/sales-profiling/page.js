"use client";
import React, { useState, useEffect } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-center mb-3">
      <label className="w-[240px] text-right pr-4 text-sm font-semibold">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="w-[280px]">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Control Panel > Sales Profiling"
        description="Add or disable sales person profiles"
      />

      <PageCard>
        {/* MESSAGE */}
        {message && (
          <div className="w-1/2 mx-auto mb-4 text-center bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm">
            {message}
          </div>
        )}

        {/* TAB BUTTONS */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("add")}
            className={`capsButton px-8 ${
              activeTab === "add"
                ? ""
                : "opacity-50 bg-gray-400"
            }`}
          >
            Add New
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("disable")}
            className={`capsButtonSecondary px-8 ${
              activeTab === "disable"
                ? ""
                : "opacity-50 bg-gray-400"
            }`}
          >
            Disable
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          {activeTab === "add" ? (
            <>
              <Row label="Sales Person Name">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  disabled={loading}
                  className={inputClass}
                />
              </Row>

              <Row label="Employee BS ID">
                <input
                  name="aesId"
                  value={formData.aesId}
                  onChange={handleDigitOnly}
                  placeholder="Enter Employee ID"
                  disabled={loading}
                  className={inputClass}
                />
              </Row>

              <Row label="Employee Agent ID">
                <input
                  name="agentId"
                  value={formData.agentId}
                  onChange={handleChange}
                  placeholder="Enter Agent ID"
                  disabled={loading}
                  className={inputClass}
                />
              </Row>

              <Row label="Mobile Number">
                <input
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleDigitOnly}
                  placeholder="Enter Mobile Number"
                  disabled={loading}
                  className={inputClass}
                />
              </Row>

              <Row label="Email ID">
                <input
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  placeholder="Enter Email ID"
                  disabled={loading}
                  className={inputClass}
                />
              </Row>

              <Row label="Distributor ID">
                <input
                  name="distributorId"
                  value={formData.distributorId}
                  onChange={handleDigitOnly}
                  placeholder="Enter Distributor ID"
                  disabled={loading}
                  className={inputClass}
                />
              </Row>

              <Row label="Full Distributor ID">
                <input
                  name="fulldistributorId"
                  value={formData.fulldistributorId}
                  onChange={handleChange}
                  placeholder="Enter Full Distributor ID"
                  disabled={loading}
                  className={inputClass}
                />
              </Row>
            </>
          ) : (
            <Row label="Select Sales Person">
              <select
                value={disableData.personName}
                onChange={(e) =>
                  setDisableData({ personName: e.target.value })
                }
                disabled={loading}
                className={inputClass}
              >
                <option value="-1">Select</option>
                {salesPersonList.map((p, i) => (
                  <option key={i}>{p}</option>
                ))}
              </select>
            </Row>
          )}

          {/* BUTTONS */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="capsButton px-10"
            >
              {loading ? "Processing..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="capsButtonSecondary px-10"
            >
              Cancel
            </button>
          </div>
        </form>
      </PageCard>
    </div>
  );
};

export default SalesProfiling;
