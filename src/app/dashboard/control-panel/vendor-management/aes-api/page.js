"use client";
import React, { useState } from "react";
import { Table } from "antd";

function AESAPI() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({});
  const [showTable, setShowTable] = useState(false);

  const columns = [
    { title: "S.N.", dataIndex: "sn", key: "sn" },
    { title: "Service Type", dataIndex: "serviceType", key: "serviceType" },
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "Action", dataIndex: "action", key: "action" },
    { title: "Pipe Status", dataIndex: "pipeStatus", key: "pipeStatus" },
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
    { title: "Status", dataIndex: "status", key: "status" },
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
    setSuccess("");
    setError("");

    if (!formValues.apiId || !formValues.mainService) {
      setError("Please check input value");
      setLoading(false);
      setShowTable(false);
      return;
    }

    setTimeout(() => {
      setSuccess("Submit successfully.");
      setLoading(false);
      setShowTable(true);
    }, 800);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
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
          API Vendor Management
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleSubmit}>

            <Row label="API ID :">
              <select
                name="apiId"
                className={inputClass}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">item one</option>
                <option value="2">item two</option>
                <option value="3">item three</option>
              </select>
            </Row>

            <Row label="Main Service :">
              <select
                name="mainService"
                className={inputClass}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Recharge">Recharge</option>
                <option value="Billpay">Utility</option>
                <option value="A-REMIT">Money Transfer</option>
                <option value="AEPS">AEPS</option>
                <option value="BBPS">BBPS</option>
                <option value="Settlement">Settlement</option>
              </select>
            </Row>

            {/* STATUS */}
            <div className="text-center min-h-[28px] mb-2">
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
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
            <>
              <div className="text-white font-semibold text-center py-2 mb-3 mt-6 rounded-md bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
                Service Control (APIall)
              </div>

              <Table
                dataSource={[]}
                columns={columns}
                bordered
                pagination={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AESAPI;
