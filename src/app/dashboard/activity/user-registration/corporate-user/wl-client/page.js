"use client";

import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function WhiteLabelRegistration({ categoryList = [], stateList = [] }) {
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
  const [loading, setLoading] = useState(false);

  /* 🔒 Disable right click */
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
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

  const digitOnly = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
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
      alert("Invalid Email Address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessage("White Label Registration Submitted Successfully.");
    }, 1000);
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

  const renderRow = (label, field) => (
    <div className="grid grid-cols-[200px_10px_1fr] items-center">
      <label className="text-sm font-semibold text-right">
        {label}
      </label>
      <div className="text-center">:</div>
      {field}
    </div>
  );

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="White Label Registration"
        description="Register new white label client"
      />

      <PageCard>
        {message && (
          <p className="text-center text-green-600 font-semibold mb-4 text-sm">
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            {renderRow(
              "Client Type",
              <select
                name="clientType"
                value={form.clientType}
                onChange={handleChange}
                className="capsInput"
              >
                <option value="-1">Select</option>
                <option value="TEP">TEP</option>
              </select>
            )}

            {renderRow(
              "Category",
              <select
                name="categoryName"
                value={form.categoryName}
                onChange={handleChange}
                className="capsInput"
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
              "Company Name",
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "Domain",
              <input
                name="domainName"
                value={form.domainName}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "Help Desk Email",
              <input
                name="agentPanelHelpEmailId"
                value={form.agentPanelHelpEmailId}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "Transaction Email",
              <input
                name="agentCellEmailId"
                value={form.agentCellEmailId}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "Help Desk Mobile",
              <input
                name="agentPanelHelpMobileNo1"
                maxLength="10"
                value={form.agentPanelHelpMobileNo1}
                onKeyDown={digitOnly}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "User Info URL",
              <input
                name="careUrl"
                value={form.careUrl}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "State",
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="capsInput"
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
              "District",
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
                className="capsInput"
              >
                <option value="">Select</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            )}

            {renderRow(
              "City",
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "Address",
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "Service By Zone",
              <input
                name="serviceByZone"
                value={form.serviceByZone}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "SMS Template",
              <input
                name="smsTemplate"
                maxLength="6"
                value={form.smsTemplate}
                onChange={handleChange}
                className="capsInput"
              />
            )}

            {renderRow(
              "Logo Image",
              <input
                type="file"
                name="headerHomeImage"
                onChange={handleChange}
                className="capsInput"
              />
            )}

            <div className="text-center pt-3 space-x-4">
              <button
                onClick={submitForm}
                disabled={loading}
                className="capsButton px-10"
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>

              <button
                onClick={resetForm}
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

export default WhiteLabelRegistration;
