"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const EditMDSCommission = () => {
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

  /* ================= VENDORS ================= */
  useEffect(() => {
    setVendorList([
      { vendor_id: "1", vendor_name: "Airtel" },
      { vendor_id: "2", vendor_name: "Jio" },
      { vendor_id: "3", vendor_name: "VI" },
      { vendor_id: "4", vendor_name: "BSNL" },
      { vendor_id: "ALL", vendor_name: "ALL" },
    ]);
  }, []);

  /* ================= INPUT ================= */
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
      value ? rows.push(index) : (rows = rows.filter((i) => i !== index));
      setSelectedRows([...new Set(rows)]);
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

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!formData.apiId.trim()) {
      alert("Please enter MDS ID");
      return false;
    }
    if (!formData.service) {
      alert("Please select Operator");
      return false;
    }
    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
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
          client_id: "CL001",
          api_id: formData.apiId,
          vendor_id: "1",
          vendor_name: "Airtel",
          minamount: "10",
          maxamount: "100",
          comm_type: "P",
          commission: "2.5",
          charge_type: "P",
          charge: "0.5",
        },
        {
          slab_id: "2",
          client_id: "CL001",
          api_id: formData.apiId,
          vendor_id: "2",
          vendor_name: "Jio",
          minamount: "10",
          maxamount: "200",
          comm_type: "R",
          commission: "1.0",
          charge_type: "R",
          charge: "0.25",
        },
      ];

      setPricingData(mockData);
      setMessage("Pricing data loaded successfully");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP ================= */
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

    alert("Commission Updated Successfully");
    setShowOtpVerification(false);
    setOtp("");
    handleSubmit();
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

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[220px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module > Edit MDS Commission / Charge"
        description="Modify commission & charge slabs"
      />

      <PageCard>

        {message && (
          <div className="mb-3 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Row label="MDS ID :">
            <input
              name="apiId"
              value={formData.apiId}
              onChange={handleInputChange}
              placeholder="Enter MDS ID"
              className={inputClass}
              disabled={loading}
            />
          </Row>

          <Row label="Select Operator :">
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
          </Row>

          <div className="text-center mt-4">
            <button type="submit" disabled={loading} className="capsButton px-8">
              {loading ? "Loading..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="ml-3 capsButtonSecondary px-6"
            >
              Clear
            </button>
          </div>

        </form>

        {/* ================= TABLE ================= */}
        {pricingData.length > 0 && (
          <div className="mt-6">

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-[#4fa2c2] text-white text-center">
                  <tr>
                    <th className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      /> S.N
                    </th>
                    <th className="border">Client ID</th>
                    <th className="border">MDS ID</th>
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
                          selected ? "bg-[#eaf5fa]" : ""
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
                          /> {index + 1}
                        </td>

                        <td className="border">{item.client_id}</td>
                        <td className="border">{item.api_id}</td>

                        <td className="border">
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

                        <td className="border">
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

                        <td className="border">
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
              <button onClick={handleSendOtp} className="capsButtonWarning px-5">
                Send OTP
              </button>
            </div>

          </div>
        )}

        {/* ================= OTP BOX ================= */}
        {showOtpVerification && (
          <div className="border-t mt-5 pt-5">

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
                  className="capsButtonSuccess px-5 disabled:opacity-50"
                >
                  Verify OTP
                </button>

                <button
                  onClick={handleSendOtp}
                  className="capsButtonSecondary px-5"
                >
                  Resend OTP
                </button>
              </div>
            </div>

          </div>
        )}

      </PageCard>
    </div>
  );
};

export default EditMDSCommission;
