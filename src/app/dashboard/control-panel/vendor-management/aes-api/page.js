"use client";
import React, { useState } from "react";
import { Table } from "antd";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function AESAPI() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({});
  const [showTable, setShowTable] = useState(false);

  const columns = [
    { title: "S.N.", dataIndex: "sn", key: "sn", width: 70 },
    { title: "Service Type", dataIndex: "serviceType" },
    { title: "Service", dataIndex: "service" },
    { title: "Action", dataIndex: "action" },
    { title: "Pipe Status", dataIndex: "pipeStatus" },
    { title: "Vendor", dataIndex: "vendor" },
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
    if (!formValues?.apiId || !formValues?.mainService) {
      setError("Please check input value");
      setShowTable(false);
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    // 🔴 API CALL HERE
    setTimeout(() => {
      setLoading(false);
      setSuccess("Submit successfully.");
      setShowTable(true);
    }, 800);
  };

  const handleClear = () => {
    setFormValues({});
    setSuccess("");
    setError("");
    setShowTable(false);
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
        title="API Vendor Management"
        description="Manage API vendor & service control"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <FieldRow label="API ID">
              <select
                name="apiId"
                value={formValues?.apiId || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="1">Item One</option>
                <option value="2">Item Two</option>
                <option value="3">Item Three</option>
              </select>
            </FieldRow>

            <FieldRow label="Main Service">
              <select
                name="mainService"
                value={formValues?.mainService || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="Recharge">Recharge</option>
                <option value="Billpay">Utility</option>
                <option value="A-REMIT">Money Transfer</option>
                <option value="AEPS">AEPS</option>
                <option value="BBPS">BBPS</option>
                <option value="Settlement">Settlement</option>
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
                <div className="font-semibold mb-2 text-center">
                  Service Control (APIall)
                </div>

                <Table
                  dataSource={[]}
                  columns={columns}
                  bordered
                  pagination={false}
                  size="small"
                />
              </div>
            )}

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default AESAPI;
