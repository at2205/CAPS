"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAPICommission = () => {
  const [formData, setFormData] = useState({
    apiId: "",
    service: "",
  });

  const [pricingData, setPricingData] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [edits, setEdits] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setVendorList([
      { vendor_id: "1", vendor_name: "Airtel" },
      { vendor_id: "2", vendor_name: "Jio" },
      { vendor_id: "3", vendor_name: "VI" },
      { vendor_id: "4", vendor_name: "BSNL" },
      { vendor_id: "ALL", vendor_name: "ALL" },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handlePricingChange = (index, field, value) => {
    const updated = { ...edits };
    if (!updated[index]) updated[index] = {};
    updated[index][field] = value;
    setEdits(updated);

    if (field === "selected") {
      let rows = [...selectedRows];
      if (value && !rows.includes(index)) rows.push(index);
      if (!value) rows = rows.filter((i) => i !== index);
      setSelectedRows(rows);
    }
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    const updated = {};
    const rows = [];

    pricingData.forEach((_, index) => {
      updated[index] = { selected: checked };
      if (checked) rows.push(index);
    });

    setEdits(updated);
    setSelectedRows(rows);
  };

  const validateForm = () => {
    if (!formData.apiId.trim()) {
      alert("Please enter API ID");
      return false;
    }
    if (!formData.service) {
      alert("Please select Operator");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setMessage("");
      setPricingData([]);
      setEdits({});
      setSelectedRows([]);
      setSelectAll(false);
      setShowOtpVerification(false);

      await new Promise((res) => setTimeout(res, 800));

      const mockData = [
        {
          slab_id: "1",
          api_id: formData.apiId,
          vendor_id: "1",
          vendor_name: "Airtel",
          minamount: "10",
          maxamount: "100",
          comm_type: "P",
          commission: "1.5",
          charge_type: "P",
          charge: "0.3",
        },
        {
          slab_id: "2",
          api_id: formData.apiId,
          vendor_id: "2",
          vendor_name: "Jio",
          minamount: "10",
          maxamount: "200",
          comm_type: "R",
          commission: "0.8",
          charge_type: "R",
          charge: "0.2",
        },
      ];

      setPricingData(mockData);
      setMessage("API Commission/Charge data loaded successfully");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one row");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);

    alert("OTP Sent Successfully");
    setShowOtpVerification(true);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter 6 digit OTP");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);

    alert("API Commission Updated Successfully");
    setShowOtpVerification(false);
    setOtp("");
    handleSubmit({ preventDefault: () => {} });
  };

  const handleClear = () => {
    setFormData({ apiId: "", service: "" });
    setPricingData([]);
    setMessage("");
    setEdits({});
    setSelectedRows([]);
    setSelectAll(false);
    setShowOtpVerification(false);
    setOtp("");
  };

  const validateFloatInput = (value) => /^\d*\.?\d*$/.test(value);

  const handleFloatChange = (index, field, value) => {
    if (validateFloatInput(value)) {
      handlePricingChange(index, field, value);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const labelClass = "text-sm font-semibold text-right";
  const rowClass = "grid grid-cols-[220px_20px_1fr] items-center mb-3";

  return (
    <div className="max-w-4xl mx-auto py-6">
      {message && (
        <div className="mb-3 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
          {message}
        </div>
      )}

      <div className="rounded-xl shadow-xl border border-gray-300">
        {/* HEADER */}
        <div className="text-white font-bold text-lg px-5 py-3 rounded-t-xl bg-gradient-to-r from-[#4fa0c2] to-[#3a89a6]">
          Edit API Commission / Charge
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <form onSubmit={handleSubmit}>
            {/* API ID */}
            <div className={rowClass}>
              <div className={labelClass}>API ID</div>
              <div>:</div>
              <input
                name="apiId"
                value={formData.apiId}
                onChange={handleInputChange}
                placeholder="Enter API ID"
                className={inputClass}
                disabled={loading}
              />
            </div>

            {/* OPERATOR */}
            <div className={rowClass}>
              <div className={labelClass}>Select Operator</div>
              <div>:</div>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={inputClass}
                disabled={loading}
              >
                <option value="">Select Operator</option>
                {vendorList.map((v) => (
                  <option key={v.vendor_id} value={v.vendor_id}>
                    {v.vendor_name}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-1.5 text-sm text-white rounded-full bg-gradient-to-r from-[#4fa0c2] to-[#3a89a6]"
              >
                {loading ? "Loading..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="ml-3 px-5 py-1.5 text-sm rounded-full bg-gray-500 text-white"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        {pricingData.length > 0 && (
          <div className="px-6 pb-6">
            <hr className="mb-4" />

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr className="text-center font-semibold">
                    <th className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />{" "}
                      S.N
                    </th>
                    <th className="border">API ID</th>
                    <th className="border">Vendor</th>
                    <th className="border">Min</th>
                    <th className="border">Max</th>
                    <th className="border">Comm Type</th>
                    <th className="border">Commission</th>
                    <th className="border">Charge Type</th>
                    <th className="border">Charge</th>
                  </tr>
                </thead>

                <tbody>
                  {pricingData.map((item, index) => {
                    const row = edits[index] || {};
                    const selected = selectedRows.includes(index);

                    return (
                      <tr
                        key={index}
                        className={`text-center ${
                          selected ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="border">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={(e) =>
                              handlePricingChange(
                                index,
                                "selected",
                                e.target.checked
                              )
                            }
                          />{" "}
                          {index + 1}
                        </td>

                        <td className="border">{item.api_id}</td>

                        <td className="border px-1">
                          <select
                            className="border rounded px-2 py-1"
                            value={row.vendorId || item.vendor_id}
                            onChange={(e) =>
                              handlePricingChange(
                                index,
                                "vendorId",
                                e.target.value
                              )
                            }
                          >
                            {vendorList.map((v) => (
                              <option key={v.vendor_id} value={v.vendor_id}>
                                {v.vendor_name}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="border">{item.minamount}</td>
                        <td className="border">{item.maxamount}</td>

                        <td className="border">
                          <select
                            className="border rounded px-2 py-1"
                            value={row.commMark || item.comm_type}
                            onChange={(e) =>
                              handlePricingChange(
                                index,
                                "commMark",
                                e.target.value
                              )
                            }
                          >
                            <option value="P">P</option>
                            <option value="R">R</option>
                          </select>
                        </td>

                        <td className="border px-1">
                          <input
                            className="border rounded px-2 py-1 w-20"
                            value={row.commission || item.commission}
                            onChange={(e) =>
                              handleFloatChange(
                                index,
                                "commission",
                                e.target.value
                              )
                            }
                          />
                        </td>

                        <td className="border">
                          <select
                            className="border rounded px-2 py-1"
                            value={row.chargeMark || item.charge_type}
                            onChange={(e) =>
                              handlePricingChange(
                                index,
                                "chargeMark",
                                e.target.value
                              )
                            }
                          >
                            <option value="P">P</option>
                            <option value="R">R</option>
                          </select>
                        </td>

                        <td className="border px-1">
                          <input
                            className="border rounded px-2 py-1 w-20"
                            value={row.charge || item.charge}
                            onChange={(e) =>
                              handleFloatChange(index, "charge", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-3">
              <button
                onClick={handleSendOtp}
                className="px-4 py-1.5 text-sm rounded-full bg-yellow-500 text-white"
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {/* OTP */}
        {showOtpVerification && (
          <div className="border-t px-6 py-5">
            <div className="max-w-sm mx-auto">
              <input
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6 digit OTP"
                className={inputClass}
              />

              <div className="flex justify-center gap-3 mt-3">
                <button
                  disabled={otp.length !== 6}
                  onClick={handleVerifyOtp}
                  className="px-4 py-1.5 text-sm rounded-full bg-green-600 text-white disabled:opacity-50"
                >
                  Verify OTP
                </button>

                <button
                  onClick={handleSendOtp}
                  className="px-4 py-1.5 text-sm rounded-full bg-gray-500 text-white"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAPICommission;
