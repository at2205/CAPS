"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function TrChannel() {
  const [formData, setFormData] = useState({
    reportType: "",
    from: "",
    to: "",
  });

  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- DATE FORMAT ----------------
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    if (!formData.reportType) return "Please select report type";

    if (!formData.from || !formData.to) return "Please select date range";

    if (formData.from > formData.to) return "Invalid date range";

    return "";
  };

  // ---------------- API CALL ----------------
  const handleView = async () => {
    const adminId = localStorage.getItem("userId");
    const loginType = localStorage.getItem("adminUserType");
    const portalId = localStorage.getItem("portalId");

    if (!adminId) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again",
      }).then(() => {
        localStorage.clear();
        window.location.href = "/";
      });
      return;
    }

    setLoading(true);
    setError("");
    setTableData([]);

    try {
      const payload = {
        userId: adminId,
        adminId: adminId,
        loginType: loginType,
        portalId: portalId,
        reportOf: "liveRechargeTransactionReport",
        fromDate: formData.from,
        toDate: formData.to,
      };

      console.log("Payload:", payload);

      const params = new URLSearchParams();

      params.append("adminUserFormBean", JSON.stringify(payload));

      const response = await urlencodedInstance.post(
        endpoints.reportsEndpoints.getLiveRechargeReportView,
        params,
      );

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      console.log("Response:", data);

      if (data.status === "0") {
        setTableData(data.accountStatement || []);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: data.message || "No data found for selected range",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: "Something went wrong while fetching report",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CSV DOWNLOAD ----------------
  const handleDownload = () => {
    if (!tableData.length) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "No data available to download",
      });
      return;
    }

    const headers = Object.keys(tableData[0]).join(",");

    const rows = tableData
      .map((row) =>
        Object.values(row)
          .map((val) => `"${val ?? ""}"`)
          .join(","),
      )
      .join("\n");

    const csv = `data:text/csv;charset=utf-8,${headers}\n${rows}`;

    const link = document.createElement("a");

    link.href = encodeURI(csv);
    link.download = "transaction_report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Transaction Report"
        description="Channel Report View & Download"
      />

      <PageCard>
        <div className="max-w-2xl mx-auto space-y-5">
          <FormRow label="Report Type">
            <select
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className="capsSelect w-80"
            >
              <option value="">Select</option>

              <option value="liveRechargeTransactionReport">
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

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin h-6 w-6 border-4 border-[#4c95b3] border-t-transparent rounded-full"></div>
            </div>
          )}

          <div className="text-center pt-3 space-x-3">
            <button onClick={handleView} className="capsButton">
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

        {tableData.length > 0 && (
          <div className="overflow-x-auto mt-8 border rounded-lg">
            <table className="min-w-full text-sm text-center border">
              <thead className="chcolor1 text-white">
                <tr>
                  <th className="border px-3 py-2">Agent ID</th>
                  <th className="border px-3 py-2">Txn Date</th>
                  <th className="border px-3 py-2">Txn Time</th>
                  <th className="border px-3 py-2">Mobile</th>
                  <th className="border px-3 py-2">Operator</th>
                  <th className="border px-3 py-2">Txn ID</th>
                  <th className="border px-3 py-2">Txn Amount</th>
                  <th className="border px-3 py-2">Operator ID</th>
                  <th className="border px-3 py-2">Commission</th>
                  <th className="border px-3 py-2">Bankit Fee</th>
                  <th className="border px-3 py-2">Txn Status</th>
                  <th className="border px-3 py-2">Service Provider</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="border px-2 py-1">{row.agentId || "-"}</td>
                    <td className="border px-2 py-1">{row.dor || "-"}</td>
                    <td className="border px-2 py-1">{row.time || "-"}</td>
                    <td className="border px-2 py-1">{row.mobno || "-"}</td>
                    <td className="border px-2 py-1">
                      {row.operator || "null"}
                    </td>
                    <td className="border px-2 py-1">{row.TepTranId || "-"}</td>
                    <td className="border px-2 py-1">
                      {row.amt ? Number(row.amt).toFixed(2) : "-"}
                    </td>
                    <td className="border px-2 py-1">
                      {row.OperatorTranId || "-"}
                    </td>
                    <td className="border px-2 py-1">{row.comm || "0.00"}</td>
                    <td className="border px-2 py-1">
                      {row.Service_charge1 || "0.00"}
                    </td>
                    <td className="border px-2 py-1">
                      {row.transtatus || "-"}
                    </td>
                    <td className="border px-2 py-1">
                      {row.ServiceProvider || "-"}
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
}

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium">{label}</div>

    <div className="text-center">:</div>

    <div>{children}</div>
  </div>
);

export default TrChannel;
