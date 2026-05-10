"use client";
import React, { useState } from "react";
import { Table } from "antd";
import Swal from "sweetalert2";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function VendorChannel() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  const serviceMap = {
    Recharge: "Re_Mobile",
    Utility: "Utility",
    "My Remittance": "Remittance",
    "SMS Service": "SMS_Service",
    "TB Request": "TB_Request",
    Remittance: "Remittance",
    All: "All",
  };

  // INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 FLEXIBLE DATA EXTRACT
  const extractData = (res) => {
    if (!res) return [];

    if (Array.isArray(res)) return res;

    if (typeof res === "object") {
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.response)) return res.response;
      if (Array.isArray(res.result)) return res.result;
    }

    if (typeof res === "string") {
      try {
        const parsed = JSON.parse(res);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    }

    return [];
  };

  // 🔥 GET DATA
  const handleSubmit = async () => {
    if (!formValues?.vertical || !formValues?.service) {
      Swal.fire("Error", "Please select required fields", "error");
      return;
    }

    try {
      setLoading(true);

      // 🔥 smart service handling
      let serviceValue = formValues.service;

      // problematic services ke liye mapping
      if (
        formValues.service === "My Remittance" ||
        formValues.service === "Remittance" || // Single Tab Remittance
        formValues.service === "SMS Service"
      ) {
        serviceValue = serviceMap?.[formValues.service];
      }

      const payload = {
        userId: Number(localStorage.getItem("userId")) || 0,
        vertical: formValues.vertical,
        service: serviceValue,
      };

      console.log("FINAL PAYLOAD =>", payload);
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.channelGetDetails,
        new URLSearchParams({
          adminUserFormBean: JSON.stringify(payload),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("API RESPONSE =>", res.data);

      const data = res.data?.getDetails || [];

      if (!data.length) {
        Swal.fire("Info", "No data found", "info");
        setShowTable(false);
        return;
      }

      setShowTable(true);

      // 🔥 mapping (correct UI format)
      const formatted = data.map((item, index) => ({
        key: index,
        serviceType: item.Sub_Service || "-",
        service: item.operator || "-",
        action: item.Active === "Y" ? "Y" : "N",
        vendor: item.vendor || "AESAPI",
        status: item.Active === "Y" ? "Y" : "N",
      }));

      setTableData(formatted);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "API failed", "error");
    } finally {
      setLoading(false);
    }
  };
  // SELECT ALL
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedRows(checked ? tableData.map((r) => r.key) : []);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (selectedRows.length === 0) {
      Swal.fire("Error", "Please select at least one row", "error");
      return;
    }

    const selectedData = tableData.filter((row) =>
      selectedRows.includes(row.key),
    );

    try {
      setLoading(true);

      const updateList = selectedData.map((row) => ({
        Main_Service: formValues.service,
        Sub_Service: row.serviceType,
        operator: row.service,
        vendor: row.vendor,
        Active: row.action,
      }));
      const payload = {
        userId: Number(localStorage.getItem("userId")) || 0,
        vertical: formValues.vertical,
        action: "updateDetails",
        updateList,
      };

      console.log("UPDATE PAYLOAD =>", payload);

      const token = localStorage.getItem("token");

      await axiosInstance.post(
        endpoints.controlPEndpoints.channelUpdateDetails,
        new URLSearchParams({
          adminUserFormBean: JSON.stringify(payload),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Swal.fire("Success", "Updated Successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 TABLE COLUMNS (DEMO MATCH)
  const columns = [
    {
      title: "S.N.",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(record.key)}
          onChange={(e) => {
            let updated = e.target.checked
              ? [...selectedRows, record.key]
              : selectedRows.filter((k) => k !== record.key);

            setSelectedRows(updated);
            setSelectAll(updated.length === tableData.length);
          }}
        />
      ),
      width: 60,
    },
    { title: "Service Type", dataIndex: "serviceType" },
    { title: "Service", dataIndex: "service" },

    {
      title: "Action",
      render: (_, record, index) => (
        <select
          value={record.action}
          className="capsInput"
          onChange={(e) => {
            const updated = [...tableData];
            updated[index].action = e.target.value;
            setTableData(updated);
          }}
        >
          <option value="Y">Y</option>
          <option value="N">N</option>
        </select>
      ),
    },

    {
      title: "Vendor",
      render: (_, record, index) => (
        <select
          value={record.vendor}
          className="capsInput"
          onChange={(e) => {
            const updated = [...tableData];
            updated[index].vendor = e.target.value;
            setTableData(updated);
          }}
        >
          <option value="AESAPI">AESAPI</option>
          <option value="EasyPay">EasyPay</option>
          <option value="NA">NA</option>
        </select>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="Channel Vendor Management" />

      <PageCard>
        <div className="flex justify-center" style={{ margin: "30px auto" }}>
          <div className="w-[520px]">
            <div className="mb-3">
              <label>Vertical :</label>
              <select
                name="vertical"
                value={formValues?.vertical || ""}
                onChange={handleInputChange}
                className="capsInput ml-2"
              >
                <option value="">Select</option>
                <option value="web">web</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Service :</label>
              <select
                name="service"
                value={formValues?.service || ""}
                onChange={handleInputChange}
                className="capsInput ml-2"
              >
                <option value="">Select</option>
                <option value="All">All</option>
                <option value="Recharge">Recharge</option>
                <option value="Utility">Utility</option>
                <option value="My Remittance">My Remittance</option>
                <option value="TB Request">TB Request</option>
                <option value="Remittance">Single Tab Remittance</option>
                <option value="SMS Service">SMS Service</option>
              </select>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleSubmit}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>

            {showTable && (
              <div className="mt-6 w-full overflow-x-auto">
                <div className="min-w-[100px]">
                  <Table
                    rowKey="key"
                    dataSource={tableData}
                    columns={columns}
                    bordered
                    pagination={false}
                    scroll={{ x: true }}
                  />
                </div>

                <div className="text-center mt-4">
                  <button onClick={handleUpdate} className="capsButton">
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default VendorChannel;
