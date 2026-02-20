"use client";

import React, { useState } from "react";

const OnlineSignAgreementReport = () => {
  const today = new Date().toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);

  // dummy data (API later)
  const data = [
    {
      agentId: "AG123",
      date: "2025-01-10",
      time: "12:30",
      txnId: "TXN98765",
      amount: "500",
      status: "SUCCESS",
      serviceProvider: "DemoProvider",
    },
  ];

  const handleDownload = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate) {
      alert("Please select date range");
      return;
    }

    console.log("From:", fromDate, "To:", toDate);
    setMessage("Report generated (frontend only)");
    setShowTable(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Transaction Report &gt; Channel
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {message && (
            <div className="text-center mb-4 text-[#2c3e50] font-medium">
              {message}
            </div>
          )}

          {/* FILTER FORM */}
          <div className="flex justify-center mb-6">
            <form className="w-[520px]" onSubmit={handleDownload}>

              {/* FROM DATE */}
              <div className="mb-4 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  From :
                </label>
                <input
                  type="date"
                  value={fromDate}
                  max={today}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* TO DATE */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  To :
                </label>
                <input
                  type="date"
                  value={toDate}
                  max={today}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                >
                  Download
                </button>
              </div>
            </form>
          </div>

          {/* TABLE */}
          {showTable && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-center text-sm">
                <thead className="bg-[#4c95b3] text-white">
                  <tr>
                    <th className="border p-2">Agent ID</th>
                    <th className="border p-2">Txn Date</th>
                    <th className="border p-2">Txn Time</th>
                    <th className="border p-2">Txn ID</th>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Service Provider</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border p-2">{row.agentId}</td>
                      <td className="border p-2">{row.date}</td>
                      <td className="border p-2">{row.time}</td>
                      <td className="border p-2">{row.txnId}</td>
                      <td className="border p-2">{row.amount}</td>
                      <td className="border p-2 font-bold text-green-600">
                        {row.status}
                      </td>
                      <td className="border p-2">
                        {row.serviceProvider}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OnlineSignAgreementReport;
