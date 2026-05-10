"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

function FrChannel() {
  const [formData, setFormData] = useState({
    reportType: "",
    from: "",
    to: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Backend switch case mapping
  const reportTypeMap = {
    "Account Adjustment": "accountAdjustmentReport",
    "Journal - Agent": "agentJournalReport",
    "Journal - Distributor": "distributorJournalReport",
    "Journal - MDS": "mdJournalReport",
    "Journal - Portal": "portalJournalReport",
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Validation
  const validateForm = () => {
    if (!formData.reportType) return "Please select report type";

    if (!formData.from || !formData.to) return "Please select date range";

    if (formData.from > formData.to) return "Invalid date range";

    return "";
  };

  // Submit
  const handleSubmit = async () => {
    const err = validateForm();

    if (err) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: err,
      });
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType"),
        portalId: localStorage.getItem("portalId"),
        fromDate: formData.from,
        toDate: formData.to,
        reportOf: reportTypeMap[formData.reportType],
      };

      console.log("Payload:", payload);

      const params = new URLSearchParams();

      params.append("adminUserFormBean", JSON.stringify(payload));
      params.append("reportType", reportTypeMap[formData.reportType]);

      const response = await urlencodedInstance.post(
        endpoints.reportsEndpoints.getJournalReport,
        params.toString(),
      );

      console.log("Finance Report Response:", response.data);

      const resData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      const reportData = resData.accountStatement || [];

      if (!reportData.length) {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: "No data found for selected range",
        });
        return;
      }

      // Excel Generation
      const worksheet = XLSX.utils.json_to_sheet(reportData);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Finance Report");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const fileData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const fileName = `${reportTypeMap[formData.reportType]}_${formData.from}_to_${formData.to}.xlsx`;

      saveAs(fileData, fileName);

      Swal.fire({
        icon: "success",
        title: "Report Downloaded",
        text: "Excel file downloaded successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Finance Report Error:", err);

      if (err.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please login again",
        }).then(() => {
          localStorage.clear();
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Report Error",
          text: "Something went wrong while generating report.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="Finance Report" description="Channel Report Download" />

      <PageCard>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Report Type */}

          <FormRow label="Report Type">
            <select
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className="capsSelect w-80"
            >
              <option value="">Select</option>

              {Object.keys(reportTypeMap).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
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
              max={new Date().toISOString().split("T")[0]}
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
              max={new Date().toISOString().split("T")[0]}
            />
          </FormRow>

          {/* Error */}

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          {/* Loader */}

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin h-6 w-6 border-4 border-[#4c95b3] border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* Button */}

          <div className="text-center pt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="capsButton min-w-[220px]"
            >
              {loading ? "Generating..." : "Submit & Download Excel"}
            </button>
          </div>
        </div>
      </PageCard>
    </div>
  );
}

// Form Row Component

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium whitespace-nowrap">{label}</div>

    <div className="text-center">:</div>

    <div>{children}</div>
  </div>
);

export default FrChannel;
