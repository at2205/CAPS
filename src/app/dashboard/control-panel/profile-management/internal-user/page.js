"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function InternalUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [portalList, setPortalList] = useState();
  const [adminUserDetails, setAdminUserDetails] = useState();
  const [apiClientDetails, setApiClientDetails] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const [formValues, setFormValues] = useState({ mappingType: "all" });
  const [adminTable, setAdminTable] = useState(false);
  const [apiClientTable, setApiClientTable] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form, setForm] = useState(true);

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "/api/getPortalIdList";
  const endPoint1 = "/api/adminUserActivation";
  const endPoint2 = "/api/ApiClientActivation";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;
  const userType =
    typeof window !== "undefined"
      ? localStorage.getItem("adminUserType")
      : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ---------------- TOASTS ---------------- */

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      theme: "colored",
      transition: Bounce,
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      theme: "colored",
      transition: Bounce,
    });

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns = [
    {
      title: "S.N.",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Client ID",
      dataIndex: "portalId",
    },
    {
      title: "Admin ID",
      dataIndex: "userId",
      render: (text) => (
        <button
          onClick={() => handleAdminClick(text)}
          className="text-blue-600 hover:underline"
        >
          {text}
        </button>
      ),
    },
    { title: "Admin Name", dataIndex: "userName" },
    { title: "Balance", dataIndex: "userBalance" },
    { title: "Login Status", dataIndex: "loginStatus" },
    { title: "Block Status", dataIndex: "userBlockStatus" },
  ];

  const columnApiClient = [
    {
      title: "S.N.",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: "Client ID", dataIndex: "corporateAgentId" },
    {
      title: "Client Name",
      dataIndex: "userName",
      render: (text, record) => (
        <button
          onClick={() => handleApiClientClick(record)}
          className="text-blue-600 hover:underline"
        >
          {text}
        </button>
      ),
    },
    { title: "Company Name", dataIndex: "companyName" },
    { title: "IP Address", dataIndex: "ip1" },
    { title: "Balance", dataIndex: "userBalance" },
    { title: "Login Status", dataIndex: "loginStatus" },
  ];

  /* ---------------- INPUT CHANGE ---------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
      userId: userId,
    }));
  };

  /* ---------------- FETCH PORTAL LIST ---------------- */

  const getPortalList = async () => {
    if (!userId || !userType) return;

    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ userId, userType }),
      });

      const result = await response.json();

      if (result.status === "0") {
        setPortalList(result?.searchPortalIdList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- FETCH USERS ---------------- */

  const adminUser = async () => {
    const formData = new FormData();
    formData.append(
      "adminUserFormBean",
      JSON.stringify({
        userId: formValues?.userId,
        status: formValues?.mappingType,
        portalId: formValues?.clientId,
      })
    );

    const response = await fetch(`${baseUrl}${endPoint1}`, {
      method: "POST",
      headers: { Authorization: token },
      body: formData,
    });

    const result = await response.json();

    if (result.status === "0") {
      setAdminUserDetails(result?.adminUserSearchList);
    }
  };

  const apiClient = async () => {
    const formData = new FormData();
    formData.append(
      "adminUserFormBean",
      JSON.stringify({
        userId: formValues?.userId,
        status: formValues?.mappingType,
        portalId: formValues?.clientId,
      })
    );

    const response = await fetch(`${baseUrl}${endPoint2}`, {
      method: "POST",
      headers: { Authorization: token },
      body: formData,
    });

    const result = await response.json();

    if (result.status === "0") {
      setApiClientDetails(result?.apiClientSearchList);
    }
  };

  /* ---------------- HANDLERS ---------------- */

  const handleSubmit = () => {
    if (formValues.userType === "adminUser") {
      adminUser();
      setAdminTable(true);
      setForm(false);
    }

    if (formValues.userType === "apiClient") {
      apiClient();
      setApiClientTable(true);
      setForm(false);
    }
  };

  const handleAdminClick = (id) => {
    sessionStorage.setItem("adminUserId", id);
    router.push("/admin-user-profile");
  };

  const handleApiClientClick = (record) => {
    sessionStorage.setItem("adminUserId", record?.corporateAgentId);
    router.push("/api-client-profile");
  };

  useEffect(() => {
    getPortalList();
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-[850px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-2 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Internal User Management
        </div>

        {/* BODY */}
        <div className="px-6 py-4">
          
          {form && (
            <div className="space-y-4">
              
              {/* USER TYPE */}
              <div className="flex justify-center items-center">
                <label className="w-40 text-right font-semibold">
                  Select User Type :
                </label>
                <select
                  name="userType"
                  onChange={handleInputChange}
                  className="ml-3 w-56 border rounded-md px-2 py-1 text-sm"
                >
                  <option value="">Select</option>
                  <option value="adminUser">Admin User</option>
                  <option value="apiClient">AES API Client</option>
                </select>
              </div>

              {/* CLIENT ID */}
              <div className="flex justify-center items-center">
                <label className="w-40 text-right font-semibold">
                  Select Client ID :
                </label>
                <select
                  name="clientId"
                  onChange={handleInputChange}
                  className="ml-3 w-56 border rounded-md px-2 py-1 text-sm"
                >
                  <option value="">Select</option>
                  {portalList?.map((item, i) => (
                    <option key={i} value={item.portalId}>
                      {item.portalId} — {item.companyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* USER ID */}
              <div className="flex justify-center items-center">
                <label className="w-40 text-right font-semibold">
                  User ID :
                </label>
                <input
                  name="userId"
                  placeholder="Enter user id"
                  onChange={handleInputChange}
                  className="ml-3 w-56 border rounded-md px-2 py-1 text-sm"
                />
              </div>

              {/* STATUS */}
              <div className="flex justify-center items-center">
                <label className="w-40 text-right font-semibold">
                  User Status Type :
                </label>
                <select
                  name="mappingType"
                  onChange={handleInputChange}
                  className="ml-3 w-56 border rounded-md px-2 py-1 text-sm"
                >
                  <option value="all">All</option>
                  <option value="Activate">Active</option>
                  <option value="Deactive">Deactive</option>
                </select>
              </div>

              {/* LOADER */}
              {loading && (
                <div className="text-center text-sm text-gray-500">
                  Loading...
                </div>
              )}

              {/* BUTTON */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="px-5 py-1.5 text-white text-sm rounded-md bg-[#4fa2c2] hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* ADMIN TABLE */}
          {adminTable && (
            <>
              <p className="font-semibold mt-4 mb-2">
                Internal User &gt; Admin User
              </p>
              <Table
                rowSelection={rowSelection}
                rowKey={(row) => row.userId}
                columns={columns}
                dataSource={adminUserDetails}
                pagination={pagination}
                size="small"
                bordered
              />
            </>
          )}

          {/* API CLIENT TABLE */}
          {apiClientTable && (
            <>
              <p className="font-semibold mt-4 mb-2">
                Internal User &gt; AES API Client
              </p>
              <Table
                rowSelection={rowSelection}
                rowKey={(row) => row.corporateAgentId}
                columns={columnApiClient}
                dataSource={apiClientDetails}
                pagination={pagination}
                size="small"
                bordered
              />
            </>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default InternalUser;
