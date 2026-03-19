"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Online Sign Agreement Report"
        description="View and download agreement transaction reports"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="text-center mb-4 font-medium">
            {message}
          </div>
        )}

        {/* FILTER FORM */}
        <div className="flex justify-center mb-6">
          <form onSubmit={handleDownload}>

            {/* FROM DATE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                From
              </label>

              <div className="text-center">:</div>

              <input
                type="date"
                value={fromDate}
                max={today}
                onChange={(e) => setFromDate(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* TO DATE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                To
              </label>

              <div className="text-center">:</div>

              <input
                type="date"
                value={toDate}
                max={today}
                onChange={(e) => setToDate(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                type="submit"
                className="capsButton min-w-[120px]"
              >
                Download
              </button>
            </div>

          </form>
        </div>

        {/* TABLE */}
        {showTable && (
          <>
            <div className="capsColor text-center py-2 font-semibold rounded-md mb-4">
              Transaction Report
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">
                <thead>
                  <tr className="capsColor">
                    <th className="p-2 border">Agent ID</th>
                    <th className="p-2 border">Txn Date</th>
                    <th className="p-2 border">Txn Time</th>
                    <th className="p-2 border">Txn ID</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Service Provider</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{row.agentId}</td>
                      <td className="p-2 border">{row.date}</td>
                      <td className="p-2 border">{row.time}</td>
                      <td className="p-2 border">{row.txnId}</td>
                      <td className="p-2 border">{row.amount}</td>
                      <td className="p-2 border font-semibold">
                        {row.status}
                      </td>
                      <td className="p-2 border">
                        {row.serviceProvider}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default OnlineSignAgreementReport;
