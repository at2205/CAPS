"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function UserSearch() {
  const [userType, setUserType] = useState("0");
  const [mobileNo, setMobileNo] = useState("");
  const [emailID, setEmailID] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [mdResult, setMdResult] = useState([]);
  const [agentResult, setAgentResult] = useState([]);
  const [adminResult, setAdminResult] = useState([]);
  const [dsResult, setDsResult] = useState([]);
  const digitOnly = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleUpdate = async (item, type) => {
    try {
      const payload = {
        adminId: localStorage.getItem("adminId"),
        userId: item.userID || item.AGID,
        serviceBy: item.serviceBy,
        zone: item.zone,
        tsm: item.tsm,
      };

      const params = new URLSearchParams();
      params.append("adminUserFormBean", JSON.stringify(payload));

      let apiUrl = "";

      if (type === "md") apiUrl = endpoints.daModuleEndpoints.updateMDDetails;
      if (type === "ds") apiUrl = endpoints.daModuleEndpoints.updateDSDetails;
      if (type === "agent")
        apiUrl = endpoints.daModuleEndpoints.updateAgentDetails;

      const response = await axiosInstance.post(apiUrl, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (data.status === "1") {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: data.message || "Update Failed",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message || "Updated Successfully",
      });
    } catch (error) {
      console.log("Update Error:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating.",
      });
    }
  };

  const handleSearch = async () => {
    if (userType === "0") {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please Select User Type",
      });
      return;
    }
    if (!mobileNo && !emailID && !searchUserId) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please Enter At Least One Value",
      });
      return;
    }

    if (mobileNo && mobileNo.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please Enter Valid Mobile Number",
      });
      return;
    }

    const userId = Number(localStorage.getItem("userId"));
    const adminUserType = localStorage.getItem("adminUserType");

    let apiUrl = "";
    switch (userType) {
      case "mds":
        apiUrl = "/DAModule/getMdsUserData";
        break;
      case "agent":
        apiUrl = "/DAModule/getAgentUserData";
        break;
      case "ds":
        apiUrl = "/DAModule/getDSUserData";
        break;
      default:
        apiUrl = "/DAModule/getAdminUserData";
    }

    try {
      setLoading(true);
      setMessage("");
      setMdResult([]);
      setAgentResult([]);
      setAdminResult([]);

      const payload = {
        userId,
        adminUserType,
        mobileNo,
        emailID,
        searchUserId,
      };

      const response = await urlencodedInstance.post(
        apiUrl,
        new URLSearchParams({
          adminUserFormBean: JSON.stringify(payload),
        }),
      );

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      console.log("API RESPONSE →", data);

      if (data.status === "0") {
        const list =
          data.AdminUserData ||
          data.accountStatement ||
          data.agentList ||
          data.data ||
          data.AgentUserData ||
          [];

        console.log("FULL API RESPONSE →", data);
        if (userType === "admin") {
          setAdminResult(list);
        }
        if (userType === "mds") {
          setMdResult(list);
        }
        if (userType === "ds") {
          setDsResult(list);
        }

        if (userType === "agent") {
          setAgentResult(list);
        }
        console.log("Parsed List →", list);

        if (list.length > 0) {
          Swal.fire({
            icon: "success",
            title: "User Found",
            text: "User Found Successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Data Found",
            text: "No records available",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Message",
          text: data.message || "No Data Found",
        });
      }
    } catch (err) {
      console.error("Search Error:", err);

      if (err.response?.status === 401) {
        localStorage.clear();
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please login again",
        }).then(() => {
          localStorage.clear();
          window.location.href = "/";
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard title="User Search" />

      <PageCard>
        {message && (
          <p
            className={`text-center font-semibold mb-4 ${
              message.includes("Successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        {/* SEARCH FORM */}
        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">
            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">Select User</label>
              <span>:</span>
              <select
                className="capsInput"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="0">Select User Type</option>
                <option value="admin">Admin User</option>
                <option value="mds">Master Distributor</option>
                <option value="agent">Agent</option>
                <option value="ds">Distributor</option>
              </select>
            </div>

            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">Mobile Number</label>
              <span>:</span>
              <input
                className="capsInput"
                onKeyDown={digitOnly}
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value.slice(0, 10))}
              />
            </div>

            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">Email ID</label>
              <span>:</span>
              <input
                className="capsInput"
                value={emailID}
                onChange={(e) => setEmailID(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">User ID</label>
              <span>:</span>
              <input
                className="capsInput"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button
                className="capsButton px-10"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? "Searching..." : "SEARCH"}
              </button>
            </div>
          </div>
        </div>
        {/* ================= MASTER DISTRIBUTOR DETAIL ================= */}
        {userType === "mds" && mdResult.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <h3 className="font-bold mb-3 text-[#226b88]">
              Master Distributor Detail
            </h3>

            <table className="w-full border border-[#226b88] text-sm text-center">
              <thead className="bg-[#226b88] text-white">
                <tr>
                  <th className="border border-white p-2">S.N.</th>
                  <th className="border border-white p-2">Portal ID</th>
                  <th className="border border-white p-2">Portal Name</th>
                  <th className="border border-white p-2">MD ID</th>
                  <th className="border border-white p-2">Company Name</th>
                  <th className="border border-white p-2">User Name</th>
                  <th className="border border-white p-2">Service By</th>
                  <th className="border border-white p-2">Zone</th>
                  <th className="border border-white p-2">TSM</th>
                  <th className="border border-white p-2">Current Status</th>
                  <th className="border border-white p-2">Block Status</th>
                  <th className="border border-white p-2">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-[#226b88]">
                {mdResult.map((item, i) => (
                  <tr key={i} className="hover:bg-[#f5fbfd]">
                    <td className="border border-[#226b88] p-2">{i + 1}</td>
                    <td className="border border-[#226b88] p-2">
                      {item.clientID}
                    </td>
                    <td className="border border-[#226b88] p-2">
                      {item.wldCompanyName}
                    </td>
                    <td className="border border-[#226b88] p-2">
                      {item.userID}
                    </td>
                    <td className="border border-[#226b88] p-2">
                      {item.mdCompanyName}
                    </td>
                    <td className="border border-[#226b88] p-2">
                      {item.userName}
                    </td>

                    {/* INPUT FIELDS */}
                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.serviceBy}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.zone}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.tsm}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.loginStatus}
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.blockStatus}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <button
                        onClick={() => handleUpdate(item, "md")}
                        className="px-4 py-1 border border-[#226b88] text-[#226b88] rounded hover:bg-[#226b88] hover:text-white transition"
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
        {/* ================= DISTRIBUTOR DETAIL ================= */}
        {userType === "ds" && dsResult.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <h3 className="font-bold mb-3 text-[#226b88]">
              Distributor Detail
            </h3>

            <table className="w-full border border-[#226b88] text-sm text-center">
              <thead className="bg-[#226b88] text-white">
                <tr>
                  <th className="border border-white p-2">S.N.</th>
                  <th className="border border-white p-2">Portal ID</th>
                  <th className="border border-white p-2">Company Name</th>
                  <th className="border border-white p-2">MD ID</th>
                  <th className="border border-white p-2">Distributor ID</th>
                  <th className="border border-white p-2">Distributor Name</th>
                  <th className="border border-white p-2">Service By</th>
                  <th className="border border-white p-2">Zone</th>
                  <th className="border border-white p-2">TSM</th>
                  <th className="border border-white p-2">Current Status</th>
                  <th className="border border-white p-2">Block Status</th>
                  <th className="border border-white p-2">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-[#226b88]">
                {dsResult.map((item, i) => (
                  <tr key={i} className="hover:bg-[#f5fbfd]">
                    <td className="border border-[#226b88] p-2">{i + 1}</td>

                    <td className="border border-[#226b88] p-2">
                      {item.clientID}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.companyName}
                    </td>

                    <td className="border border-[#226b88] p-2">{item.MDID}</td>

                    <td className="border border-[#226b88] p-2">
                      {item.userID}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.UserName}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.serviceBy}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.zone}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.tsm}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.loginStatus}
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.blockStatus}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <button className="px-4 py-1 border border-[#226b88] text-[#226b88] rounded hover:bg-[#226b88] hover:text-white transition">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* ================= ADMIN DETAIL ================= */}
        {userType === "admin" && adminResult.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <h3 className="font-bold mb-3 text-[#226b88]">Admin User Detail</h3>

            <table className="w-full border border-[#226b88] text-sm text-center">
              <thead className="bg-[#226b88] text-white">
                <tr>
                  <th className="border border-white p-2">S.N.</th>
                  <th className="border border-white p-2">Portal ID</th>
                  <th className="border border-white p-2">Company Name</th>
                  <th className="border border-white p-2">User ID</th>
                  <th className="border border-white p-2">User Name</th>
                  <th className="border border-white p-2">Current Status</th>
                  <th className="border border-white p-2">Block Status</th>
                  <th className="border border-white p-2">User Type</th>
                </tr>
              </thead>

              <tbody className="bg-white text-[#226b88]">
                {adminResult.map((item, i) => (
                  <tr key={i} className="hover:bg-[#f5fbfd]">
                    <td className="border border-[#226b88] p-2">{i + 1}</td>

                    <td className="border border-[#226b88] p-2">
                      {item.clientID}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.companyName}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.userID}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.userName}
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.loginStatus}
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.blockStatus}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.userType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* ================= AGENT DETAIL ================= */}
        {userType === "agent" && agentResult.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <h3 className="font-bold mb-3 text-[#226b88]">Agent Detail</h3>

            <table className="w-full border border-[#226b88] text-sm text-center">
              <thead className="bg-[#226b88] text-white">
                <tr>
                  <th className="border border-white p-2">S.N.</th>
                  <th className="border border-white p-2">Portal ID</th>
                  <th className="border border-white p-2">Portal Name</th>
                  <th className="border border-white p-2">MD ID</th>
                  <th className="border border-white p-2">Distributor ID</th>
                  <th className="border border-white p-2">Agent ID</th>
                  <th className="border border-white p-2">Company Name</th>
                  <th className="border border-white p-2">User Name</th>
                  <th className="border border-white p-2">Service By</th>
                  <th className="border border-white p-2">Zone</th>
                  <th className="border border-white p-2">TSM</th>
                  <th className="border border-white p-2">Current Status</th>
                  <th className="border border-white p-2">Block Status</th>
                  <th className="border border-white p-2">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-[#226b88]">
                {agentResult.map((item, i) => (
                  <tr key={i} className="hover:bg-[#f5fbfd]">
                    <td className="border border-[#226b88] p-2">{i + 1}</td>

                    <td className="border border-[#226b88] p-2">
                      {item.ClientID}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.companyName}
                    </td>

                    <td className="border border-[#226b88] p-2">{item.MDID}</td>

                    <td className="border border-[#226b88] p-2">{item.DSID}</td>

                    <td className="border border-[#226b88] p-2">{item.AGID}</td>

                    <td className="border border-[#226b88] p-2">
                      {item.agencyName}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      {item.agentName}
                    </td>

                    {/* INPUT FIELDS - same style as MD */}
                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.serviceBy}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.zone}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <input
                        type="text"
                        defaultValue={item.tsm}
                        className="w-full border border-[#226b88] px-2 py-1 text-[#226b88] outline-none"
                      />
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.loginStatus}
                    </td>

                    <td className="border border-[#226b88] p-2 font-semibold">
                      {item.blockStatus}
                    </td>

                    <td className="border border-[#226b88] p-2">
                      <button className="px-4 py-1 border border-[#226b88] text-[#226b88] rounded hover:bg-[#226b88] hover:text-white transition">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}{" "}
      </PageCard>
    </div>
  );
}

export default UserSearch;
