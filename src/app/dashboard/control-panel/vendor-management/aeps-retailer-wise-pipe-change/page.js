"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  /* ✅ Safe localStorage */
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
        headers: { Authorization: token },
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

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      {/* HEADER */}
      <CapsCard
        title="AEPS Retailer Wise Pipe Change"
        description="Upload excel sheet to update AEPS retailer pipe mapping"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <form onSubmit={handleFileUpload}>

              <FieldRow label="API ID">
                <input type="text" required className="capsInput" />
              </FieldRow>

              <FieldRow label="Main Service">
                <input type="text" required className="capsInput" />
              </FieldRow>

              <FieldRow label="Sub Service">
                <select className="capsInput">
                  <option>AEPS-CASH WITHDRAWL</option>
                  <option>AEPS-BALANCE ENQUIRY</option>
                  <option>AEPS-CASH DEPOSIT</option>
                  <option>AEPS-MINI STATEMENT</option>
                  <option>AEPS-AADHAR PAY</option>
                </select>
              </FieldRow>

              <FieldRow label="Pipe Name">
                <select className="capsInput">
                  <option>DEFAULT PIPE</option>
                  <option>FINO BANK</option>
                  <option>ICICI BANK / FING PAY</option>
                  <option>FINO SMART BANK / PAYSPRINT</option>
                  <option>YES BANK</option>
                  <option>AIRTEL BANK</option>
                  <option>ISERVE U BANK</option>
                </select>
              </FieldRow>

              <FieldRow label="Select File">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="capsInput"
                />
              </FieldRow>

              {/* FORMAT NOTE */}
              <div className="text-center text-xs text-gray-500 mb-2">
                .xls / .xlsx Format Only
              </div>

              {/* DOWNLOAD */}
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
              <div className="text-center text-sm min-h-[24px]">
                {message && <p className="text-red-500">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
                {loading && <p className="text-gray-500">Processing...</p>}
              </div>

              {/* BUTTON */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="capsButton min-w-[140px]"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>

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
      </PageCard>
    </div>
  );
}

export default AEPSRetailerWisePipeChange;
