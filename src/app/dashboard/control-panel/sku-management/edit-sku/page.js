"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const EditSKU = () => {
  const [headerName, setHeaderName] = useState("Edit SKU");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [clientId, setClientId] = useState("");
  const [showRadio, setShowRadio] = useState(false);
  const [mode, setMode] = useState("");

  const [skuData, setSkuData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const [file, setFile] = useState(null);
  const [otpStep, setOtpStep] = useState(false);

  /* ================= HEADER NAME ================= */
  useEffect(() => {
    setHeaderName(sessionStorage.getItem("headerName") || "Edit SKU");
  }, []);

  /* ================= FETCH SKU DATA ================= */
  const fetchSKUData = async () => {
    if (!clientId) {
      alert("Please enter Client ID");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/api/getSKUData?clientId=${clientId}`
      );

      const formatted = (res.data || []).map((item, index) => ({
        key: index,
        ...item,
      }));

      setSkuData(formatted);
      setShowRadio(true);
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Invalid Client ID");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ROW ================= */
  const updateRow = (key, field, value) => {
    const updated = skuData.map((row) =>
      row.key === key ? { ...row, [field]: value } : row
    );
    setSkuData(updated);
  };

  /* ================= SEND OTP ================= */
  const sendOTP = async () => {
    if (selectedRowKeys.length === 0) {
      alert("Select rows first");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/api/sendOtp");

      alert("OTP sent successfully!");
      setOtpVisible(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/api/validateOtp", { otp });

      alert("OTP Verified!");
      submitUpdates();
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUBMIT UPDATES ================= */
  const submitUpdates = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:8080/api/updateSKUdata", skuData);

      alert("Updated Successfully!");
      setOtpVisible(false);
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EXCEL OTP ================= */
  const sendExcelOTP = async () => {
    if (!file) {
      alert("Select Excel File");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/sendUploadExcel",
        formData
      );

      alert("OTP sent successfully!");
      setOtpStep(true);
    } catch (err) {
      console.error(err);
      alert("Excel Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "S.N.",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    { title: "Main Service", dataIndex: "mainService" },
    { title: "Sub Service", dataIndex: "subService" },
    { title: "Category", dataIndex: "category" },
    { title: "SKU Name", dataIndex: "skuName" },
    {
      title: "Commission",
      dataIndex: "commission",
      render: (value, record) => (
        <input
          value={value}
          onChange={(e) =>
            updateRow(record.key, "commission", e.target.value)
          }
          className="border px-2 py-1 w-20 rounded"
        />
      ),
    },
    {
      title: "Charge",
      dataIndex: "charge",
      render: (value, record) => (
        <input
          value={value}
          onChange={(e) =>
            updateRow(record.key, "charge", e.target.value)
          }
          className="border px-2 py-1 w-20 rounded"
        />
      ),
    },
  ];

  /* ================= ROW SELECTION ================= */
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title={headerName}
        description="Manage SKU commissions & upload Excel"
      />

      <PageCard>

        {/* Loader / Message */}
        <div className="text-center mb-4 min-h-[24px]">
          {loading && (
            <p className="text-sm text-gray-500 animate-pulse">
              Loading...
            </p>
          )}
          {message && (
            <p className="text-sm text-red-500">{message}</p>
          )}
        </div>

        {/* ✅ CENTERED CLIENT ID SECTION */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 bg-[#f5fbfd] px-6 py-3 rounded-xl shadow-sm border border-[#d2ecf5]">
            <label className="font-semibold whitespace-nowrap">
              Client ID:
            </label>

            <input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="border px-3 py-1 rounded w-64"
              placeholder="Enter Client ID"
            />

            <button
              onClick={fetchSKUData}
              className="capsButton text-xs px-4 py-1"
            >
              Go
            </button>
          </div>
        </div>

        {/* Radio Buttons */}
        {showRadio && (
          <div className="flex justify-center gap-10 mb-5">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="mode"
                onChange={() => setMode("interface")}
              />{" "}
              Interface
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="mode"
                onChange={() => setMode("excel")}
              />{" "}
              Update into Excel
            </label>
          </div>
        )}

        {/* Excel Upload */}
        {mode === "excel" && (
          <div className="space-y-4 mb-6 text-center">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mx-auto"
            />

            {!otpStep ? (
              <button
                onClick={sendExcelOTP}
                className="capsButton text-xs px-4 py-1"
              >
                Send OTP
              </button>
            ) : (
              <div className="flex justify-center gap-3">
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border px-3 py-1 rounded"
                  maxLength={6}
                />

                <button
                  onClick={verifyOTP}
                  className="capsButton text-xs px-4 py-1"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        )}

        {/* SKU Table */}
        {mode === "interface" && (
          <>
            <Table
              rowSelection={rowSelection}
              dataSource={skuData}
              columns={columns}
              bordered
              size="small"
              pagination={false}
              scroll={{ x: "max-content" }}
            />

            <div className="flex justify-center gap-4 mt-5">
              <button
                onClick={sendOTP}
                className="capsButton text-xs px-5 py-1"
              >
                Send OTP
              </button>

              <button className="capsButton text-xs px-5 py-1 bg-gray-400">
                Reset
              </button>
            </div>

            {otpVisible && (
              <div className="flex justify-center gap-3 mt-4">
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border px-3 py-1 rounded"
                  maxLength={6}
                />

                <button
                  onClick={verifyOTP}
                  className="capsButton text-xs px-4 py-1"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </>
        )}

      </PageCard>
    </div>
  );
};

export default EditSKU;