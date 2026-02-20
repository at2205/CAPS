"use client";
import React, { useState } from "react";
import { Table } from "antd";

function VendorChannel() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "S.N.",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
    },
    {
      title: "Service",
      dataIndex: "service",
    },
    {
      title: "Action",
      render: (_, record) => (
        <select
          defaultValue={record.action}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
        >
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      ),
    },
    {
      title: "Vendor",
      render: (_, record) => (
        <select
          defaultValue={record.vendor}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
        >
          <option value="AESAPI">AESAPI</option>
          <option value="NA">NA</option>
        </select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      setTableData([
        {
          key: 1,
          serviceType: formValues.vertical,
          service: formValues.service,
          action: "Y",
          vendor: "AESAPI",
          status: "Active",
        },
        {
          key: 2,
          serviceType: formValues.vertical,
          service: formValues.service,
          action: "N",
          vendor: "NA",
          status: "Inactive",
        },
      ]);

      setShowTable(true);
      setSuccess("Data loaded successfully");
      setLoading(false);
    }, 1000);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-4">
      <label className="w-[160px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Channel Vendor Management
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleSubmit}>

            <Row label="Vertical :">
              <select
                name="vertical"
                required
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="Web">Web</option>
              </select>
            </Row>

            <Row label="Service :">
              <select
                name="service"
                required
                onChange={handleInputChange}
                className={inputClass}
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
            </Row>

            {/* STATUS */}
            <div className="text-center min-h-[24px]">
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              {loading && (
                <div className="flex justify-center">
                  <div className="h-4 w-4 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                Submit
              </button>
            </div>

          </form>

          {/* TABLE */}
          {showTable && (
            <div className="mt-6">
              <div className="bg-[#4fa2c2] text-white font-semibold px-3 py-1.5 rounded-md mb-3 text-sm">
                Vendor Mapping Details
              </div>

              <Table
                dataSource={tableData}
                columns={columns}
                bordered
                size="small"
                pagination={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorChannel;
