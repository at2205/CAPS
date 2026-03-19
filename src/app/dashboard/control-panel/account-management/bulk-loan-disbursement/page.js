"use client";

import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const LoanDisbursement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [recordList, setRecordList] = useState([]);
  const [downloadUrl] = useState(
    "https://portal.bankit.in:9090/Demo/Links/loanDisbursement.xlsx"
  );

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateForm = () => {
    if (!selectedFile) {
      alert("Please select the File.");
      return false;
    }

    const fileName = selectedFile.name;
    const ext = fileName.split(".").pop().toLowerCase();

    if (ext !== "xlsx" && ext !== "xls" && ext !== "csv") {
      alert("Please select the file in excel format only.");
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
      setRecordList([]);

      const formData = new FormData();
      formData.append("file1", selectedFile);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockResponse = {
        status: "00",
        message: "File uploaded and processed successfully!",
        recordList: [
          {
            agentId: "AGENT001",
            amount: "₹10,000.00",
            status: "00",
            message: "Disbursement successful",
          },
          {
            agentId: "AGENT002",
            amount: "₹15,000.00",
            status: "00",
            message: "Disbursement successful",
          },
          {
            agentId: "AGENT003",
            amount: "₹5,000.00",
            status: "01",
            message: "Insufficient balance",
          },
          {
            agentId: "AGENT004",
            amount: "₹20,000.00",
            status: "00",
            message: "Disbursement successful",
          },
          {
            agentId: "AGENT005",
            amount: "₹12,500.00",
            status: "02",
            message: "Account not found",
          },
        ],
      };

      setMessage(mockResponse.message);
      setMessageType(mockResponse.status === "00" ? "success" : "error");
      setRecordList(mockResponse.recordList);
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setMessage("");
    setRecordList([]);

    const fileInput = document.getElementById("form_file");
    if (fileInput) fileInput.value = "";
  };

  const getMessageClass = (status) => {
    return status === "00"
      ? "text-green-600 font-semibold"
      : "text-red-600 font-semibold";
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
        title="Account Management > Bulk Loan Disbursement"
        description="Upload file to process bulk loan disbursement"
      />

      <PageCard>
        {/* MESSAGE */}
        {message && (
          <div
            className={`text-center text-sm font-medium mb-4 px-3 py-2 rounded-md ${
              messageType === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Row label="Select File :">
            <>
              <input
                id="form_file"
                name="file1"
                type="file"
                onChange={handleFileChange}
                accept=".xls,.xlsx,.csv"
                disabled={loading}
                className={`${inputClass} disabled:bg-gray-100`}
              />

              <div className="mt-2 text-xs text-gray-500">
                .xls / .xlsx / .csv Format Only
                <br />
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4FA2C2] hover:underline"
                >
                  Click To Download Format
                </a>
              </div>
            </>
          </Row>

          <div className="text-center mt-4 space-x-3">
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="capsButton px-8 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit"}
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

        {/* RESULTS */}
        {recordList.length > 0 && (
          <>
            <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm mt-6">
              Disbursement Results
            </div>

            <table className="w-full mt-3 border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">S.N.</th>
                  <th className="border px-2 py-1">AGENT ID</th>
                  <th className="border px-2 py-1">AMOUNT</th>
                  <th className="border px-2 py-1">MESSAGE</th>
                </tr>
              </thead>
              <tbody>
                {recordList.map((record, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{index + 1}</td>
                    <td className="border px-2 py-1">{record.agentId}</td>
                    <td className="border px-2 py-1">{record.amount}</td>
                    <td
                      className={`border px-2 py-1 ${getMessageClass(
                        record.status
                      )}`}
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

export default LoanDisbursement;
