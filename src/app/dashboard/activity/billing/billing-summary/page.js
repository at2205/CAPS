"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const BillingSummary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  const fetchSummary = async (page = 1) => {
    try {
      setLoading(true);
      const response = await urlencodedInstance.get(
        `${endpoints.activityEndpoints.summary}?currentPage=${page}&recordsPerPage=10`
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setSummaryData(data.BillingSummaryDetails || []);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No records found" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load billing summary" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchItem.trim()) { fetchSummary(); return; }
    try {
      setLoading(true);
      const response = await urlencodedInstance.get(
        `${endpoints.activityEndpoints.summarySearch}?searchItem=${searchItem.trim()}`
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setSummaryData(data.BillingSummaryDetails || []);
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No records found" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Search failed" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSummary(); }, []);

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="Billing Summary" description="Overview of billing device and service counts" />
      <PageCard>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <input className="capsInput w-60" placeholder="Search Agent ID" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
            <button className="capsButton" onClick={handleSearch} disabled={loading}>Search</button>
            <button className="capsButton" onClick={() => { setSearchItem(""); fetchSummary(); }}>Reset</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#226b88] text-center text-sm">
            <thead>
              <tr className="capsColor">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Agent ID</th>
                <th className="border p-2">Agent Name</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.length === 0 ? (
                <tr><td colSpan="5" className="border p-4 text-gray-500">{loading ? "Loading..." : "No data"}</td></tr>
              ) : (
                summaryData.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{item.agentId || item.userId}</td>
                    <td className="border p-2">{item.agentName || item.userName}</td>
                    <td className="border p-2 font-semibold">{item.status}</td>
                    <td className="border p-2">{item.remark}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button className="capsButton px-3 py-1 text-xs" disabled={currentPage <= 1} onClick={() => fetchSummary(currentPage - 1)}>Prev</button>
            <span className="text-sm self-center">Page {currentPage} of {totalPages}</span>
            <button className="capsButton px-3 py-1 text-xs" disabled={currentPage >= totalPages} onClick={() => fetchSummary(currentPage + 1)}>Next</button>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default BillingSummary;
