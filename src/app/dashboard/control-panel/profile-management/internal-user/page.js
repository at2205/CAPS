"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function InternalUser() {
  const [loading, setLoading] = useState(false);
  const [portalList, setPortalList] = useState();
  const [adminUserDetails, setAdminUserDetails] = useState();
  const [apiClientDetails, setApiClientDetails] = useState();
  const [pagination] = useState({ current: 1, pageSize: 100 });
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
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

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
    { title: "Client ID", dataIndex: "portalId" },
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
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "adminUserFormBean",
      JSON.stringify({
        userId: formValues?.userId,
        status: formValues?.mappingType,
        portalId: formValues?.clientId,
      })
    );

    try {
      const response = await fetch(`${baseUrl}${endPoint1}`, {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      const result = await response.json();

      if (result.status === "0") {
        setAdminUserDetails(result?.adminUserSearchList);
        notifySuccess("Admin users loaded");
      } else {
        notifyError("Failed to load admin users");
      }
    } catch {
      notifyError("Error fetching admin users");
    } finally {
      setLoading(false);
    }
  };

  const apiClient = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "adminUserFormBean",
      JSON.stringify({
        userId: formValues?.userId,
        status: formValues?.mappingType,
        portalId: formValues?.clientId,
      })
    );

    try {
      const response = await fetch(`${baseUrl}${endPoint2}`, {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      const result = await response.json();

      if (result.status === "0") {
        setApiClientDetails(result?.apiClientSearchList);
        notifySuccess("API clients loaded");
      } else {
        notifyError("Failed to load API clients");
      }
    } catch {
      notifyError("Error fetching API clients");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- HANDLERS ---------------- */

  const handleSubmit = () => {
    if (formValues.userType === "adminUser") {
      adminUser();
      setAdminTable(true);
      setApiClientTable(false);
      setForm(false);
    }

    if (formValues.userType === "apiClient") {
      apiClient();
      setApiClientTable(true);
      setAdminTable(false);
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
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Internal User Management"
        description="Search and manage admin users and AES API clients"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">
            
            {form && (
              <>
                {/* USER TYPE */}
                <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
                  <label className="text-right font-medium">
                    Select User Type
                  </label>
                  <div className="text-center">:</div>

                  <select
                    name="userType"
                    onChange={handleInputChange}
                    className="capsInput"
                  >
                    <option value="">Select</option>
                    <option value="adminUser">Admin User</option>
                    <option value="apiClient">AES API Client</option>
                  </select>
                </div>

                {/* CLIENT ID */}
                <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
                  <label className="text-right font-medium">
                    Select Client ID
                  </label>
                  <div className="text-center">:</div>

                  <select
                    name="clientId"
                    onChange={handleInputChange}
                    className="capsInput"
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
                <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
                  <label className="text-right font-medium">
                    User ID
                  </label>
                  <div className="text-center">:</div>

                  <input
                    name="userId"
                    placeholder="Enter user id"
                    onChange={handleInputChange}
                    className="capsInput"
                  />
                </div>

                {/* STATUS */}
                <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
                  <label className="text-right font-medium">
                    User Status Type
                  </label>
                  <div className="text-center">:</div>

                  <select
                    name="mappingType"
                    onChange={handleInputChange}
                    className="capsInput"
                  >
                    <option value="all">All</option>
                    <option value="Activate">Active</option>
                    <option value="Deactive">Deactive</option>
                  </select>
                </div>

                {/* LOADING */}
                {loading && (
                  <p className="text-center text-sm text-gray-500 mb-2">
                    Loading...
                  </p>
                )}

                {/* BUTTONS */}
                <div className="text-center mt-4 flex justify-center gap-4">
                  <button
                    onClick={handleSubmit}
                    className="capsButton min-w-[140px]"
                  >
                    Submit
                  </button>

                  <button
                    onClick={() => setFormValues({ mappingType: "all" })}
                    className="capsButtonSecondary min-w-[140px]"
                  >
                    Reset
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* TABLES */}
        {adminTable && (
          <>
            <p className="font-semibold mt-6 mb-2">
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

        {apiClientTable && (
          <>
            <p className="font-semibold mt-6 mb-2">
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
      </PageCard>

      <ToastContainer />
    </div>
  );
}

export default InternalUser;
