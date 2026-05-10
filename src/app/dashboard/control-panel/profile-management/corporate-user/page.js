"use client";

import React, { useState } from "react";
import { Table } from "antd";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function CorporateUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [wlClientData, setWlClientData] = useState();
  const [wlTable, setWlTable] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form, setForm] = useState(true);

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
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const portalId =
    typeof window !== "undefined"
      ? localStorage.getItem("adminUserPortalId")
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
    { title: "Client Domain", dataIndex: "domainName" },
    { title: "Company Name", dataIndex: "companyName" },
    { title: "Help Mobile No", dataIndex: "mobileNo" },
    { title: "Login Status", dataIndex: "status" },
    { title: "Block Status", dataIndex: "blockStatus" },
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

    setLoading(true);
    setError("");
    setSuccess("");

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
        setSuccess("WL clients loaded successfully.");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ACTION API ---------------- */

  const handleAction = async (userIds, action, endPointUrl) => {
    if (!userIds.length)
      return notifyError("Please select any user.");

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
      notifyError("Action failed.");
    } finally {
      setLoading(false);
      setSelectedRowKeys([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues?.userType) {
      setError("Please select user type.");
      return;
    }

    if (formValues?.userType === "wlClient") {
      getWlClient();
      setForm(false);
      setWlTable(true);
    }
  };

  const handleLinkClick = (text) => {
    sessionStorage.setItem("adminUserId", text);
    router.push("/white-label-client");
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Corporate User"
        description="Search and manage WL Clients"
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
                    <option value="wlClient">WL Client</option>
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
                    <option value="blocked">Blocked</option>
                    <option value="unblocked">Unblocked</option>
                  </select>
                </div>

                {/* STATUS MESSAGE */}
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
        {wlTable && (
          <>
            <p className="font-semibold mt-6 mb-2">
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
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleAction(
                          selectedRowKeys,
                          "Active",
                          activateDeactivateWLClient
                        )
                      }
                      className="capsButton"
                    >
                      Active
                    </button>

                    <button
                      onClick={() =>
                        handleAction(
                          selectedRowKeys,
                          "Deactive",
                          activateDeactivateWLClient
                        )
                      }
                      className="capsButtonSecondary"
                    >
                      Deactive
                    </button>

                    <button
                      onClick={() =>
                        handleAction(
                          selectedRowKeys,
                          "Blocked",
                          blockUnblockWLClient
                        )
                      }
                      className="capsButtonSecondary"
                    >
                      Block
                    </button>

                    <button
                      onClick={() =>
                        handleAction(
                          selectedRowKeys,
                          "Unblocked",
                          blockUnblockWLClient
                        )
                      }
                      className="capsButtonSecondary"
                    >
                      Unblock
                    </button>
                  </div>
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

export default CorporateUser;
