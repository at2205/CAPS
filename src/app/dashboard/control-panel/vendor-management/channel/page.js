"use client";
import React, { useState } from "react";
import { Table } from "antd";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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
    { title: "Service Type", dataIndex: "serviceType" },
    { title: "Service", dataIndex: "service" },
    {
      title: "Action",
      render: (_, record) => (
        <select defaultValue={record.action} className="capsInput">
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      ),
    },
    {
      title: "Vendor",
      render: (_, record) => (
        <select defaultValue={record.vendor} className="capsInput">
          <option value="AESAPI">AESAPI</option>
          <option value="NA">NA</option>
        </select>
      ),
    },
    { title: "Status", dataIndex: "status" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formValues?.vertical || !formValues?.service) {
      setError("Please select required fields");
      return;
    }

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

  const handleClear = () => {
    setFormValues({});
    setShowTable(false);
    setTableData([]);
    setSuccess("");
    setError("");
  };

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Channel Vendor Management"
        description="Manage vendor mapping configuration"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <FieldRow label="Vertical">
              <select
                name="vertical"
                value={formValues?.vertical || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="Web">Web</option>
              </select>
            </FieldRow>

            <FieldRow label="Service">
              <select
                name="service"
                value={formValues?.service || ""}
                onChange={handleInputChange}
                className="capsInput"
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
            </FieldRow>

            {/* STATUS */}
            <div className="text-center text-sm mb-2">
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {loading && <p className="text-gray-500">Loading...</p>}
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                Submit
              </button>

              <button
                onClick={handleClear}
                className="capsButtonSecondary min-w-[140px]"
              >
                Clear
              </button>
            </div>

            {/* TABLE */}
            {showTable && (
              <div className="mt-6">
                <div className="font-semibold mb-2">
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
      </PageCard>
    </div>
  );
}

export default VendorChannel;
