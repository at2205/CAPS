"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function RetailUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [portalList, setPortalList] = useState();
  const [form, setForm] = useState(true);
  const [tableData, setTableData] = useState();
  const [mdsTable, setMdsTable] = useState(false);
  const [pagination] = useState({ current: 1, pageSize: 100 });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [formValues, setFormValues] = useState({
    userId: "",
    userStatusType: "all",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint3 = "/api/getPortalIdList";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const userType =
    typeof window !== "undefined"
      ? localStorage.getItem("adminUserType")
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

  /* ---------------- INPUT ---------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
      userId: userId,
    }));
  };

  /* ---------------- PORTAL LIST ---------------- */

  const getPortalList = async () => {
    if (!userId || !userType) {
      setError("Please login again!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}${endPoint3}`, {
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
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching portal list.");
    }
  };

  useEffect(() => {
    getPortalList();
  }, []);

  /* ---------------- TABLE ---------------- */

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 800);
  };

  const handleSubmit = () => {
    if (!formValues?.userType) {
      notifyError("Please select user type!");
      return;
    }

    notifySuccess("Fetching data...");
    setForm(false);
    setMdsTable(true);
  };

  /* ---------------- COLUMNS ---------------- */

  const mdsColumn = [
    {
      title: "S.N.",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: "Client ID", dataIndex: "portalId" },
    { title: "MDS ID", dataIndex: "mdId" },
    { title: "MDS Name", dataIndex: "mdsName" },
    { title: "Balance", dataIndex: "mdsBalance" },
    { title: "Login Status", dataIndex: "loginStatus" },
    { title: "Block Status", dataIndex: "mdsBlockStatus" },
  ];

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Retail User"
        description="Search and manage retail hierarchy users"
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
                    <option value="mds">Master Distributor</option>
                    <option value="distributor">Distributor</option>
                    <option value="agent">Agent</option>
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
                    name="userStatusType"
                    onChange={handleInputChange}
                    className="capsInput"
                  >
                    <option value="all">All</option>
                    <option value="Activate">Active</option>
                    <option value="Deactive">Deactive</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div className="text-center text-sm mb-2">
                  {success && <p className="text-green-600">{success}</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {loading && <p className="text-gray-500">Loading...</p>}
                </div>

                {/* BUTTONS */}
                <div className="text-center mt-4 flex justify-center gap-4">
                  <button
                    onClick={handleSubmit}
                    className="capsButton min-w-[140px]"
                  >
                    Submit
                  </button>

                  <button
                    onClick={() => {
                      setFormValues({
                        userId: "",
                        userStatusType: "all",
                      });
                      setError("");
                      setSuccess("");
                    }}
                    className="capsButtonSecondary min-w-[140px]"
                  >
                    Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* TABLE */}
        {mdsTable && (
          <>
            <p className="font-semibold mt-6 mb-2">
              Retail User &gt; Master Distributor
            </p>

            <Table
              rowSelection={rowSelection}
              rowKey={(row) => row.mdId}
              columns={mdsColumn}
              dataSource={tableData}
              pagination={pagination}
              size="small"
              bordered
              footer={() => (
                <div className="flex justify-between">
                  <button
                    onClick={start}
                    className="capsButtonSecondary"
                  >
                    Reload
                  </button>
                </div>
              )}
            />
          </>
        )}
      </PageCard>

      <ToastContainer />
    </div>
  );
}

export default RetailUser;
