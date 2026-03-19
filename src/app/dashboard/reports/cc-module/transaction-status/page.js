"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function TransactionStatus() {
  const [connectionNo, setConnectionNo] = useState("");
  const [vendorSessionId, setVendorSessionId] = useState("");
  const [transactionData, setTransactionData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const connNo = connectionNo.trim();
    const vendorId = vendorSessionId.trim();

    if (connNo === "" && vendorId === "") {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter connection number or vendor session Id.",
      });
      return false;
    }

    if (connNo !== "" && connNo.length > 20) {
      Swal.fire({
        icon: "error",
        title: "Invalid Connection Number",
        text: "Please enter valid connection number.",
      });
      return false;
    }

    if (vendorId !== "" && vendorId.length > 30) {
      Swal.fire({
        icon: "error",
        title: "Invalid Transaction ID",
        text: "Please enter valid vendor session Id.",
      });
      return false;
    }

    return true;
  };

  const handleSearch = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    setTransactionData([]);

    try {
      const adminUserFormBean = {
        userId: localStorage.getItem("userId"),
        vendorSessionId: vendorSessionId,
        loginType: localStorage.getItem("adminUserType"),
        portalId: localStorage.getItem("portalId"),
        connectionNo: connectionNo,
      };

      const params = new URLSearchParams();

      params.append("adminUserFormBean", JSON.stringify(adminUserFormBean));

      const response = await axiosInstance.post(
        endpoints.reportsEndpoints.getAgentTranDetailData,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      const res =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (!res || !res.accountStatement || res.accountStatement.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: "Data Not Available.",
        });
        setTransactionData([]);
      } else {
        setTransactionData(res.accountStatement);
      }
    } catch (error) {
      console.log("Transaction API Error:", error);
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: "Something went wrong while fetching data.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Reports > Transaction Status Check"
        description="Search transaction using connection number or Txn ID"
      />

      <PageCard>
        {message && (
          <p
            className={`text-center font-semibold mb-4 text-sm ${
              transactionData.length > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">
            {/* Connection Number */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Connection Number
              </label>
              <div className="text-center">:</div>

              <input
                type="text"
                value={connectionNo}
                maxLength={20}
                onChange={(e) => setConnectionNo(e.target.value)}
                className="capsInput"
                placeholder="Enter connection number"
              />
            </div>

            {/* Transaction ID */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Transaction ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                value={vendorSessionId}
                maxLength={30}
                onChange={(e) => setVendorSessionId(e.target.value)}
                className="capsInput"
                placeholder="Enter vendor session ID"
              />
            </div>

            {/* Search Button */}
            <div className="text-center pt-2">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="capsButton px-10"
              >
                {loading ? "Searching..." : "SEARCH"}
              </button>
            </div>

            {/* ================= TABLE ================= */}
            {transactionData.length > 0 && (
              <div className="pt-4">
                <table className="w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2">Agent ID</th>
                      <th className="border px-3 py-2">Date</th>
                      <th className="border px-3 py-2">Time</th>
                      <th className="border px-3 py-2">Service</th>
                      <th className="border px-3 py-2">Operator</th>
                      <th className="border px-3 py-2">Connection Number</th>
                      <th className="border px-3 py-2">Txn Amount</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactionData.map((row, index) => (
                      <tr key={index}>
                        <td className="border px-3 py-2">{row.agentID}</td>
                        <td className="border px-3 py-2">
                          {row.dateOfRecharge}
                        </td>
                        <td className="border px-3 py-2">
                          {row.timeOfRecharge}
                        </td>
                        <td className="border px-3 py-2">{row.service}</td>
                        <td className="border px-3 py-2">
                          {row.connectionOperator}
                        </td>
                        <td className="border px-3 py-2">{row.connectionNo}</td>
                        <td className="border px-3 py-2 font-semibold">
                          ₹ {row.amount}
                        </td>
                        <td
                          className={`border px-3 py-2 font-bold ${
                            row.status === "SUCCESS"
                              ? "text-blue-600"
                              : "text-red-500"
                          }`}
                        >
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default TransactionStatus;
