"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const BulkBillingCashback = () => {
  const [formData, setFormData] = useState({
    actionType: "select",
    file: null,
    fileName: "",
  });

  const [serviceList, setServiceList] = useState([]);
  const [recordList, setRecordList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    const mockServices = [
      { Service_Name: "Mobile Recharge" },
      { Service_Name: "DTH Recharge" },
      { Service_Name: "Electricity Bill" },
      { Service_Name: "Water Bill" },
      { Service_Name: "Gas Bill" },
      { Service_Name: "Broadband Bill" },
    ];
    setServiceList(mockServices);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileName = file.name;
      const fileExt = fileName.split(".").pop().toLowerCase();
      const allowedExtensions = ["xlsx", "xls", "csv"];

      if (!allowedExtensions.includes(fileExt)) {
        setFileError(
          "Please select Excel format only (.xlsx, .xls, .csv)"
        );
        setFormData({ ...formData, file: null, fileName: "" });
        e.target.value = "";
        return;
      }

      setFileError("");
      setFormData({ ...formData, file, fileName });
    }
  };

  const validateForm = () => {
    if (!formData.actionType || formData.actionType === "select") {
      alert("Please select Action Type");
      return false;
    }

    if (!formData.file) {
      alert("Please select File");
      return false;
    }

    return true;
  };

  const handleDownloadFormat = () => {
    const link = document.createElement("a");
    link.href =
      "https://portal.bankit.in:9090/Demo/Links/CashbackFormat.xlsx";
    link.download = "CashbackFormat.xlsx";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setMessage("");
      setRecordList([]);
      setStatusColor("");

      const formDataToSend = new FormData();
      formDataToSend.append("actionType", formData.actionType);
      formDataToSend.append("file1", formData.file);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockResponse = {
        status: "00",
        message: "File processed successfully! All records updated.",
        recordList: [
          { id: "USER001", action: "Credit", amount: "500.00", status: "00", message: "Success" },
          { id: "USER002", action: "Credit", amount: "750.00", status: "00", message: "Success" },
          { id: "USER003", action: "Debit", amount: "250.00", status: "00", message: "Success" },
          { id: "USER004", action: "Credit", amount: "1000.00", status: "01", message: "User not found" },
          { id: "USER005", action: "Credit", amount: "300.00", status: "00", message: "Success" },
        ],
      };

      setMessage(mockResponse.message);
      setStatusColor(mockResponse.status === "00" ? "success" : "error");
      setRecordList(mockResponse.recordList);

      setFormData({
        actionType: "select",
        file: null,
        fileName: "",
      });

      const fileInput = document.getElementById("form_file");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setMessage("Error uploading file.");
      setStatusColor("error");
      setRecordList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      actionType: "select",
      file: null,
      fileName: "",
    });
    setMessage("");
    setRecordList([]);
    setStatusColor("");
    setFileError("");

    const fileInput = document.getElementById("form_file");
    if (fileInput) fileInput.value = "";
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-start justify-center mb-3">
      <label className="w-[220px] text-right text-sm font-semibold pt-1">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module > Bulk Billing / Cashback"
        description="Upload billing or cashback Excel file"
      />

      <PageCard>

        {message && (
          <div
            className={`text-center text-sm font-medium mb-4 px-3 py-2 rounded-md ${
              statusColor === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Row label="Action Type :">
            <select
              name="actionType"
              value={formData.actionType}
              onChange={handleInputChange}
              className={inputClass}
              disabled={loading}
            >
              <option value="select">Select</option>
              {serviceList.map((service, index) => (
                <option key={index} value={service.Service_Name}>
                  {service.Service_Name}
                </option>
              ))}
            </select>
          </Row>

          <Row label="Select File :">
            <>
              <input
                type="file"
                id="form_file"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
                className={inputClass}
                disabled={loading}
              />

              {fileError && (
                <div className="text-red-600 text-xs mt-1">
                  {fileError}
                </div>
              )}

              {formData.fileName && !fileError && (
                <div className="text-green-600 text-xs mt-1">
                  {formData.fileName}
                </div>
              )}

              <div className="mt-2 text-xs text-gray-500">
                .xls / .xlsx / .csv Format Only
                <br />
                <button
                  type="button"
                  onClick={handleDownloadFormat}
                  className="text-blue-600 hover:underline"
                >
                  Click To Download Format
                </button>
              </div>
            </>
          </Row>

          <div className="text-center mt-4 space-x-3">
            <button type="submit" disabled={loading} className="capsButton px-8">
              {loading ? "Uploading..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="capsButtonSecondary px-8"
            >
              Clear
            </button>
          </div>

        </form>

        {recordList.length > 0 && (
          <>
            <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm mt-6">
              Processing Results
            </div>

            <table className="w-full mt-3 border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">S.N.</th>
                  <th className="border px-2 py-1">USER ID</th>
                  <th className="border px-2 py-1">ACTION</th>
                  <th className="border px-2 py-1">AMOUNT</th>
                  <th className="border px-2 py-1">MESSAGE</th>
                </tr>
              </thead>
              <tbody>
                {recordList.map((record, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{index + 1}</td>
                    <td className="border px-2 py-1">{record.id}</td>
                    <td className="border px-2 py-1">{record.action}</td>
                    <td className="border px-2 py-1">
                      ₹ {parseFloat(record.amount).toFixed(2)}
                    </td>
                    <td
                      className={`border px-2 py-1 font-medium ${
                        record.status === "00"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center gap-6 mt-3 text-sm font-semibold">
              <div>Total: {recordList.length}</div>
              <div className="text-green-600">
                Success: {recordList.filter((r) => r.status === "00").length}
              </div>
              <div className="text-red-600">
                Failed: {recordList.filter((r) => r.status !== "00").length}
              </div>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default BulkBillingCashback;
