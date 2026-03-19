"use client";
import React from "react";
import { Table } from "antd";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function PGVendorManagement() {

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

  const slabUI = () => (
    <div className="space-y-1">
      {[
        ["1", "49500"],
        ["49501", "90000"],
        ["90001", "Above"],
      ].map((range, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className="capsInput" defaultValue={range[0]} />
          <span className="text-gray-400">-</span>
          <input className="capsInput" defaultValue={range[1]} />
        </div>
      ))}
    </div>
  );

  const vendorSelectUI = () => (
    <div className="space-y-1">
      {[1, 2, 3].map((_, i) => (
        <select key={i} className="capsInput" defaultValue="">
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
    { title: "Service Type", dataIndex: "serviceType" },
    { title: "Channel", dataIndex: "channel" },
    {
      title: "Slab (From - To)",
      render: slabUI,
      width: 260,
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
        <button className="capsButtonSecondary px-3 py-1 text-sm">
          Update
        </button>
      ),
      width: 90,
    },
  ];

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="PG Vendor Management"
        description="Manage PG vendor slab & mapping"
      />

      <PageCard>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          size="small"
          pagination={false}
        />
      </PageCard>
    </div>
  );
}

export default PGVendorManagement;
