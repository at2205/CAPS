"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ViewComplaints = () => {
  const [searchMode, setSearchMode] = useState("complaintId");
  const [complaintId, setComplaintId] = useState("");
  const [userType, setUserType] = useState("All");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [complaints, setComplaints] = useState([]);

  const handleFieldChange = (id, field, value) => {
    setComplaints((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      searchMode === "complaintId"
        ? { complaintId }
        : { userType, userId, fromDate, toDate, status };

    try {
      const res = await fetch(
        "http://localhost:8281/CustomerModule/complaints",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setComplaints(data?.data || []);
    } catch {
      Swal.fire("Error", "API error ❌", "error");
    }
  };

  const handleDownloadExcel = () => {
    if (!complaints.length) {
      Swal.fire("No data", "Nothing to export ❌", "error");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(complaints);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Complaints");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "complaints.xlsx");
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Customer Care Module"
        description="View Complaints"
      />

      {/* BODY CARD */}
      <PageCard>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">

          <FormRow label="Search By">
            <div className="flex gap-6">
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={searchMode === "complaintId"}
                  onChange={() => setSearchMode("complaintId")}
                />
                Complaint ID
              </label>

              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={searchMode === "userId"}
                  onChange={() => setSearchMode("userId")}
                />
                User ID
              </label>
            </div>
          </FormRow>

          {searchMode === "complaintId" && (
            <FormRow label="Complaint ID">
              <input
                className="capsInput  w-80"
                value={complaintId}
                onChange={(e) =>
                  setComplaintId(e.target.value)
                }
              />
            </FormRow>
          )}

          {searchMode === "userId" && (
            <>
              <FormRow label="User Type">
                <select
                  className="capsSelect w-80"
                  value={userType}
                  onChange={(e) =>
                    setUserType(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>MDS</option>
                  <option>Distributor</option>
                  <option>Agent</option>
                </select>
              </FormRow>

              <FormRow label="User ID">
                <input
                  className="capsInput  w-80"
                  value={userId}
                  onChange={(e) =>
                    setUserId(e.target.value)
                  }
                />
              </FormRow>

              <FormRow label="From Date">
                <input
                  type="date"
                  className="capsInput  w-80"
                  value={fromDate}
                  onChange={(e) =>
                    setFromDate(e.target.value)
                  }
                />
              </FormRow>

              <FormRow label="To Date">
                <input
                  type="date"
                  className="capsInput  w-80"
                  value={toDate}
                  onChange={(e) =>
                    setToDate(e.target.value)
                  }
                />
              </FormRow>

              <FormRow label="Status">
                <select
                  className="capsSelect  w-80"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </FormRow>
            </>
          )}

          <div className="flex justify-center gap-6 pt-4">
            <button className="capsButton">View</button>
            <button
              type="button"
              onClick={handleDownloadExcel}
              className="capsButton"
            >
              Download Excel
            </button>
          </div>

        </form>

        {/* TABLE */}
        {complaints.length > 0 && (
          <div className="mt-6 overflow-x-auto rounded-lg border">

            <table className="w-full text-sm text-center">

              <thead className="chcolor1 text-white">
                <tr>
                  {[
                    "Mode",
                    "Complaint Id",
                    "Complaint Date",
                    "User Id",
                    "Status",
                    "Remark",
                    "Updated Date",
                    "Update",
                  ].map((h) => (
                    <th key={h} className="border p-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {complaints.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`border-t ${
                      i % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="border p-2">{c.mode}</td>
                    <td className="border p-2 font-semibold capsText">
                      {c.id}
                    </td>
                    <td className="border p-2">{c.date}</td>
                    <td className="border p-2">{c.koCode}</td>

                    <td className="border p-2">
                      <select
                        className="capsSelect  w-80"
                        value={c.status}
                        onChange={(e) =>
                          handleFieldChange(
                            c.id,
                            "status",
                            e.target.value
                          )
                        }
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Closed</option>
                      </select>
                    </td>

                    <td className="border p-2">
                      <textarea
                        rows={2}
                        className="capsInput  w-80"
                        value={c.remark || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            c.id,
                            "remark",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td className="border p-2">
                      {c.updatedDate}
                    </td>

                    <td className="border p-2">
                      <button
                        className="capsButton"
                        onClick={() =>
                          Swal.fire(
                            "Updated",
                            "Status Updated ✅",
                            "success"
                          )
                        }
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

      </PageCard>
    </div>
  );
};

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-12 gap-2 items-center">
    <div className="col-span-4 text-right font-medium">
      {label}
    </div>
    <div className="col-span-1 text-center">:</div>
    <div className="col-span-7">
      {children}
    </div>
  </div>
);

export default ViewComplaints;
