"use client";

import React, { useState } from "react";
import axios from "axios";

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

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[850px] bg-white rounded-xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#4c95b3] to-[#3d89a6] text-white text-center font-bold text-lg py-3">
          Bulk Commission / TDS
        </div>

        <div className="p-6">

          {/* MESSAGE */}
          {message && (
            <div className="bg-blue-100 text-blue-700 text-sm text-center px-3 py-2 rounded-md mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <table className="w-[70%] mt-4 text-sm">
                <tbody>

                  <tr className="h-10">
                    <td className="text-right font-semibold w-[35%]">
                      Action Type
                    </td>
                    <td className="text-center w-[5%]">:</td>
                    <td className="w-[60%]">
                      <select
                        name="actionType"
                        value={formData.actionType}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2] disabled:bg-gray-100"
                      >
                        {actionTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  <tr className="h-14">
                    <td className="text-right font-semibold">
                      Select File
                    </td>
                    <td className="text-center">:</td>
                    <td>
                      <input
                        type="file"
                        id="form_file"
                        onChange={handleFileChange}
                        disabled={loading}
                        accept=".xlsx,.xls,.csv"
                        className="w-full border rounded-md px-2 py-1 text-sm disabled:bg-gray-100"
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
                          className="text-[#4FA2C2] hover:underline"
                        >
                          Click To Download Format
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4FA2C2] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#3d8daa] transition disabled:opacity-50 mr-2"
              >
                {loading ? "Uploading..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="bg-gray-500 text-white text-sm px-5 py-1.5 rounded-md hover:bg-gray-600 transition disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>

          {/* PROCESSING STATUS */}
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
        </div>
      </div>
    </div>
  );
};

export default BulkCommissionTDS;
