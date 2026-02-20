"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function TrChannel() {
  const [formData, setFormData] = useState({
    reportType: "",
    from: "",
    to: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.reportType) return "Please select report type";
    if (!formData.from || !formData.to)
      return "Please select date range";
    if (formData.from > formData.to)
      return "Invalid date range";
    return "";
  };

  const handleView = () => {
    const err = validateForm();
    if (err) return setError(err);

    setError("");
    setLoading(true);

    setTimeout(() => {
      setTableData([
        {
          id: "AG48659",
          txnDate: "06 Feb 2026",
          txnTime: "10:09:22",
          connectionNumber: "8630504806",
          operator: "JIO",
          txnID: "256M2602061009200837",
          txnAmount: "209.00",
          operatorID: "256M2602061009200837",
          commission: "1.50",
          bankitFee: "0.00",
          txnStatus: "Pending",
          serviceprovider: "AESAPI",
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const handleDownload = () => {
    if (!tableData.length)
      return setError("No data to download");

    const headers = Object.keys(tableData[0]).join(",");
    const rows = tableData
      .map((row) => Object.values(row).join(","))
      .join("\n");

    const csv = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transaction_report.csv";
    link.click();
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Transaction Report"
        description="Channel Report View & Download"
      />
          <PageCard>

            {/* FORM */}
            <div className="max-w-2xl mx-auto space-y-5">

              <FormRow label="Report Type">
                <select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  className="capsSelect w-80"
                >
                  <option value="">Select</option>
                  <option value="Live Recharge Transaction">
                    Live Recharge Transaction
                  </option>
                </select>
              </FormRow>

              <FormRow label="From Date">
                <input
                  type="date"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="capsInput w-80"
                />
              </FormRow>

              <FormRow label="To Date">
                <input
                  type="date"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="capsInput w-80"
                />
              </FormRow>

              {error && (
                <p className="text-red-600 text-center text-sm">
                  {error}
                </p>
              )}

              {loading && (
                <div className="text-center">
                  <div className="animate-spin h-6 w-6 border-4 border-[#4c95b3] border-t-transparent rounded-full mx-auto"></div>
                </div>
              )}

              <div className="text-center pt-2 space-x-3">
                <button
                  onClick={handleView}
                  className="capsButton"
                >
                  View
                </button>

                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Download
                </button>
              </div>

            </div>

            {/* TABLE */}
            {tableData.length > 0 && (
              <div className="overflow-x-auto mt-8 border rounded-lg">
                <table className="min-w-full text-sm text-center border">

                  <thead className="chcolor1 text-white">
                    <tr>
                      {[
                        "Agent ID",
                        "Txn Date",
                        "Txn Time",
                        "Connection Number",
                        "Operator",
                        "Txn ID",
                        "Txn Amount",
                        "Operator ID",
                        "Commission",
                        "Bankit Fee",
                        "Txn Status",
                        "Service Provider",
                      ].map((h) => (
                        <th key={h} className="border px-3 py-2">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {tableData.map((row, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="border px-2 py-1">{row.id}</td>
                        <td className="border px-2 py-1">{row.txnDate}</td>
                        <td className="border px-2 py-1">{row.txnTime}</td>
                        <td className="border px-2 py-1">{row.connectionNumber}</td>
                        <td className="border px-2 py-1">{row.operator}</td>
                        <td className="border px-2 py-1">{row.txnID}</td>
                        <td className="border px-2 py-1 text-right">{row.txnAmount}</td>
                        <td className="border px-2 py-1">{row.operatorID}</td>
                        <td className="border px-2 py-1">{row.commission}</td>
                        <td className="border px-2 py-1">{row.bankitFee}</td>
                        <td className="border px-2 py-1">{row.txnStatus}</td>
                        <td className="border px-2 py-1">{row.serviceprovider}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

          </PageCard>
        </div>
      
  );
}

/* PERFECT ALIGN ROW */
const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium">{label}</div>
    <div className="text-center">:</div>
    <div>{children}</div>
  </div>
);

export default TrChannel;
