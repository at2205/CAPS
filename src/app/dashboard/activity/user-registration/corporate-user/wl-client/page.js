"use client";
import React, { useEffect, useState } from "react";

const WhiteLabelRegistration = ({ categoryList = [], stateList = [] }) => {
  const [form, setForm] = useState({
    clientType: "-1",
    categoryName: "-1",
    companyName: "",
    domainName: "",
    agentPanelHelpEmailId: "",
    agentPanelHelpMobileNo1: "",
    agentCellEmailId: "",
    careUrl: "",
    state: "select",
    district: "",
    city: "",
    address: "",
    serviceByZone: "",
    smsTemplate: "",
    headerHomeImage: null,
  });

  const [districts, setDistricts] = useState([]);
  const [message, setMessage] = useState("");

  /* 🔒 Disable right click */
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
      alert("No right-click allowed");
    };
    document.addEventListener("contextmenu", disableRightClick);
    return () =>
      document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  const populateCities = async (state) => {
    if (!state || state === "select") return;
    try {
      const res = await fetch(`/distDetails.action?state=${state}`, {
        method: "POST",
      });
      const data = await res.json();
      setDistricts(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (name === "state") populateCities(value);
  };

  const isValidEmail = (email) =>
    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);

  const submitForm = () => {
    const requiredFields = [
      "clientType",
      "categoryName",
      "companyName",
      "domainName",
      "agentPanelHelpEmailId",
      "agentPanelHelpMobileNo1",
      "agentCellEmailId",
      "careUrl",
      "headerHomeImage",
    ];

    for (let field of requiredFields) {
      if (!form[field] || form[field] === "-1") {
        alert("Your Form is Incomplete.");
        return;
      }
    }

    if (
      !isValidEmail(form.agentPanelHelpEmailId) ||
      !isValidEmail(form.agentCellEmailId)
    ) {
      alert("Invalid Email Address");
      return;
    }

    setMessage("White Label Registration Submitted Successfully");
  };

  const resetForm = () => {
    setForm({
      clientType: "-1",
      categoryName: "-1",
      companyName: "",
      domainName: "",
      agentPanelHelpEmailId: "",
      agentPanelHelpMobileNo1: "",
      agentCellEmailId: "",
      careUrl: "",
      state: "select",
      district: "",
      city: "",
      address: "",
      serviceByZone: "",
      smsTemplate: "",
      headerHomeImage: null,
    });
    setDistricts([]);
    setMessage("");
  };

  /* ================= UI ================= */
  const renderRow = (label, field) => (
    <div className="mb-3 flex items-start">
      <label className="w-[240px] text-right font-semibold mr-4 pt-2">
        {label} :
      </label>
      {field}
    </div>
  );

  const inputStyle =
    "w-[300px] border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5fa9c7]";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start">
      <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          White Label Registration
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {message && (
            <div className="mb-4 text-center bg-green-100 text-green-700 border border-green-300 rounded-md py-2">
              {message}
            </div>
          )}

          {renderRow(
            "Client Type *",
            <select
              name="clientType"
              value={form.clientType}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="-1">Select</option>
              <option value="TEP">TEP</option>
            </select>
          )}

          {renderRow(
            "Category *",
            <select
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="-1">Select</option>
              {categoryList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {renderRow(
            "Company Name *",
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "Domain *",
            <input
              name="domainName"
              value={form.domainName}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "Help Desk Email *",
            <input
              name="agentPanelHelpEmailId"
              value={form.agentPanelHelpEmailId}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "Transaction Email *",
            <input
              name="agentCellEmailId"
              value={form.agentCellEmailId}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "Help Desk Mobile *",
            <input
              name="agentPanelHelpMobileNo1"
              maxLength="10"
              value={form.agentPanelHelpMobileNo1}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "User Info URL *",
            <input
              name="careUrl"
              value={form.careUrl}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "State *",
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="select">Select</option>
              {stateList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}

          {renderRow(
            "District *",
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="">Select</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          )}

          {renderRow(
            "City *",
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "Address *",
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "Service By Zone *",
            <input
              name="serviceByZone"
              value={form.serviceByZone}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "SMS Template *",
            <input
              name="smsTemplate"
              maxLength="6"
              value={form.smsTemplate}
              onChange={handleChange}
              className={inputStyle}
            />
          )}

          {renderRow(
            "Logo Image *",
            <input
              type="file"
              name="headerHomeImage"
              onChange={handleChange}
              className={`${inputStyle} file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-[#4c95b3] file:text-white file:rounded-md`}
            />
          )}

          {/* BUTTONS */}
          <div className="text-center mt-6">
            <button
              onClick={submitForm}
              className="px-8 py-2 text-white rounded-[16px] shadow mr-3 bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
            >
              Submit
            </button>

            <button
              onClick={resetForm}
              className="px-8 py-2 rounded-[16px] shadow bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelRegistration;
