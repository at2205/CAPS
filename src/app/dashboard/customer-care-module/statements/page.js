"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const Statements = () => {
  const [statementType, setStatementType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userId, setUserId] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleView = () => {
    if (!statementType) return alert("Please select Statement Type");
    if (!fromDate || !toDate)
      return alert("Please select From & To Date");
    if (!userId) return alert("Please enter User ID");

    setShowTable(true);
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      {/* HEADER CARD */}
      <CapsCard
        title="Statement - Channel"
        description="View and download user account statements"
      />

      {/* FORM CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div className="grid gap-4 w-full max-w-3xl">

            {/* Statement Type */}
            <FormRow label="Statement Type">
              <select
                className="capsSelect w-80"
                value={statementType}
                onChange={(e) => setStatementType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="admin">Admin Account Statement</option>
                <option value="mds">MD Account Statement</option>
                <option value="ds">Distributor Account Statement</option>
                <option value="agent">Agent Account Statement</option>
                <option value="aeps">AEPS Statement</option>
                <option value="loan">Loan Report</option>
                <option value="card">Card Statement</option>
              </select>
            </FormRow>

            {/* From Date */}
            <FormRow label="From Date">
              <input
                type="date"
                className="capsInput  w-80"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </FormRow>

            {/* To Date */}
            <FormRow label="To Date">
              <input
                type="date"
                className="capsInput  w-80"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </FormRow>

            {/* User ID */}
            <FormRow label="User ID">
              <input
                type="text"
                className="capsInput w-80"
                placeholder="Full User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </FormRow>

            {/* Buttons */}
            <div className="flex justify-center gap-6 pt-4">
              <button
                onClick={handleView}
                className="capsButton min-w-[140px]"
              >
                View
              </button>

              <button className="border border-[#4fa2c2] text-[#226b88] px-6 py-1 rounded-lg hover:bg-[#def6ff] transition">
                Download
              </button>
            </div>

          </div>
        </div>

        {/* TABLE */}
        {showTable && (
          <div className="mt-8 border rounded-lg overflow-x-auto bg-white">

            <div className="chcolor1 text-white font-semibold px-4 py-2">
              Results
            </div>

            <table className="w-full text-sm text-center">

              <thead className="bg-[#def6ff]">
                <tr>
                  <th className="border p-2">S.No</th>
                  <th className="border">Date</th>
                  <th className="border">User ID</th>
                  <th className="border">Service</th>
                  <th className="border">Txn ID</th>
                  <th className="border">Amount</th>
                  <th className="border">Status</th>
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">

                    <td className="p-2">{i}</td>
                    <td>2024-01-01</td>

                    <td className="font-bold capsText">
                      {userId}
                    </td>

                    <td>
                      {statementType.toUpperCase()}
                    </td>

                    <td>TXN00{i}</td>

                    <td className="font-bold text-green-600">
                      ₹1000
                    </td>

                    <td>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        Success
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </PageCard>
    </div>
  );
};

/* Reusable Form Row */
const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-3">
    <label className="text-right font-medium">{label}</label>
    <div className="text-center">:</div>
    <div>{children}</div>
  </div>
);

export default Statements;
