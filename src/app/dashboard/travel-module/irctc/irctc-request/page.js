"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axios from "axios";
import Swal from "sweetalert2";

function IrctcRequest() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("All");
  const [searchType, setSearchType] = useState("All");
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [agentDetails, setAgentDetails] = useState(null);

  // ================= SEARCH =================
  const handleSearch = async () => {
    if (!fromDate || !toDate) {
      Swal.fire("Error", "Select dates", "error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fromDate,
        toDate,
        status,
        searchItem: searchType === "IdWise" ? searchItem : "",
      };

      const res = await axios.post("/api/irctc/search", payload);
      setTableData(res.data || []);
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (item) => {
    try {
      const payload = {
        agentId: item.agentId,
        remark: item.remark,
        userId: item.userId,
        status: item.status,
      };

      const res = await axios.post("/api/irctc/update", payload);

      if (res.data.status === "00") {
        Swal.fire("Success", res.data.message, "success");
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  // ================= VIEW DETAILS =================
  const handleView = async (agentId) => {
    try {
      const res = await axios.get(`/api/irctc/details?agentId=${agentId}`);
      setAgentDetails(res.data);
      setShowDetails(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard title="IRCTC Request" />

      <PageCard>
        {/* ================= FORM ================= */}
        <div className="flex justify-center">
          <div className="w-[500px] space-y-4">
            {/* FROM DATE */}
            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">From Date</label>
              <span>:</span>
              <input
                type="date"
                className="capsInput"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* TO DATE */}
            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">To Date</label>
              <span>:</span>
              <input
                type="date"
                className="capsInput"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* STATUS */}
            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">Status</label>
              <span>:</span>
              <select
                className="capsInput"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Accept">Accept</option>
                <option value="Reject">Reject</option>
              </select>
            </div>

            {/* SEARCH TYPE */}
            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">Search Type</label>
              <span>:</span>
              <select
                className="capsInput"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="IdWise">ID Wise</option>
              </select>
            </div>

            {/* SEARCH INPUT */}
            {searchType === "IdWise" && (
              <div className="grid grid-cols-[200px_10px_1fr]">
                <label className="text-right">Agent ID</label>
                <span>:</span>
                <input
                  className="capsInput"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
              </div>
            )}

            {/* BUTTON */}
            <div className="text-center">
              <button onClick={handleSearch} className="capsButton px-10">
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        {tableData.length > 0 && !showDetails && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border border-[#226b88] text-sm text-center">
              <thead className="bg-[#226b88] text-white">
                <tr>
                  <th className="border p-2">S.NO</th>
                  <th className="border p-2">Channel</th>
                  <th className="border p-2">Request Date</th>
                  <th className="border p-2">Updated Date</th>
                  <th className="border p-2">Agent ID</th>
                  <th className="border p-2">Agent Name</th>
                  <th className="border p-2">API ID</th>
                  <th className="border p-2">Details</th>
                  <th className="border p-2">User ID</th>
                  <th className="border p-2">Remarks</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Change Status</th>
                  <th className="border p-2">Update</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, i) => (
                  <tr key={i} className="hover:bg-[#f5fbfd]">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{item.channel}</td>
                    <td className="border p-2">{item.createdDate}</td>
                    <td className="border p-2">{item.updatedDate}</td>
                    <td className="border p-2">{item.agentId}</td>
                    <td className="border p-2">{item.agentName}</td>
                    <td className="border p-2">{item.apiId}</td>

                    <td className="border p-2">
                      <button
                        onClick={() => handleView(item.agentId)}
                        className="underline text-blue-600"
                      >
                        View
                      </button>
                    </td>

                    <td className="border p-2">
                      <input
                        className="border px-2 py-1 w-full"
                        value={item.userId || ""}
                        onChange={(e) => {
                          const updated = [...tableData];
                          updated[i].userId = e.target.value;
                          setTableData(updated);
                        }}
                      />
                    </td>

                    <td className="border p-2">
                      <textarea
                        className="w-full border px-2"
                        value={item.remark || ""}
                        onChange={(e) => {
                          const updated = [...tableData];
                          updated[i].remark = e.target.value;
                          setTableData(updated);
                        }}
                      />
                    </td>

                    <td className="border p-2 font-bold">{item.status}</td>

                    <td className="border p-2">
                      <select
                        value={item.status}
                        onChange={(e) => {
                          const updated = [...tableData];
                          updated[i].status = e.target.value;
                          setTableData(updated);
                        }}
                        className="border px-2"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                      </select>
                    </td>

                    <td className="border p-2">
                      <button
                        onClick={() => handleUpdate(item)}
                        className="px-4 py-1 border border-[#226b88] text-[#226b88] rounded hover:bg-[#226b88] hover:text-white"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= DETAILS CARD ================= */}
        {showDetails && agentDetails && (   
          <div className="mt-6 border p-4 shadow bg-white w-[70%] mx-auto">
            <h3 className="bg-[#226b88] text-white p-2 font-bold">
              Agent Information
            </h3>

            <div className="p-4 space-y-2">
              <p>
                <b>Agent ID:</b> {agentDetails.agentId}
              </p>
              <p>
                <b>Name:</b> {agentDetails.agentName}
              </p>
              <p>
                <b>Email:</b> {agentDetails.emailId}
              </p>
              <p>
                <b>Mobile:</b> {agentDetails.mobileNo}
              </p>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-4 px-4 py-2 border"
            >
              Close
            </button>
          </div>
        )}
      </PageCard>
    </div>
  );
}

export default IrctcRequest;
