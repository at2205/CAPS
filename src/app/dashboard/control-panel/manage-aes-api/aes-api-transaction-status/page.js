"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const TransactionStatusCheck = () => {
  const [tranNo, setTranNo] = useState("");
  const [transactionData, setTransactionData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setTranNo(e.target.value.replace(/\D/g, ""));
  };

  const validateForm = () => {
    if (!tranNo.trim()) {
      alert("Please enter API Transaction Number.");
      return false;
    }
    if (tranNo.length < 14 || tranNo.length > 20) {
      alert("Please enter valid API Transaction Id (14–20 digits)");
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
      setTransactionData([]);

      // 🔴 MOCK DATA
      const mockData = [
        {
          apiId: "API001",
          apiTranId: "APITXN20240112001",
          cusTranId: "CUSTXN001",
          dateOfRecharge: "2024-01-12",
          timeOfRecharge: "14:30:25",
          Operator: "Airtel",
          accountNoMobileNo: "9876543210",
          amount: "500.00",
          status: "Success",
        },
        {
          apiId: "API002",
          apiTranId: "APITXN20240112002",
          cusTranId: "CUSTXN002",
          dateOfRecharge: "2024-01-12",
          timeOfRecharge: "15:45:10",
          Operator: "Jio",
          accountNoMobileNo: "8765432109",
          amount: "1000.00",
          status: "Pending",
        },
      ];

      setTransactionData(mockData);
      setMessage(`Found ${mockData.length} transaction(s)`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTranNo("");
    setTransactionData([]);
    setMessage("");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const primaryBtn =
    "capsButton px-6 py-1.5 text-sm disabled:opacity-50";

  const secondaryBtn =
    "px-6 py-1.5 text-sm rounded-md text-white bg-gray-500 hover:opacity-90 disabled:opacity-50";

  const Row = ({ label, children }) => (
    <div className="flex items-start justify-center mb-3">
      <label className="w-[220px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="API Transaction Status Check"
        description="Search transaction details using API transaction number"
      />

      <PageCard>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <Row label="API Transaction Number :">
            <>
              <input
                type="text"
                value={tranNo}
                onChange={handleInputChange}
                maxLength={20}
                disabled={loading}
                className={inputClass}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter 14–20 digit transaction number
              </p>
            </>
          </Row>

          <div className="flex justify-center gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className={primaryBtn}
            >
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className={secondaryBtn}
            >
              Clear
            </button>
          </div>
        </form>

        {/* MESSAGE */}
        {message && (
          <div className="text-center text-green-600 text-sm mt-3">
            {message}
          </div>
        )}

        {/* TABLE */}
        {transactionData.length > 0 && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-[#4fa2c2] text-white">
                <tr>
                  <th className="border px-2 py-1">AES API ID</th>
                  <th className="border px-2 py-1">API Txn ID</th>
                  <th className="border px-2 py-1">Customer Txn ID</th>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Time</th>
                  <th className="border px-2 py-1">Operator</th>
                  <th className="border px-2 py-1">Connection No</th>
                  <th className="border px-2 py-1">Amount</th>
                  <th className="border px-2 py-1">Status</th>
                </tr>
              </thead>

              <tbody>
                {transactionData.map((r, i) => (
                  <tr key={i} className="text-center">
                    <td className="border px-2 py-1">{r.apiId}</td>
                    <td className="border px-2 py-1">{r.apiTranId}</td>
                    <td className="border px-2 py-1">{r.cusTranId}</td>
                    <td className="border px-2 py-1">{r.dateOfRecharge}</td>
                    <td className="border px-2 py-1">{r.timeOfRecharge}</td>
                    <td className="border px-2 py-1">{r.Operator}</td>
                    <td className="border px-2 py-1">{r.accountNoMobileNo}</td>
                    <td className="border px-2 py-1">
                      ₹ {parseFloat(r.amount).toFixed(2)}
                    </td>
                    <td className="border px-2 py-1">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-3 text-sm font-semibold">
              Total Records : {transactionData.length}
            </div>
          </div>
        )}

      </PageCard>
    </div>
  );
};

export default TransactionStatusCheck;
