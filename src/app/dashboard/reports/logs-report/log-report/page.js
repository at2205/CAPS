"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const ApiLogs = () => {
  const [formData, setFormData] = useState({
    logType: "",
    channelTransId: "",
    apiTransId: "",
  });

  const [loading, setLoading] = useState(false);
  const [logData, setLogData] = useState([]);

  // ================= INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { logType, channelTransId, apiTransId } = formData;

    if (!logType) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select Log Type",
      });
      return;
    }
    let transactionId = "";

    if (logType === "channelLog") {
      if (!channelTransId) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please enter Transaction Id",
        });
        return;
      }

      transactionId = channelTransId;
    } else {
      if (!apiTransId) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please enter Transaction Id",
        });
        return;
      }

      transactionId = apiTransId;
    }

    try {
      setLoading(true);

      const payload = {
        logType: logType,
        userId: localStorage.getItem("userId"),
      };

      if (logType === "channelLog") {
        payload.channelTransId = transactionId;
      } else {
        payload.apiTransId = transactionId;
      }
      const params = new URLSearchParams();

      params.append("adminUserFormBean", JSON.stringify(payload));

      const response = await urlencodedInstance.post(
        endpoints.reportsEndpoints.getLogDetails,
        params,
      );

      let responseData = response.data;

      if (typeof responseData === "string") {
        responseData = JSON.parse(responseData);
      }

      console.log("API RESPONSE", responseData);

      if (responseData?.status == 0 && responseData?.accountStatement) {
        const logs = responseData.accountStatement;

        setLogData(Array.isArray(logs) ? logs : [logs]);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Data",
          text: responseData?.message || "No details found for the user",
        });
        setLogData([]);
      }
    } catch (error) {
      console.error("API ERROR", error);

      if (error.response?.status === 401) {
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
          title: "API Error",
          text: "Failed to fetch logs.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > Log Report"
        description="View Channel, API and Card logs using Transaction ID"
      />

      <PageCard>
        {/* FORM */}

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-[520px] space-y-4">
            {/* LOG TYPE */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Log Details Type
              </label>

              <div className="text-center">:</div>

              <select
                name="logType"
                value={formData.logType}
                onChange={handleChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="channelLog">Channel Log Details</option>
                <option value="apiLog">API Log Details</option>
                <option value="cardLog">Card Log Details</option>
              </select>
            </div>

            {/* CHANNEL LOG */}

            {formData.logType === "channelLog" && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Transaction Id
                </label>

                <div className="text-center">:</div>

                <input
                  type="text"
                  name="channelTransId"
                  value={formData.channelTransId}
                  onChange={handleChange}
                  className="capsInput"
                  placeholder="Enter Transaction Id"
                />
              </div>
            )}

            {/* API + CARD */}

            {(formData.logType === "apiLog" ||
              formData.logType === "cardLog") && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Transaction Id
                </label>

                <div className="text-center">:</div>

                <input
                  type="text"
                  name="apiTransId"
                  value={formData.apiTransId}
                  onChange={handleChange}
                  className="capsInput"
                  placeholder="Enter Transaction Id"
                />
              </div>
            )}

            <div className="text-center pt-2">
              <button type="submit" className="capsButton px-10">
                {loading ? "Loading..." : "VIEW"}
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}

        {logData.length > 0 && (
          <div className="pt-6 overflow-x-auto">
            <table className="min-w-[900px] w-full border text-sm text-center">
              <thead className="bg-gray-100">
                <tr>
                  {formData.logType === "cardLog" ? (
                    <th className="border px-3 py-2">Card Number</th>
                  ) : (
                    <th className="border px-3 py-2">API Id</th>
                  )}

                  <th className="border px-3 py-2">Txn Id</th>
                  <th className="border px-3 py-2">Txn Date</th>
                  <th className="border px-3 py-2">Request</th>
                  <th className="border px-3 py-2">Response</th>
                </tr>
              </thead>

              <tbody>
                {logData.map((row, i) => (
                  <tr key={i}>
                    <td className="border py-2">
                      {row.apiId || row.cardNumber || "-"}
                    </td>

                    <td className="border">{row.transactionId || "-"}</td>

                    <td className="border">{row.date || "-"}</td>

                    <td className="border break-all max-w-[200px]">
                      {row.request || row.inputXml || "-"}
                    </td>

                    <td className="border break-all max-w-[200px]">
                      {row.response || row.outputXml || "-"}
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

export default ApiLogs;
