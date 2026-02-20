"use client";

import React, { useState } from "react";
import { Table } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function CorporateUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [wlClientData, setWlClientData] = useState();
  const [wlTable, setWlTable] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form, setform] = useState(true);
  const [formValues, setFormValues] = useState({
    userId: "",
    userStatusType: "all",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "/api/WLClientActivation";
  const activateDeactivateWLClient = "/api/activateDeactivateWLClient";
  const blockUnblockWLClient = "/api/blockUnblockWLClient";

  const router = useRouter();

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const portalId =
    typeof window !== "undefined"
      ? localStorage.getItem("adminUserPortalId")
      : null;

  /* ---------------- TOASTS ---------------- */

  const notifySuccess = (dis) =>
    toast.success(dis, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      theme: "colored",
      transition: Bounce,
    });

  const notifyError = (dis) =>
    toast.error(dis, {
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
      dataIndex: "clientId",
      render: (text) => (
        <button
          onClick={() => handleLinkClick(text)}
          className="text-blue-600 hover:underline"
        >
          {text}
        </button>
      ),
    },
    {
      title: "Client Domain",
      dataIndex: "domainName",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Help Mobile No",
      dataIndex: "mobileNo",
    },
    {
      title: "Login Status",
      dataIndex: "status",
    },
    {
      title: "Block Status",
      dataIndex: "blockStatus",
    },
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

  /* ---------------- FETCH CLIENT ---------------- */

  const getWlClient = async () => {
    if (!userId || !portalId) return;

    const formData = new FormData();
    formData.append(
      "adminUserFormBean",
      JSON.stringify({
        userId: formValues?.userId,
        userIdActivation: "",
        userType: formValues?.userType,
        status: formValues?.userStatusType,
        portalId: portalId,
      })
    );

    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      const result = await response.json();

      if (result.status === "0") {
        setWlClientData(result?.whiteLabelClientSearchList);
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- ACTION API ---------------- */

  const allActiveDeactiveWLClient = async (
    userIds,
    action,
    endPointUrl
  ) => {
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "adminUserFormBean",
      JSON.stringify({
        userId: userId,
        portalIds: userIds,
        action: action,
      })
    );

    try {
      const response = await fetch(`${baseUrl}${endPointUrl}`, {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      const result = await response.json();

      if (result.status === "0") {
        notifySuccess(`Selected users ${action}`);
        getWlClient();
      } else {
        notifyError("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      start();
    }
  };

  /* ---------------- BUTTON HANDLERS ---------------- */

  const handleActive = () => {
    if (!selectedRowKeys.length)
      return notifyError("Please select any user.");
    allActiveDeactiveWLClient(
      selectedRowKeys,
      "Active",
      activateDeactivateWLClient
    );
  };

  const handleDeactive = () => {
    if (!selectedRowKeys.length)
      return notifyError("Please select any user.");
    allActiveDeactiveWLClient(
      selectedRowKeys,
      "Deactive",
      activateDeactivateWLClient
    );
  };

  const handleBlock = () => {
    if (!selectedRowKeys.length)
      return notifyError("Please select any user.");
    allActiveDeactiveWLClient(
      selectedRowKeys,
      "Blocked",
      blockUnblockWLClient
    );
  };

  const handleUnblock = () => {
    if (!selectedRowKeys.length)
      return notifyError("Please select any user.");
    allActiveDeactiveWLClient(
      selectedRowKeys,
      "Unblocked",
      blockUnblockWLClient
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues?.userType) {
      setError("Please select user type.");
      return;
    }

    if (formValues?.userType === "wlClient") {
      getWlClient();
      setform(false);
      setWlTable(true);
    }
  };

  const handleLinkClick = (text) => {
    sessionStorage.setItem("adminUserId", text);
    router.push("/white-label-client");
  };

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-[850px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-2 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Corporate User
        </div>

        {/* FORM */}
        {form && (
          <div className="px-6 py-4">
            <form className="space-y-4">
              
              {/* USER TYPE */}
              <div className="flex items-center justify-center">
                <label className="w-40 text-right font-semibold">
                  Select User Type :
                </label>
                <select
                  name="userType"
                  onChange={handleInputChange}
                  className="ml-3 w-52 border rounded-md px-2 py-1 text-sm"
                >
                  <option value="">Select</option>
                  <option value="wlClient">WL Client</option>
                </select>
              </div>

              {/* USER ID */}
              <div className="flex items-center justify-center">
                <label className="w-40 text-right font-semibold">
                  User ID :
                </label>
                <input
                  name="userId"
                  placeholder="Enter user id"
                  onChange={handleInputChange}
                  className="ml-3 w-52 border rounded-md px-2 py-1 text-sm"
                />
              </div>

              {/* STATUS */}
              <div className="flex items-center justify-center">
                <label className="w-40 text-right font-semibold">
                  User Status Type :
                </label>
                <select
                  name="userStatusType"
                  onChange={handleInputChange}
                  className="ml-3 w-52 border rounded-md px-2 py-1 text-sm"
                >
                  <option value="all">All</option>
                  <option value="Activate">Active</option>
                  <option value="Deactive">Deactive</option>
                  <option value="blocked">Blocked</option>
                  <option value="unblocked">Unblocked</option>
                </select>
              </div>

              {/* STATUS MESSAGE */}
              <div className="text-center text-sm">
                {success && <p className="text-green-600">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                {loading && <p className="text-gray-500">Loading...</p>}
              </div>

              {/* SUBMIT */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-1.5 text-white text-sm rounded-md bg-[#4fa2c2] hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE */}
        {formValues?.userType === "wlClient" && wlTable && (
          <div className="px-6 pb-6">
            <p className="font-semibold mb-2">
              Corporate User &gt; WL Client
            </p>

            <Table
              rowSelection={rowSelection}
              rowKey={(row) => row.clientId}
              columns={columns}
              dataSource={wlClientData}
              pagination={pagination}
              size="small"
              bordered
              onChange={(pag) => setPagination(pag)}
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
                    <button onClick={handleActive} className="btn-action">
                      Active
                    </button>
                    <button onClick={handleDeactive} className="btn-action">
                      Deactive
                    </button>
                    <button onClick={handleBlock} className="btn-action">
                      Block
                    </button>
                    <button onClick={handleUnblock} className="btn-action">
                      Unblock
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default CorporateUser;
