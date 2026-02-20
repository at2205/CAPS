"use client";

import React, { useState } from "react";
import axios from "axios";

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
      const res = await axios.get("/api/qrcode/viewList");
      setUserQrDetails(res.data || []);
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
      const res = await axios.get(`/api/qrcode/search?userId=${userId}`);
      setSingleUser(res.data || null);
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
      await axios.post("/api/qrcode/batch-action", {
        action,
        users: checkedList,
      });
      loadMultipleUsers();
      setCheckedList([]);
    } catch {
      alert("Technical failure");
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
      await axios.post("/api/qrcode/change-status", {
        agentId,
        qrStatus,
        remark,
      });
      setMessage("Status updated successfully.");
    } catch {
      setMessage("Technical error");
    }
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const selectStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const badgeStyle = (active) =>
    active
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          View QR Code List
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6">

          {/* MESSAGE */}
          {message && (
            <div className="mb-4 text-center text-sm font-semibold
                            text-red-700 bg-red-100 border border-red-200
                            rounded-lg py-2">
              {message}
            </div>
          )}

          {/* ===== USER TYPE ===== */}
          <div className="flex justify-center mb-6">
            <div className="w-[400px]">
              <label className="block font-semibold mb-1">
                User Type
              </label>

              <select
                className={selectStyle}
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
                <div className="w-[400px]">
                  <label className="block font-semibold mb-1">
                    User ID
                  </label>

                  <div className="flex gap-2">
                    <input
                      className={inputStyle}
                      value={userId}
                      onChange={(e) =>
                        setUserId(e.target.value)
                      }
                    />

                    <button
                      onClick={searchUser}
                      className="px-4 py-2 text-white rounded-md text-sm
                                 bg-blue-600 hover:bg-blue-700"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>

              {singleUser && (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm text-center">
                    <thead className="bg-gray-100 font-semibold">
                      <tr>
                        <th className="border p-2">Agent Name</th>
                        <th className="border p-2">Agent ID</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Remark</th>
                        <th className="border p-2">QR Status</th>
                        <th className="border p-2">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="hover:bg-gray-50">
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
                            className={inputStyle}
                            value={remark}
                            onChange={(e) =>
                              setRemark(e.target.value)
                            }
                          />
                        </td>

                        <td className="border p-2">
                          <select
                            className={selectStyle}
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
                            className="px-4 py-1.5 text-white rounded-md text-sm
                                       bg-green-600 hover:bg-green-700"
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
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm text-center">
                  <thead className="bg-gray-100 font-semibold">
                    <tr>
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
                      <tr key={item.agentId} className="hover:bg-gray-50">
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
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeStyle(
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
                  className="px-5 py-2 text-white rounded-lg text-sm shadow
                             bg-green-600 hover:bg-green-700
                             disabled:opacity-50"
                >
                  Enable
                </button>

                <button
                  disabled={!checkedList.length}
                  onClick={() => batchAction("disable")}
                  className="px-5 py-2 text-white rounded-lg text-sm shadow
                             bg-red-600 hover:bg-red-700
                             disabled:opacity-50"
                >
                  Disable
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default QrCodeViewList;
