"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const RetailUserView = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    userType: "Select",
    searchUserId: "",
  });

  const [clientId, setClientId] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [clientList, setClientList] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);

  const isAgent = formData.userType === "Agent";
  const isDS = formData.userType === "ds";
  const isMDS = formData.userType === "mds";

  useEffect(() => {
    fetchClientList();
  }, []);

  const fetchClientList = async () => {
    try {
      setClientLoading(true);

      const res = await fetch(
        "http://localhost:8281/CustomerModule/getPortalIdList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "5116",
            userType: "activityAdmin",
          }),
        }
      );

      const data = await res.json();
      setClientList(data?.data?.searchPortalIdList || []);
    } catch (err) {
      console.error(err);
    } finally {
      setClientLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.userType === "Select")
      return alert("Select User Type"), false;
    if (!clientId) return alert("Select Client ID"), false;
    if (!formData.searchUserId.trim())
      return alert("Enter User ID"), false;
    if (!userStatus) return alert("Select Status"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return setShowTable(false);

    try {
      setLoading(true);
      setMessage("");
      setSelectedRows({});
      setShowTable(false);

      const payload = {
        userType: formData.userType,
        portalId: clientId === "All" ? "all" : clientId,
        userId: formData.searchUserId,
        status: "all",
        pageNumber: "1",
      };

      const res = await fetch(
        "http://localhost:8281/CustomerModule/viewRetailUsers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      const list = data?.data?.list || [];

      if (!list.length) {
        setMessage("No users found.");
        return setUserData([]);
      }

      const mapped = list.map((u, i) => ({
        id: i + 1,
        clientId: u.portalId || "-",
        portalId: u.mdPortalID || "-",
        mdsId: u.mdId || "-",
        mdsName: u.mdsName || "-",
        distributorId:
          u.distributorInitial && u.distributorId
            ? `${u.distributorInitial}${u.distributorId}`
            : "-",
        distributorName:
          u.companyName || u.distributorName || "-",
        agentId:
          u.agentInitial && u.agentId
            ? `${u.agentInitial}${u.agentId}`
            : "-",
        agentName: u.agentName || "-",
        kycStatus: u.WLstatus || "-",
        balance: u.mdsBalance || u.agentBalance || "0",
        loginStatus: u.loginStatus || "-",
        blockStatus:
          u.mdsBlockStatus || u.agentBlockStatus || "-",
      }));

      setUserData(mapped);
      setShowTable(true);
      setMessage(`Found ${mapped.length} user(s)`);
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const hasSelection = Object.keys(selectedRows).length > 0;

  const handleViewService = () => {
    if (!hasSelection) return alert("Select a user");

    const selected = userData.find(
      (u) => u.id === Number(Object.keys(selectedRows)[0])
    );

    router.push(
      `/dashboard/customer-care-module/retail-user-view/view-services?userType=${formData.userType}&mdsId=${selected.mdsId}&agentId=${selected.agentId}`
    );
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      {/* HEADER CARD */}
      <CapsCard
        title="Customer Care Module"
        description={formData.userType || "Retail User"}
      />

      {/* BODY CARD */}
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
              className="capsSelect  w-80"
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
              className="capsSelect  w-80"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option value="">
                {clientLoading
                  ? "Loading..."
                  : "Select Client"}
              </option>
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
              className="capsSelect  w-80"
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
                  <tr
                    key={u.id}
                    className={`border-t ${
                      selectedRows[u.id]
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <td className="p-2">{i + 1}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={!!selectedRows[u.id]}
                        onChange={() =>
                          toggleRow(u.id)
                        }
                      />
                    </td>
                    <td className="font-bold capsText">
                      {u.clientId}
                    </td>
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
                disabled={!hasSelection}
                onClick={handleViewService}
                className="capsButton disabled:opacity-50"
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
    <div className="col-span-7">{children}</div>
  </div>
);

export default RetailUserView;
