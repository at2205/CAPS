"use client";
import React, { useState } from "react";
import { Table } from "antd";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function BillingPriceUpdate() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const inputClass = "capsInput";
  const buttonClass = "capsButtonSmall";

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
      render: () => (
        <input type="text" className={inputClass} />
      ),
    },
    {
      title: "Action",
      render: () => (
        <button className={buttonClass}>
          Update
        </button>
      ),
      width: 110,
    },
  ];

  const data = [
    { key: 1, name: "MICRO-ATM", cost: "111.00" },
    { key: 2, name: "MANTRA", cost: "2400.00" },
    { key: 3, name: "PAN ID", cost: "1000.00" },
    { key: 4, name: "IRCTC DONGLE", cost: "2700.00" },
    { key: 5, name: "IRCTC OTP", cost: "1400.00" },
  ];

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Update Billing Price"
        description="Modify vendor billing price configuration"
      />

      <PageCard>

        {/* TITLE STRIP */}
        <div className="bg-[#4fa2c2] text-white font-semibold px-3 py-1.5 rounded-md mb-3 text-sm">
          Billing Price Details
        </div>

        {/* TABLE */}
        <Table
          dataSource={data}
          columns={columns}
          bordered
          size="small"
          pagination={false}
        />

        {/* STATUS */}
        <div className="flex justify-center mt-4 min-h-[28px] text-sm">
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
          {loading && (
            <div className="h-4 w-4 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin" />
          )}
        </div>

      </PageCard>
    </div>
  );
}

export default BillingPriceUpdate;
