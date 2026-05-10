"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

const ViewComplaints = () => {
  const [searchMode, setSearchMode] = useState("complaintId");
  const [complaintId, setComplaintId] = useState("");

  const [userType, setUserType] = useState("All");
  const [userId, setUserId] = useState("");

  const [status, setStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FIELD CHANGE =================

  const handleFieldChange = (id, field, value) => {
    setComplaints((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  // ================= VIEW COMPLAINT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      searchMode === "complaintId"
        ? { complaintId }
        : { userType, userId, fromDate, toDate, status };

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        endpoints.customerCareEndpoints.viewComplaints,
        payload,
      );

      const data = res.data;
      console.log("API DATA:", data.data);
      setComplaints(data?.data || []);

      if (!data?.data?.length) {
        Swal.fire("No Data", "No complaints found", "info");
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "API Error", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE STATUS =================

  const handleUpdate = async (row) => {
    try {
      const payload = {
        complaintId: row.id,
        status: row.status,
        lastResponse: row.lastResponse,
        closedBy: row.closedBy,
        userType: row.lodgeFor,
      };

      const res = await axiosInstance.post(
        endpoints.customerCareEndpoints.updateComplaint,
        payload,
      );

      Swal.fire("Success", res.data.message, "success");
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Update Failed",
        "error",
      );
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="Customer Care Module" description="View Complaints" />

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
                className="capsInput w-80"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
              />
            </FormRow>
          )}

          {searchMode === "userId" && (
            <>
              <FormRow label="User Type">
                <select
                  className="capsSelect w-80"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option>All</option>
                  <option>MDS</option>
                  <option>Distributor</option>
                  <option>Agent</option>
                </select>
              </FormRow>

              <FormRow label="User ID">
                <input
                  className="capsInput w-80"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </FormRow>

              <FormRow label="From Date">
                <input
                  type="date"
                  className="capsInput w-80"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </FormRow>

              <FormRow label="To Date">
                <input
                  type="date"
                  className="capsInput w-80"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </FormRow>

              <FormRow label="Status">
                <select
                  className="capsSelect w-80"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
            <button className="capsButton" disabled={loading}>
              {loading ? "Loading..." : "View"}
            </button>
          </div>
        </form>

        {/* TABLE */}

        {complaints.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-[1500px] text-sm text-center border">
              <thead className="chcolor1 text-white">
                <tr>
                  {[
                    "Mode",
                    "Complaint Id",
                    "Complaint Date",
                    "Lodge For",
                    "User Id",
                    "Category",
                    "Transaction Id",
                    "Lodge By",
                    "Assigned To",
                    "Closed By",
                    "Status",
                    "Estimated TAT",
                    "Remark",
                    "Description",
                    "Updated Date",
                    "Document",
                    "Update",
                  ].map((h) => (
                    <th key={h} className="border p-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {complaints?.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`border-t ${i % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="border p-2">{c.mode}</td>

                    <td className="border p-2 font-semibold">{c.id}</td>

                    <td className="border p-2">{c.date}</td>

                    <td className="border p-2">{c.lodgeFor}</td>

                    <td className="border p-2">{c.koCode}</td>

                    <td className="border p-2">{c.category}</td>

                    <td className="border p-2">{c.transactionId}</td>

                    <td className="border p-2">{c.lodgeBy}</td>

                    <td className="border p-2">{c.assignedTo}</td>

                    {/* CLOSED BY EDITABLE */}

                    <td className="border p-2">
                      <input
                        className="capsInput w-32"
                        value={c.closedBy || ""}
                        onChange={(e) =>
                          handleFieldChange(c.id, "closedBy", e.target.value)
                        }
                      />
                    </td>

                    {/* STATUS EDITABLE */}

                    <td className="border p-2">
                      <select
                        className="capsSelect w-32"
                        value={c.status ?? "Open"}
                        onChange={(e) =>
                          handleFieldChange(c.id, "status", e.target.value)
                        }
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Closed</option>
                      </select>
                    </td>

                    <td className="border p-2">{c.estimatedTat}</td>

                    {/* REMARK EDITABLE */}

                    <td className="border p-2">
                      <textarea
                        rows={2}
                        className="capsInput w-48"
                        value={c.lastResponse || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            c.id,
                            "lastResponse",
                            e.target.value,
                          )
                        }
                      />
                    </td>

                    <td className="border p-2">{c.description}</td>

                    <td className="border p-2">{c.updatedDate}</td>

                    <td className="border p-2">
                      {c.filePath && (
                        <a
                          href={`http://localhost:8281${c.filePath}`}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      )}
                    </td>

                    <td className="border p-2">
                      <button
                        className="capsButton"
                        onClick={() => handleUpdate(c)}
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
    <div className="col-span-4 text-right font-medium">{label}</div>

    <div className="col-span-1 text-center">:</div>

    <div className="col-span-7">{children}</div>
  </div>
);

export default ViewComplaints;
