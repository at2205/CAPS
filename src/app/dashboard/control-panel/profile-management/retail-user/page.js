"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function RetailUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [portalList, setPortalList] = useState();
  const [form, setForm] = useState(true);
  const [tableData, setTableData] = useState();
  const [mdsTable, setMdsTable] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [formValues, setFormValues] = useState({
    userId: "",
    userStatusType: "all",
  });

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint3 = "/api/getPortalIdList";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
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
    }
  };

  useEffect(() => {
    getPortalList();
  }, []);

  /* ---------------- TABLE SELECTION ---------------- */

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const hasSelected = selectedRowKeys.length > 0;

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

  /* ---------------- COLUMNS (shortened demo) ---------------- */

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
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-[850px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-2 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Retail User
        </div>

        {/* FORM */}
        {form && (
          <div className="px-6 py-4 space-y-4">
            
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
                <option value="mds">Master Distributor</option>
                <option value="distributor">Distributor</option>
                <option value="agent">Agent</option>
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
                    {item.portalId} - {item.companyName}
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
                name="userStatusType"
                onChange={handleInputChange}
                className="ml-3 w-56 border rounded-md px-2 py-1 text-sm"
              >
                <option value="all">All</option>
                <option value="Activate">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="text-center text-sm">
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {loading && <p className="text-gray-500">Loading...</p>}
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-1.5 text-white text-sm rounded-md bg-[#4fa2c2] hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* TABLE */}
        {mdsTable && (
          <div className="px-6 pb-6">
            <p className="font-semibold mb-2">
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
                <div className="flex flex-wrap justify-between gap-2">
                  <button
                    onClick={start}
                    disabled={!hasSelected}
                    className="px-3 py-1 text-sm border rounded-md"
                  >
                    Reload
                  </button>

                  <div className="flex gap-2">
                    <button className="btn-action">Active</button>
                    <button className="btn-action">Deactive</button>
                    <button className="btn-action">Block</button>
                    <button className="btn-action">Unblock</button>
                  </div>
                </div>
              )}
            />
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default RetailUser;
