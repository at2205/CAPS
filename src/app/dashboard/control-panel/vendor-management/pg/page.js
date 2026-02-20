"use client";
import React, { useState } from "react";
import { Table } from "antd";

function AESAPI() {
  const [formValues, setFormValues] = useState({});

  const dataSource = [
    { key: 1, serviceType: "PG", channel: "Web" },
    { key: 2, serviceType: "PG", channel: "API" },
    { key: 3, serviceType: "PG", channel: "Mobile" },
  ];

  const vendorOptions = [
    { label: "RAZORPAY", value: "RAZORPAY" },
    { label: "Cashfree", value: "CASHFREE" },
    { label: "Easebuzz", value: "EASEBUZZ" },
    { label: "Paytm", value: "PAYTM" },
    { label: "PayU", value: "PAYU" },
  ];

  const inputClass =
    "w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const selectClass =
    "w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const slabUI = () => (
    <div className="space-y-1">
      {[
        ["1", "49500"],
        ["49501", "90000"],
        ["90001", "Above"],
      ].map((range, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className={inputClass} defaultValue={range[0]} />
          <span className="text-gray-500 text-sm">-</span>
          <input className={inputClass} defaultValue={range[1]} />
        </div>
      ))}
    </div>
  );

  const vendorSelectUI = () => (
    <div className="space-y-1">
      {[1, 2, 3].map((_, i) => (
        <select key={i} className={selectClass} defaultValue="">
          <option value="">Select Vendor</option>
          {vendorOptions.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );

  const columns = [
    {
      title: "S.N.",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
    },
    {
      title: "Channel",
      dataIndex: "channel",
    },
    {
      title: "Slab (From - To)",
      render: slabUI,
      width: 280,
    },
    {
      title: "Current Vendor",
      render: vendorSelectUI,
      width: 220,
    },
    {
      title: "Previous Vendor",
      render: () => (
        <span className="font-semibold text-gray-700">
          RAZORPAY
        </span>
      ),
    },
    {
      title: "Last Change Date",
      render: () => "02-Feb-2026",
    },
    {
      title: "Action",
      render: () => (
        <button className="px-3 py-1 text-sm text-white rounded-md bg-[#4fa2c2] hover:opacity-90 shadow">
          Update
        </button>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          PG Vendor Management
        </div>

        {/* BODY */}
        <div className="px-4 py-4">
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            size="small"
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

export default AESAPI;
