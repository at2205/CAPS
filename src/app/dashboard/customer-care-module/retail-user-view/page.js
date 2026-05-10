"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

const RetailUserView = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    userType: "Select",
    searchUserId: "",
  });

  const [clientId, setClientId] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const [clientList, setClientList] = useState([]);
  const [userData, setUserData] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);

  // ---------------- CLIENT LIST API ----------------

  useEffect(() => {
    getClientList();
  }, []);

  const getClientList = async () => {

    try {

      const payload = {
        userId: localStorage.getItem("userId"),
        userType: localStorage.getItem("adminUserType"),
      };

      const res = await axiosInstance.post(
        endpoints.customerCareEndpoints.getPortalIdList,
        payload
      );

      setClientList(res?.data?.data?.searchPortalIdList || []);
    } catch (error) {

      console.error(error);
      setMessage("Failed to load client list");

    }

  };

  // ---------------- INPUT CHANGE ----------------

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ---------------- VALIDATION ----------------

  const validateForm = () => {

    if (formData.userType === "Select")
      return alert("Select User Type"), false;

    if (!clientId)
      return alert("Select Client"), false;

    if (!formData.searchUserId.trim())
      return alert("Enter User ID"), false;

    if (!userStatus)
      return alert("Select Status"), false;

    return true;

  };

  // ---------------- SEARCH USERS API ----------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);
      setMessage("");
      setShowTable(false);
      setSelectedRow(null);

      const payload = {

        userType:
          formData.userType === "Agent"
            ? "agent"
            : formData.userType === "ds"
            ? "distributor"
            : "mds",

        portalId: clientId === "All" ? "all" : clientId,

        userId: formData.searchUserId,

        status: userStatus.toLowerCase(),

        pageNumber: "1",
      };

      const res = await axiosInstance.post(
        endpoints.customerCareEndpoints.viewRetailUsers,
        payload
      );

      const list = res?.data?.data?.list || [];

      if (!list.length) {

        setUserData([]);
        setMessage("No users found.");
        return;

      }

      const mapped = list.map((u, i) => ({

        id: i + 1,

        clientId: u.portalId || "-",

        portalId: u.mdPortalID || "-",

        balance: u.mdsBalance || u.agentBalance || "0",

        loginStatus: u.loginStatus || "-",

        blockStatus: u.mdsBlockStatus || u.agentBlockStatus || "-",

        agentId:
          u.agentInitial && u.agentId
            ? `${u.agentInitial}${u.agentId}`
            : "",

        mdsId: u.mdId || "",

      }));

      setUserData(mapped);
      setShowTable(true);

      setMessage(`Found ${mapped.length} user(s)`);

    } catch (error) {

      console.error(error);
      setMessage("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  // ---------------- ROW SELECT ----------------

  const handleRowSelect = (row) => {

    setSelectedRow(row);

  };

  // ---------------- VIEW SERVICE ----------------

  const handleViewService = async () => {

    if (!selectedRow)
      return alert("Select a user");

    try {

      const payload = {
        agentId: selectedRow.agentId,
      };

      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append(
        "adminUserFormBean",
        JSON.stringify(payload)
      );

      const res = await axiosInstance.post(
        endpoints.customerCareEndpoints.viewAgentProfile,
        formDataEncoded,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      const data = res?.data?.data;

      router.push(
        `/dashboard/customer-care-module/retail-user-view/view-services?agentId=${data.agentId}`
      );

    } catch (error) {

      console.error(error);
      alert("Failed to load agent profile");

    }

  };

  return (

    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module"
        description="Retail User"
      />

      <PageCard>

        {message && (
          <div className="bg-[#def6ff] text-center py-2 rounded mb-4">
            {message}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-4"
        >

          <FormRow label="User Type">

            <select
              className="capsSelect w-80"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
            >

              <option value="Select">Select</option>
              <option value="mds">Master Distributor</option>
              <option value="ds">Distributor</option>
              <option value="Agent">Agent</option>

            </select>

          </FormRow>

          <FormRow label="Client">

            <select
              className="capsSelect w-80"
              value={clientId}
              onChange={(e) =>
                setClientId(e.target.value)
              }
            >

              <option value="">Select Client</option>
              <option value="All">All</option>

              {clientList.map((c, i) => (

                <option key={i} value={c.portalId}>
                  {c.portalId} - {c.companyName}
                </option>

              ))}

            </select>

          </FormRow>

          <FormRow label="User ID">

            <input
              className="capsInput w-80"
              name="searchUserId"
              value={formData.searchUserId}
              onChange={handleInputChange}
            />

          </FormRow>

          <FormRow label="Status">

            <select
              className="capsSelect w-80"
              value={userStatus}
              onChange={(e) =>
                setUserStatus(e.target.value)
              }
            >

              <option value="">Select</option>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>

            </select>

          </FormRow>

          <div className="text-center">

            <button
              disabled={loading}
              className="capsButton"
            >
              {loading ? "Searching..." : "Submit"}
            </button>

          </div>

        </form>

        {/* TABLE */}

        {showTable && userData.length > 0 && (

          <div className="mt-6 border rounded-lg overflow-x-auto">

            <table className="w-full text-sm text-center">

              <thead className="chcolor1 text-white">

                <tr>
                  <th className="border p-2">S.N.</th>
                  <th className="border">Select</th>
                  <th className="border">Client</th>
                  <th className="border">Portal</th>
                  <th className="border">Balance</th>
                  <th className="border">Login</th>
                  <th className="border">Block</th>
                </tr>

              </thead>

              <tbody>

                {userData.map((u, i) => (

                  <tr key={u.id} className="border-t">

                    <td>{i + 1}</td>

                    <td>

                      <input
                        type="radio"
                        checked={
                          selectedRow?.id === u.id
                        }
                        onChange={() =>
                          handleRowSelect(u)
                        }
                      />

                    </td>

                    <td>{u.clientId}</td>
                    <td>{u.portalId}</td>
                    <td>{u.balance}</td>
                    <td>{u.loginStatus}</td>
                    <td>{u.blockStatus}</td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="p-4 text-center">

              <button
                disabled={!selectedRow}
                onClick={handleViewService}
                className="capsButton"
              >
                View Service
              </button>

            </div>

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

export default RetailUserView;