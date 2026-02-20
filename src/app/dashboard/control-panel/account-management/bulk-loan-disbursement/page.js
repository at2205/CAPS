"use client";

import React, { useState } from "react";
import axios from "axios";

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
          { agentId: "AGENT001", amount: "₹10,000.00", status: "00", message: "Disbursement successful" },
          { agentId: "AGENT002", amount: "₹15,000.00", status: "00", message: "Disbursement successful" },
          { agentId: "AGENT003", amount: "₹5,000.00", status: "01", message: "Insufficient balance" },
          { agentId: "AGENT004", amount: "₹20,000.00", status: "00", message: "Disbursement successful" },
          { agentId: "AGENT005", amount: "₹12,500.00", status: "02", message: "Account not found" },
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

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[850px] bg-white rounded-xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#4c95b3] to-[#3d89a6] text-white text-center font-bold text-lg py-3">
          Bulk Loan Disbursement
        </div>

        <div className="p-6">

          {/* MESSAGE */}
          {message && (
            <div
              className={`text-center text-sm font-medium mb-4 px-3 py-2 rounded-md ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <table className="w-[70%] mt-4 text-sm">
                <tbody>

                  <tr className="h-14">
                    <td className="text-right font-semibold w-[35%]">
                      Select File
                    </td>
                    <td className="text-center w-[5%]">:</td>
                    <td className="w-[60%]">
                      <input
                        id="form_file"
                        name="file1"
                        type="file"
                        onChange={handleFileChange}
                        accept=".xls,.xlsx,.csv"
                        disabled={loading}
                        className="w-full border rounded-md px-2 py-1 text-sm disabled:bg-gray-100"
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
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={loading || !selectedFile}
                className="bg-[#4FA2C2] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#3d8daa] transition disabled:opacity-50 mr-2"
              >
                {loading ? "Processing..." : "Submit"}
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
                      <td className={`border px-2 py-1 ${getMessageClass(record.status)}`}>
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
        </div>
      </div>
    </div>
  );
};

export default LoanDisbursement;
