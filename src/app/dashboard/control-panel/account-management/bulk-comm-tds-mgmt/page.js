"use client";

import React, { useState } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const BulkCommissionTDS = () => {
  const [formData, setFormData] = useState({
    actionType: "select",
    file: null,
    fileName: "",
  });

  const [pendingList, setPendingList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

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
      "/pages/controlPanel/AccountManagement/CommisionTDS/BulkCommTdsFileFormat.xlsx";
    link.download = "BulkCommTdsFileFormat.xlsx";
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
      setPendingList([]);

      const formDataToSend = new FormData();
      formDataToSend.append("actionType", formData.actionType);
      formDataToSend.append("file1", formData.file);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockResponse = {
        message:
          "File uploaded successfully. Processing bulk operations...",
        pendingList: [
          "Processing row 1...",
          "Processing row 2...",
          "Processing row 3...",
          "Processing row 4...",
          "Processing completed successfully",
        ],
      };

      setMessage(mockResponse.message);
      setPendingList(mockResponse.pendingList);

      setFormData({
        actionType: "select",
        file: null,
        fileName: "",
      });

      const fileInput = document.getElementById("form_file");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setMessage("Error uploading file.");
      setPendingList([]);
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
    setPendingList([]);
    setFileError("");

    const fileInput = document.getElementById("form_file");
    if (fileInput) fileInput.value = "";
  };

  const actionTypeOptions = [
    { value: "select", label: "Select" },
    { value: "Commision", label: "Commission" },
    { value: "TDS", label: "TDS" },
    { value: "Joining-TB", label: "Bulk TB" },
    { value: "Wallet Management", label: "Wallet Management" },
    { value: "Referral CashBack", label: "Referral CashBack" },
    { value: "loanDisbursal", label: "Loan Disbursal" },
    { value: "Manual-WC Charge", label: "Manual-WC Charge" },
    {
      value: "Wallet Balance Bulk Uploading",
      label: "Wallet Balance Bulk Uploading",
    },
  ];

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
        title="Customer Care Module > Bulk Commission / TDS"
        description="Upload file for bulk commission or TDS processing"
      />

      <PageCard>

        {message && (
          <div className="bg-blue-100 text-blue-700 text-sm text-center px-3 py-2 rounded-md mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Row label="Action Type :">
            <select
              name="actionType"
              value={formData.actionType}
              onChange={handleInputChange}
              disabled={loading}
              className={inputClass}
            >
              {actionTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
                disabled={loading}
                accept=".xlsx,.xls,.csv"
                className={inputClass}
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

        {pendingList.length > 0 && (
          <>
            <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm mt-6">
              Processing Status
            </div>

            <table className="w-full mt-3 border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map((status, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-1">
                      {status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default BulkCommissionTDS;
