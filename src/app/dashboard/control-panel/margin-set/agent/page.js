"use client";
import React, { useState } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const AgentMarginSet = () => {
  const [formData, setFormData] = useState({
    userType: "Select",
    userId: "",
    service: "select",
    subService: "",
  });

  const [skuData, setSkuData] = useState([]);
  const [message, setMessage] = useState("");
  const [displayInfo, setDisplayInfo] = useState({
    category: "",
    displayUserType: "",
    userId: "",
  });

  const [bulkAgentShare, setBulkAgentShare] = useState("0");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSubService, setShowSubService] = useState(false);

  const serviceOptions = [
    { value: "select", label: "Select" },
    { value: "recharge", label: "Recharge" },
    { value: "Utility", label: "Utility" },
    { value: "Flights", label: "Flights" },
    { value: "Bus", label: "Bus" },
    { value: "Hotel", label: "Hotel" },
    { value: "PayCard", label: "PayCard" },
  ];

  const userTypeOptions = [
    { value: "Select", label: "Select" },
    { value: "ByClientId", label: "Client ID" },
    { value: "ByMdId", label: "MDS ID" },
  ];

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[200px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bulkAgentShare") {
      const re = /^([0-9]+[.]?[0-9]?[0-9]?|[0-9]+)$/;
      if (re.test(value) || value === "") setBulkAgentShare(value);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "service") {
      setShowSubService(value === "recharge");
      if (value !== "recharge") {
        setFormData((prev) => ({ ...prev, subService: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.userType === "Select")
      return alert("Please select User Type");

    if (!formData.userId.trim())
      return alert("Please enter User ID");

    if (formData.service === "select")
      return alert("Please select Service");

    try {
      const res = await axios.post("/api/getAgentMarginDetails", formData);

      setSkuData(res.data?.skuData || []);

      const userTypeDisplay =
        formData.userType === "ByClientId"
          ? "Client ID"
          : formData.userType === "ByMdId"
          ? "MDS ID"
          : "Agent ID";

      setDisplayInfo({
        category: res.data?.category || "",
        displayUserType: userTypeDisplay,
        userId: formData.userId,
      });

      setMessage(res.data?.message || "");
      setSelectedRows([]);
      setSelectAll(false);
    } catch {
      alert("Error fetching agent details");
    }
  };

  const applyBulkAgentShare = () => {
    const share = parseFloat(bulkAgentShare);
    if (share > 100) return alert("Cannot exceed 100%");

    const updated = skuData.map((item) => {
      const mdsMargin = parseFloat(item.MDSMargin || 0);

      return {
        ...item,
        AgentShare: share,
        AgentMargin: ((mdsMargin * share) / 100).toFixed(2),
      };
    });

    setSkuData(updated);
  };

  const handleAgentShareChange = (i, value) => {
    const share = parseFloat(value);
    if (share > 100) return alert("Cannot exceed 100%");

    const updated = [...skuData];
    const mdsMargin = parseFloat(updated[i].MDSMargin || 0);

    updated[i] = {
      ...updated[i],
      AgentShare: share,
      AgentMargin: ((mdsMargin * share) / 100).toFixed(2),
    };

    setSkuData(updated);
  };

  const handleSelectAllRows = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedRows(checked ? skuData.map((_, i) => i) : []);
  };

  const handleRowSelection = (i) => {
    let rows = [...selectedRows];

    rows.includes(i)
      ? (rows = rows.filter((r) => r !== i))
      : rows.push(i);

    setSelectedRows(rows);
    setSelectAll(rows.length === skuData.length);
  };

  const resetFunction = () => {
    setSkuData([]);
    setMessage("");
    setBulkAgentShare("0");
    setSelectedRows([]);
    setSelectAll(false);
    setShowSubService(false);
    setFormData({
      userType: "Select",
      userId: "",
      service: "select",
      subService: "",
    });
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module > Agent Margin Set"
        description="Configure agent-level margin share"
      />

      <PageCard>

        {message && (
          <div className="mb-3 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Row label="User Type :">
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className={inputClass}
            >
              {userTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Row>

          <Row label="User ID :">
            <input
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              placeholder="Enter User ID"
              className={inputClass}
            />
          </Row>

          <Row label="Service :">
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={inputClass}
            >
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Row>

          {showSubService && (
            <Row label="Sub Service :">
              <select
                name="subService"
                value={formData.subService}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="mobile">Mobile</option>
                <option value="datacard">Datacard</option>
                <option value="dth">DTH</option>
              </select>
            </Row>
          )}

          <div className="text-center mt-3">
            <button type="submit" className="capsButton px-8">
              Submit
            </button>
          </div>

        </form>

        {/* TABLE */}
        {skuData.length > 0 && (
          <div className="mt-6">

            <div className="grid grid-cols-3 text-sm mb-3">
              <div><strong>Category:</strong> {displayInfo.category}</div>
              <div><strong>User Type:</strong> {displayInfo.displayUserType}</div>
              <div><strong>User ID:</strong> {displayInfo.userId}</div>
            </div>

            <div className="flex justify-center mb-3">
              <input
                value={bulkAgentShare}
                name="bulkAgentShare"
                onChange={handleInputChange}
                placeholder="Agent %"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40 mr-2"
              />
              <button
                onClick={applyBulkAgentShare}
                type="button"
                className="capsButton px-4"
              >
                Apply All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-[#4fa2c2] text-white">
                  <tr>
                    <th className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllRows}
                      />
                    </th>
                    <th className="border">#</th>
                    <th className="border">Service</th>
                    <th className="border">Sub-Service</th>
                    <th className="border">Operator</th>
                    <th className="border">Agent Share %</th>
                  </tr>
                </thead>

                <tbody>
                  {skuData.map((row, i) => (
                    <tr key={i} className="text-center">
                      <td className="border">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(i)}
                          onChange={() => handleRowSelection(i)}
                        />
                      </td>
                      <td className="border">{i + 1}</td>
                      <td className="border">{row.Main_Service}</td>
                      <td className="border">{row.Sub_Service}</td>
                      <td className="border">{row.SKU_Name}</td>
                      <td className="border">
                        <input
                          value={row.AgentShare || ""}
                          onChange={(e) =>
                            handleAgentShareChange(i, e.target.value)
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 w-24 text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button className="capsButton px-4">
                Update Selected
              </button>

              <button
                onClick={resetFunction}
                className="px-4 py-1.5 text-sm rounded-md bg-gray-500 text-white"
              >
                Reset All
              </button>
            </div>

          </div>
        )}

      </PageCard>
    </div>
  );
};

export default AgentMarginSet;
