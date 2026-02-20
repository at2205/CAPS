"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function FrChannel() {
  const [formData, setFormData] = useState({
    reportType: "",
    from: "",
    to: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.reportType) return "Please select report type";
    if (!formData.from || !formData.to) return "Select date range";
    if (formData.from > formData.to) return "Invalid date range";
    return "";
  };

  const handleSubmit = () => {
    const err = validateForm();
    if (err) return setError(err);

    setError("");
    setLoading(true);

    setTimeout(() => {
      const excelData = [
        {
          ReportType: formData.reportType,
          FromDate: formData.from,
          ToDate: formData.to,
          Status: "Generated",
        },
      ];

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const fileData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(fileData, "finance_report.xlsx");

      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Finance Report"
        description="Channel Report Download"
      />

   
          <PageCard>

            <div className="max-w-2xl mx-auto space-y-6">

              <FormRow label="Report Type">
                <select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  className="capsSelect w-80"
                >
                  <option value="">Select</option>
                  <option value="Account Adjustment">
                    Account Adjustment
                  </option>
                  <option value="Journal - Agent">
                    Journal - Agent
                  </option>
                  <option value="Journal - Distributor">
                    Journal - Distributor
                  </option>
                  <option value="Journal - MDS">
                    Journal - MDS
                  </option>
                  <option value="Journal - Portal">
                    Journal - Portal
                  </option>
                  <option value="Rail Ticket Cancellation Report">
                    Rail Ticket Cancellation Report
                  </option>
                  <option value="TDR Report">
                    TDR Report
                  </option>
                </select>
              </FormRow>

              {/* From Date */}
              <FormRow label="From Date">
                <input
                  type="date"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="capsInput w-80"
                />
              </FormRow>

              {/* To Date */}
              <FormRow label="To Date">
                <input
                  type="date"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="capsInput w-80"
                />
              </FormRow>

              {/* Error */}
              {error && (
                <p className="text-red-600 text-center text-sm">
                  {error}
                </p>
              )}

              {/* Loader */}
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-4 border-[#4c95b3] border-t-transparent rounded-full"></div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="capsButton min-w-[220px]"
                >
                  Submit & Download Excel
                </button>
              </div>

            </div>

          </PageCard>
        </div>
    
  );
}

/* PERFECT ALIGN ROW */
const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium whitespace-nowrap">
      {label}
    </div>
    <div className="text-center">:</div>
    <div>{children}</div>
  </div>
);

export default FrChannel;
