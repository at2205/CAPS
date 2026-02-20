"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";

function AEPSRetailerWisePipeChange() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [tableData, setTableData] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [userId, setUserId] = useState("");
  const [portalId, setPortalId] = useState("");
  const [token, setToken] = useState("");

  /* ✅ Safe localStorage access */
  useEffect(() => {
    setUserId(localStorage.getItem("secondUserId") || "");
    setPortalId(localStorage.getItem("adminUserPortalId") || "");
    setToken(localStorage.getItem("token") || "");
  }, []);

  const isExcelFile = (file) =>
    file && (file.name.endsWith(".xls") || file.name.endsWith(".xlsx"));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (isExcelFile(file)) {
      setSelectedFile(file);
      setMessage("");
      setError("");
    } else {
      setSelectedFile(null);
      setMessage("Please select a valid .xls or .xlsx file");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    if (!selectedFile) {
      setMessage("Please select a file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("ExcelFile", selectedFile);
    formData.append(
      "adminUserFormBean",
      JSON.stringify({ userId, portalId })
    );

    try {
      const response = await fetch(`${baseUrl}/controlP/SetCutOffMgt`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === "0") {
        setSuccess("File processed successfully.");
        setTableData(result?.cutoffamount || []);
      } else {
        setError(
          "Something went wrong, please try again with a valid excel sheet."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Error while uploading file, please login again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[170px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Vendor Management &gt; AEPS Retailer Wise Pipe Change
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleFileUpload}>

            <Row label="API ID :">
              <input type="text" required className={inputClass} />
            </Row>

            <Row label="Main Service :">
              <input type="text" required className={inputClass} />
            </Row>

            <Row label="Sub Service :">
              <select className={inputClass}>
                <option>AEPS-CASH WITHDRAWL</option>
                <option>AEPS-BALANCE ENQUIRY</option>
                <option>AEPS-CASH DEPOSIT</option>
                <option>AEPS-MINI STATEMENT</option>
                <option>AEPS-AADHAR PAY</option>
              </select>
            </Row>

            <Row label="Pipe Name :">
              <select className={inputClass}>
                <option>DEFAULT PIPE</option>
                <option>FINO BANK</option>
                <option>ICICI BANK / FING PAY</option>
                <option>FINO SMART BANK / PAYSPRINT</option>
                <option>YES BANK</option>
                <option>AIRTEL BANK</option>
                <option>ISERVE U BANK</option>
              </select>
            </Row>

            <Row label="Select File :">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm"
              />
            </Row>

            <div className="text-center mb-2 text-xs text-gray-500">
              .xls / .xlsx Format Only
            </div>

            <div className="text-center mb-3">
              <a
                href="https://portal.bankit.in:9090/Demo/Links/AgentPipeChange_V.xlsx"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Click To Download Format
              </a>
            </div>

            {/* STATUS */}
            <div className="text-center min-h-[28px]">
              {message && (
                <p className="text-red-500 text-sm">{message}</p>
              )}
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}
              {loading && (
                <p className="text-gray-500 text-sm animate-pulse">
                  Processing...
                </p>
              )}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                Submit
              </button>
            </div>

          </form>

          {/* TABLE */}
          {Array.isArray(tableData) && tableData.length > 0 && (
            <div className="mt-6">
              <Table
                dataSource={tableData}
                bordered
                size="small"
                pagination={false}
                rowKey={(row, i) => i}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AEPSRetailerWisePipeChange;
