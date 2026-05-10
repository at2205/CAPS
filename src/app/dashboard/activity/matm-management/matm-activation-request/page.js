"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const MATMActivationRequest = () => {
  const [channel, setChannel] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [matmList, setMatmList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channel) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select channel", timer: 1500, showConfirmButton: false });
      return;
    }
    if (!fromDate || !toDate) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select date range", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = {
        userId: localStorage.getItem("userId"),
        userType: channel,
        fromDate,
        toDate,
        action: "View",
      };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.getMatmDetails,
        new URLSearchParams({ adminUserFormBean: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setMatmList(data.matmList || []);
        if (!data.matmList || data.matmList.length === 0) {
          Swal.fire({ icon: "info", title: "No Data", text: "No MATM records found", timer: 1500, showConfirmButton: false });
        }
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to fetch MATM data" });
      }
    } catch (error) {
      console.error("MATM Search Error:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!channel || !fromDate || !toDate) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please fill all fields first", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      const payload = { userId: localStorage.getItem("userId"), userType: channel, fromDate, toDate };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.downloadMatmReport,
        new URLSearchParams({ adminUserFormBean: JSON.stringify(payload) }),
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `MATM_Report_${fromDate}_${toDate}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to download report" });
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="MATM Activation Request" description="Filter and download MATM activation requests" />
      <PageCard>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">Channel</label>
              <div className="text-center">:</div>
              <select value={channel} onChange={(e) => setChannel(e.target.value)} className="capsInput">
                <option value="">Select Channel</option>
                <option value="AG">Retailer</option>
                <option value="DS">Distributor</option>
              </select>
            </div>
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">From Date</label>
              <div className="text-center">:</div>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="capsInput" />
            </div>
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">To Date</label>
              <div className="text-center">:</div>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="capsInput" />
            </div>
            <div className="text-center mt-4 space-x-4">
              <button type="submit" className="capsButton min-w-[120px]" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
              <button type="button" className="capsButton min-w-[120px]" onClick={handleDownload}>
                Download
              </button>
            </div>
          </form>
        </div>

        {matmList.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border border-[#226b88] text-sm text-center">
              <thead>
                <tr className="capsColor">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Agent ID</th>
                  <th className="border p-2">Agent Name</th>
                  <th className="border p-2">DS Name</th>
                  <th className="border p-2">Mobile</th>
                  <th className="border p-2">MATM Serial</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Channel</th>
                  <th className="border p-2">Created Date</th>
                  <th className="border p-2">Remark</th>
                </tr>
              </thead>
              <tbody>
                {matmList.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{item.agentId}</td>
                    <td className="border p-2">{item.agentName}</td>
                    <td className="border p-2">{item.distributor_name}</td>
                    <td className="border p-2">{item.mobileNo}</td>
                    <td className="border p-2">{item.matmSerialNumber}</td>
                    <td className="border p-2 font-semibold">{item.status}</td>
                    <td className="border p-2">{item.channel}</td>
                    <td className="border p-2">{item.createdDate}</td>
                    <td className="border p-2">{item.remark}</td>
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

export default MATMActivationRequest;
