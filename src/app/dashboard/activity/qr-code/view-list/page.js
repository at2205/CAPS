"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const QrCodeViewList = () => {
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [singleUser, setSingleUser] = useState(null);
  const [userQrDetails, setUserQrDetails] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [remark, setRemark] = useState("");
  const [qrStatus, setQrStatus] = useState("");

  /* ================= MULTIPLE USERS ================= */
  const loadMultipleUsers = async () => {
    try {
      const response = await urlencodedInstance.get(endpoints.activityEndpoints.checker);
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      setUserQrDetails(data.agentDetails || data.data || []);
    } catch {
      setMessage("Technical error");
    }
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
    setMessage("");
    setSingleUser(null);
    setCheckedList([]);
    setUserId("");

    if (value === "multipleUser") loadMultipleUsers();
  };

  /* ================= SINGLE USER ================= */
  const searchUser = async () => {
    if (!userId.trim()) {
      setMessage("Please enter Client Id");
      return;
    }
    try {
      const response = await urlencodedInstance.get(`${endpoints.activityEndpoints.searchStatus}?userID=${userId}`);
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      setSingleUser(data.status === "0" ? data : null);
      if (data.status !== "0") setMessage("User not found");
    } catch {
      setMessage("User not found");
    }
  };

  /* ================= CHECKBOX ================= */
  const toggleCheckbox = (agentId) => {
    setCheckedList((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    );
  };

  /* ================= BATCH ACTION ================= */
  const batchAction = async (action) => {
    try {
      const params = new URLSearchParams();
      params.append("checkBoxValues", checkedList.join(","));
      params.append("action", action);
      await urlencodedInstance.post(endpoints.activityEndpoints.batchAction, params);
      loadMultipleUsers();
      setCheckedList([]);
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Technical failure" });
    }
  };

  /* ================= UPDATE SINGLE ================= */
  const updateQRDetails = async (agentId) => {
    if (!remark.trim()) {
      setMessage("Please enter remark.");
      return;
    }
    if (!qrStatus) {
      setMessage("Please select status.");
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("agentId", agentId);
      params.append("qrStatus", qrStatus);
      params.append("remark", remark);
      await urlencodedInstance.post(endpoints.activityEndpoints.updateQrStatus, params);
      setMessage("Status updated successfully.");
    } catch {
      setMessage("Technical error");
    }
  };

  const badgeStyle = (active) =>
    active
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="View QR Code List"
        description="Manage QR codes for agents"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-center text-sm font-semibold
                          bg-red-100 text-red-700 rounded-md py-2">
            {message}
          </div>
        )}

        {/* USER TYPE */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">

            <label className="text-right font-medium">
              User Type
            </label>

            <div className="text-center">:</div>

            <select
              className="capsSelect"
              value={userType}
              onChange={(e) =>
                handleUserTypeChange(e.target.value)
              }
            >
              <option value="">Please Select</option>
              <option value="singleUser">Single User</option>
              <option value="multipleUser">Multiple User</option>
            </select>
          </div>
        </div>

        {/* ================= SINGLE USER ================= */}
        {userType === "singleUser" && (
          <>
            <div className="flex justify-center mb-4">
              <div>

                <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
                  <label className="text-right font-medium">
                    User ID
                  </label>

                  <div className="text-center">:</div>

                  <div className="flex gap-2">
                    <input
                      className="capsInput"
                      value={userId}
                      onChange={(e) =>
                        setUserId(e.target.value)
                      }
                    />

                    <button
                      onClick={searchUser}
                      className="capsButton px-4 py-2"
                    >
                      Go
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {singleUser && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-[#226b88] text-sm text-center">

                  <thead>
                    <tr className="capsColor">
                      <th className="border p-2">Agent Name</th>
                      <th className="border p-2">Agent ID</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Remark</th>
                      <th className="border p-2">QR Status</th>
                      <th className="border p-2">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border p-2">
                        {singleUser.agentName}
                      </td>
                      <td className="border p-2 font-medium">
                        {singleUser.agentId}
                      </td>
                      <td className="border p-2">
                        {singleUser.status}
                      </td>

                      <td className="border p-2">
                        <input
                          className="capsInput"
                          value={remark}
                          onChange={(e) =>
                            setRemark(e.target.value)
                          }
                        />
                      </td>

                      <td className="border p-2">
                        <select
                          className="capsSelect"
                          value={qrStatus}
                          onChange={(e) =>
                            setQrStatus(e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Success">Success</option>
                          <option value="Reject">Reject</option>
                          <option value="Discard">Discard</option>
                        </select>
                      </td>

                      <td className="border p-2">
                        <button
                          onClick={() =>
                            updateQRDetails(singleUser.agentId)
                          }
                          className="capsButton px-4 py-1 text-sm"
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            )}
          </>
        )}

        {/* ================= MULTIPLE USER ================= */}
        {userType === "multipleUser" && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">

                <thead>
                  <tr className="capsColor">
                    <th className="border p-2">Select</th>
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">Agent Name</th>
                    <th className="border p-2">Agent ID</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">QR Status</th>
                  </tr>
                </thead>

                <tbody>
                  {userQrDetails.map((item, index) => (
                    <tr key={item.agentId}>
                      <td className="border p-2">
                        <input
                          type="checkbox"
                          checked={checkedList.includes(item.agentId)}
                          onChange={() =>
                            toggleCheckbox(item.agentId)
                          }
                        />
                      </td>

                      <td className="border p-2">
                        {index + 1}
                      </td>

                      <td className="border p-2">
                        {item.agentName}
                      </td>

                      <td className="border p-2 font-medium">
                        {item.agentId}
                      </td>

                      <td className="border p-2">
                        {item.status}
                      </td>

                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${badgeStyle(
                            item.isActive
                          )}`}
                        >
                          {item.isActive ? "Active" : "Deactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 space-x-3">
              <button
                disabled={!checkedList.length}
                onClick={() => batchAction("enable")}
                className="capsButton bg-green-600 hover:bg-green-700"
              >
                Enable
              </button>

              <button
                disabled={!checkedList.length}
                onClick={() => batchAction("disable")}
                className="capsButton bg-red-600 hover:bg-red-700"
              >
                Disable
              </button>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default QrCodeViewList;
