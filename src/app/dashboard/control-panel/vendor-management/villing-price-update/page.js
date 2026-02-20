"use client";
import React, { useState } from "react";
import { Table } from "antd";

function BillingPriceUpdate() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const buttonClass =
    "px-3 py-1 text-white text-xs rounded-md shadow-sm bg-[#4fa2c2] hover:opacity-90";

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
      width: 100,
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
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Vendor Management &gt; Update Billing Price
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

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
          <div className="flex justify-center mt-4 min-h-[28px]">
            {success && (
              <p className="text-green-600 text-sm">{success}</p>
            )}
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            {loading && (
              <div className="h-4 w-4 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin" />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default BillingPriceUpdate;
