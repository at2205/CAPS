"use client";
import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const BillingRequest = () => {
  const [billingData, setBillingData] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const recordsPerPage = 100;

  const fetchBillingData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await urlencodedInstance.get(
        `${endpoints.activityEndpoints.billingRequestData}?currentPage=${page}&recordsPerPage=${recordsPerPage}`
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setBillingData(data.BillingReportDetails || []);
        setTotalPages(data.totalPages || 1);
        setTotalRecords(data.totalRecords || 0);
        setCurrentPage(data.currentPage || 1);
        if (data.reasons) {
          try { setReasons(JSON.parse(data.reasons).data || []); } catch { setReasons([]); }
        }
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No billing data found" });
      }
    } catch (error) {
      console.error("Billing fetch error:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch billing data" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please enter User ID to search", timer: 1500, showConfirmButton: false });
      return;
    }
    if (!searchId.startsWith("AG") && !searchId.startsWith("DS") && !searchId.startsWith("MD")) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please enter full User ID (AG/DS/MD prefix)", timer: 2000, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const response = await urlencodedInstance.get(
        `${endpoints.activityEndpoints.searchById}?searchItem=${searchId.trim()}`
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setBillingData(data.BillingReportDetails || []);
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No records found" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Search failed" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBillingData(); }, []);

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="Billing Request" description="Review and process billing requests" />
      <PageCard>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <input className="capsInput w-60" placeholder="Search by User ID (AG/DS/MD)" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
            <button className="capsButton" onClick={handleSearch} disabled={loading}>Search</button>
            <button className="capsButton" onClick={() => { setSearchId(""); fetchBillingData(); }}>Reset</button>
          </div>
          <div className="text-sm">Total Records: {totalRecords} | Page {currentPage} of {totalPages}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#226b88] text-center text-sm">
            <thead>
              <tr className="capsColor">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Agent ID</th>
                <th className="border p-2">Agent Name</th>
                <th className="border p-2">Item</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              {billingData.length === 0 ? (
                <tr><td colSpan="9" className="border p-4 text-gray-500">{loading ? "Loading..." : "No data available"}</td></tr>
              ) : (
                billingData.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{item.createdDate || item.date}</td>
                    <td className="border p-2">{item.agentId || item.userId}</td>
                    <td className="border p-2">{item.agentName || item.userName}</td>
                    <td className="border p-2">{item.itemName || item.item}</td>
                    <td className="border p-2">{item.price}</td>
                    <td className="border p-2">{item.qty || item.quantity}</td>
                    <td className="border p-2 font-semibold">{item.status}</td>
                    <td className="border p-2">{item.remark || item.remarks}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button className="capsButton px-3 py-1 text-xs" disabled={currentPage <= 1} onClick={() => fetchBillingData(currentPage - 1)}>Prev</button>
            <span className="text-sm self-center">Page {currentPage} of {totalPages}</span>
            <button className="capsButton px-3 py-1 text-xs" disabled={currentPage >= totalPages} onClick={() => fetchBillingData(currentPage + 1)}>Next</button>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default BillingRequest;
