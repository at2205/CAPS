"use client";

import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function SAESAPI() {
  const [statementType, setStatementType] = useState("EgenAS");
  const [service, setService] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [txnStatus, setTxnStatus] = useState("all");

  const [filterType, setFilterType] = useState("all");
  const [userId, setUserId] = useState("");

  const [servicesList, setServicesList] = useState([]);
  const [reportData, setReportData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= TODAY DATE ================= */

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFromDate(today);
    setToDate(today);
  }, []);

  /* ================= DATE LIMIT ================= */

  useEffect(() => {
    if (!fromDate) return;

    const from = new Date(fromDate);
    const max = new Date(from);
    max.setDate(max.getDate() + 3);

    if (new Date(toDate) > max) {
      setToDate(max.toISOString().split("T")[0]);
    }
  }, [fromDate]);

  /* ================= VIEW ================= */

  const handleView = async () => {
    setLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams();

      params.append("accountType", statementType);
      params.append("stmt", filterType);
      params.append("userId", userId);
      params.append("service", service);
      params.append("txnStatus", txnStatus);
      params.append("fromDate", fromDate);
      params.append("toDate", toDate);

      let endpoint = "";

      if (statementType === "EgenAS") {
        endpoint = endpoints.reportsEndpoints.APIAccountStmt;
      } else {
        endpoint = endpoints.reportsEndpoints.AEPSMicroAtmAccountStmt;

        params.append("reportType", statementType);
      }

      const response = await axiosInstance.post(endpoint, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const res = response.data;

      if (res.status === "1") {
        Swal.fire({
          icon: "info",
          title: "No Data",
          text: res.message || "No records found",
        });
        setReportData([]);
      } else {
        setReportData(res.data || []);
        setServicesList(res.services || []);

        Swal.fire({
          icon: "success",
          title: "Report Loaded",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong while fetching data",
      });
    }

    setLoading(false);
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = async () => {
    try {
      const params = new URLSearchParams();

      params.append("accountType", statementType);
      params.append("stmt", filterType);
      params.append("userId", userId);
      params.append("service", service);
      params.append("txnStatus", txnStatus);
      params.append("fromDate", fromDate);
      params.append("toDate", toDate);

      const response = await axiosInstance.post(
        endpoints.reportsEndpoints.downloadAccountStatement,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "APIStatement.xlsx";
      link.click();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download statement",
      });
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Statement > API"
        description="View API / AEPS / MicroATM statements"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">
            {/* Statement Type */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Statement Type
              </label>

              <div className="text-center">:</div>

              <select
                className="capsInput"
                value={statementType}
                onChange={(e) => setStatementType(e.target.value)}
              >
                <option value="EgenAS">API Account Statement</option>
                <option value="aepsAS">AEPS Account Statement</option>
                <option value="microatmAS">MicroATM Account Statement</option>
              </select>
            </div>

            {/* Service */}

            {statementType === "EgenAS" && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Service
                </label>

                <div className="text-center">:</div>

                <select
                  className="capsInput"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="all">All</option>

                  {servicesList.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* From Date */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                From Date
              </label>

              <div className="text-center">:</div>

              <input
                type="date"
                className="capsInput"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* To Date */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                To Date
              </label>

              <div className="text-center">:</div>

              <input
                type="date"
                className="capsInput"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Transaction Status */}

            {statementType === "EgenAS" && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Transaction Status
                </label>

                <div className="text-center">:</div>

                <select
                  className="capsInput"
                  value={txnStatus}
                  onChange={(e) => setTxnStatus(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            )}

            {/* Filter */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">Select</label>

              <div className="text-center">:</div>

              <select
                className="capsInput"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="id">ID-Wise</option>
              </select>
            </div>

            {/* User ID */}

            {filterType === "id" && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  User ID
                </label>

                <div className="text-center">:</div>

                <input
                  className="capsInput"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            )}

            {/* Buttons */}

            <div className="text-center pt-2 space-x-3">
              <button
                onClick={handleView}
                className="capsButton px-8"
                disabled={loading}
              >
                {loading ? "Loading..." : "VIEW"}
              </button>

              <button
                onClick={handleDownload}
                className="capsButton px-8" 
              >
                DOWNLOAD
              </button>
            </div>
            {message && (
              <p className="text-center text-red-500 text-sm">{message}</p>
            )}
          </div>
        </div>

        {/* ================= TABLE ================= */}

        {reportData.length > 0 && (
          <div className="pt-6 overflow-x-auto">
            <table className="min-w-[1100px] w-full border text-sm text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">S.N.</th>
                  <th className="border px-3 py-2">API ID</th>
                  <th className="border px-3 py-2">Txn Date</th>
                  <th className="border px-3 py-2">Txn Time</th>
                  <th className="border px-3 py-2">Txn ID</th>
                  <th className="border px-3 py-2">Service</th>
                  <th className="border px-3 py-2">Txn Amount</th>
                  <th className="border px-3 py-2">Commission</th>
                  <th className="border px-3 py-2">Bankit Fee</th>
                  <th className="border px-3 py-2">Net Amount</th>
                  <th className="border px-3 py-2">Action</th>
                  <th className="border px-3 py-2">Txn Status</th>
                </tr>
              </thead>

              <tbody>
                {reportData.map((row, index) => (
                  <tr key={index}>
                    <td className="border py-2">{index + 1}</td>
                    <td className="border">{row.agentId}</td>
                    <td className="border">{row.dor}</td>
                    <td className="border">{row.time}</td>
                    <td className="border">{row.TepTranId}</td>
                    <td className="border">{row.operator}</td>
                    <td className="border">{row.amt}</td>
                    <td className="border">{row.comm}</td>
                    <td className="border">{row.Service_charge1}</td>
                    <td className="border font-semibold">{row.netAmount}</td>
                    <td className="border">{row.action}</td>
                    <td className="border font-bold text-green-600">
                      {row.transtatus}
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

export default SAESAPI;
