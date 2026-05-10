"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Swal from "sweetalert2";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function BillingPriceUpdate() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputClass = "capsInput";
  const buttonClass = "capsButtonSmall";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId") || "5155"
      : "5155";

  // =========================
  // GET API
  // =========================
  const getBillingData = async () => {
    try {
      setLoading(true);

      const payload = `adminUserFormBean=${encodeURIComponent(
        JSON.stringify({ userId })
      )}`;

      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.getBillingPageDetails,
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const response =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      const list = response.billingList || [];

      // 🔥 FIX: updateValue blank
      const formattedData = list.map((item, index) => ({
        key: index + 1,
        id: item.id,
        name: item.name,
        cost: item.price,
        updateValue: "", // 👈 BLANK INPUT
      }));

      setTableData(formattedData);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBillingData();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (value, record) => {
    const updatedData = tableData.map((item) =>
      item.id === record.id
        ? { ...item, updateValue: value }
        : item
    );
    setTableData(updatedData);
  };

  // =========================
  // UPDATE API
  // =========================
  const handleUpdate = async (record) => {
    try {
      // 🔥 VALIDATION
      if (record.updateValue === "") {
        Swal.fire("Error", "Please enter amount", "error");
        return;
      }

      setLoading(true);

      const payload = `adminUserFormBean=${encodeURIComponent(
        JSON.stringify({
          userId,
          id: record.id,
          amount: String(record.updateValue), // 👈 FIX for 0
        })
      )}`;

      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.updateBillingDetail,
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const response =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      if (response.status === "0") {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          confirmButtonColor: "#5fa0b5",
        });

        // 🔥 INSTANT UI UPDATE (no reload)
        const updatedTable = tableData.map((item) =>
          item.id === record.id
            ? {
                ...item,
                cost: record.updateValue,
                updateValue: "",
              }
            : item
        );

        setTableData(updatedTable);
      } else {
        Swal.fire("Error", response.message || "Update failed", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // TABLE
  // =========================
  const columns = [
    {
      title: "S.N.",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Item Name",
      dataIndex: "name",
    },
    {
      title: "Cost",
      dataIndex: "cost",
    },
    {
      title: "Update",
      render: (_, record) => (
        <input
          type="number"
          className={inputClass}
          value={record.updateValue}
          placeholder="Enter amount"
          onChange={(e) =>
            handleChange(e.target.value, record)
          }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <button
          className={buttonClass}
          onClick={() => handleUpdate(record)}
        >
          Update
        </button>
      ),
      width: 110,
    },
  ];

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Update Billing Price"
        description="Modify vendor billing price configuration"
      />

      <PageCard>
        <div className="bg-[#4fa2c2] text-white font-semibold px-3 py-1.5 rounded-md mb-3 text-sm">
          Billing Price Details
        </div>

        <Table
          dataSource={tableData}
          columns={columns}
          bordered
          size="small"
          pagination={false}
          loading={loading}
        />
      </PageCard>
    </div>
  );
}

export default BillingPriceUpdate;