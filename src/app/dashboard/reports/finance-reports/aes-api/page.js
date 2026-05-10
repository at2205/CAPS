"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function FrAESAPI() {
  const [formData, setFormData] = useState({
    reportOf: "",
    from: "",
    to: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!formData.reportOf) return "Please select report type";
    if (!formData.from || !formData.to) return "Select date range";
    if (formData.from > formData.to) return "Invalid date range";
    return "";
  };

  // ================= GET ENDPOINT =================
  const getEndpoint = () => {
    switch (formData.reportOf) {
      case "Account Adjustment":
        return endpoints.reportsEndpoints.getAccountAdjustmentReport;

      case "Client Deposit":
        return endpoints.reportsEndpoints.getDistributorJournalReport;

      case "Journal - EGEN":
        return endpoints.reportsEndpoints.getAgentJournalReport;

      default:
        return "";
    }
  };
  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const err = validateForm();
    if (err) return setError(err);

    setError("");
    setLoading(true);

    try {
      const endpoint = getEndpoint();

      if (!endpoint) {
        setError("Invalid report type selected");
        setLoading(false);
        return;
      }

      // Prepare payload
      const payload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType"),
        portalId: localStorage.getItem("portalId"),
        reportOf: formData.reportOf,
        fromDate: formData.from,
        toDate: formData.to,
      };

      const params = new URLSearchParams();
      params.append("adminUserFormBean", JSON.stringify(payload));

      const response = await urlencodedInstance.post(endpoint, params);

      console.log("Report API Response →", response.data);

      if (!response.data || !response.data.data) {
        setError("No data found");
        setLoading(false);
        return;
      }

      // ===== Convert API Data to Excel =====
      const worksheet = XLSX.utils.json_to_sheet(response.data.data);
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
    } catch (error) {
      console.log("Report Error:", error);

      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to generate report");
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="Finance Report" description="EGEN Report Download" />

      <PageCard>
        <div className="max-w-2xl mx-auto space-y-6">
          <FormRow label="Report Type">
            <select
              name="reportOf"
              value={formData.reportOf}
              onChange={handleChange}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              <option value="Account Adjustment">Account Adjustment</option>
              <option value="Client Deposit">Client Deposit</option>
              <option value="Journal - EGEN">Journal - EGEN</option>
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

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin h-6 w-6 border-4 border-[#4c95b3] border-t-transparent rounded-full"></div>
            </div>
          )}

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

// ================= FORM ROW =================
const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium whitespace-nowrap">{label}</div>
    <div className="text-center">:</div>
    <div>{children}</div>
  </div>
);

export default FrAESAPI;
