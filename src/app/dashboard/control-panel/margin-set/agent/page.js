"use client";
import React, { useState } from "react";
import axios from "axios";

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
    userType: "",
    userId: "",
    displayUserType: "",
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
    { value: "TestMerit", label: "TestMerit" },
    { value: "dth", label: "DTH-X" },
    { value: "Ops", label: "Ops" },
  ];

  const userTypeOptions = [
    { value: "Select", label: "Select" },
    { value: "ByClientId", label: "Client ID" },
    { value: "ByMdId", label: "MDS ID" },
  ];

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const labelClass = "text-sm font-semibold text-right";
  const rowClass = "grid grid-cols-[180px_20px_1fr] items-center mb-2";
  const primaryBtn =
    "px-6 py-1.5 text-sm rounded-full text-white bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

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
      return alert("Please select a valid User Type");
    if (!formData.userId.trim())
      return alert("Please enter a valid User ID");
    if (formData.service === "select")
      return alert("Please select a Service");

    try {
      const res = await axios.post("/api/getAgentMarginDetails", formData);

      setSkuData(res.data.skuData || []);

      const userTypeDisplay =
        formData.userType === "ByClientId"
          ? "Client ID"
          : formData.userType === "ByMdId"
          ? "MDS ID"
          : "Agent ID";

      setDisplayInfo({
        category: res.data.category || "",
        userType: formData.userType,
        userId: formData.userId,
        displayUserType: userTypeDisplay,
      });

      setMessage(res.data.message || "");
      setSelectedRows([]);
      setSelectAll(false);
    } catch {
      alert("Error fetching agent details");
    }
  };

  const applyBulkAgentShare = () => {
    const share = parseFloat(bulkAgentShare);
    if (share > 100) return alert("Agent Share cannot exceed 100%");
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
    if (share > 100) return alert("Agent Share cannot exceed 100%");
    const updated = [...skuData];
    const mdsMargin = parseFloat(updated[i].MDSMargin || 0);
    updated[i].AgentShare = share;
    updated[i].AgentMargin = ((mdsMargin * share) / 100).toFixed(2);
    setSkuData(updated);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedRows(checked ? skuData.map((_, i) => i) : []);
  };

  const handleRowSelection = (i) => {
    let rows = [...selectedRows];
    rows.includes(i) ? (rows = rows.filter((r) => r !== i)) : rows.push(i);
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
    <div className="max-w-5xl mx-auto py-6">

      {message && (
        <div className="mb-3 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
          {message}
        </div>
      )}

      {/* CARD */}
      <div className="rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">
        <div className="text-white font-bold text-lg px-5 py-3 rounded-t-xl bg-gradient-to-r from-[#4fa0c2] to-[#3a89a6]">
          Customer Care Module &gt; Agent Margin Set
        </div>

        <div className="px-10 py-6">
          <form onSubmit={handleSubmit}>

            <div className={rowClass}>
              <div className={labelClass}>User Type</div>
              <div>:</div>
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
            </div>

            <div className={rowClass}>
              <div className={labelClass}>User ID</div>
              <div>:</div>
              <input
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="Enter User ID"
                className={inputClass}
              />
            </div>

            <div className={rowClass}>
              <div className={labelClass}>Service</div>
              <div>:</div>
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
            </div>

            {showSubService && (
              <div className={`${rowClass} mb-4`}>
                <div className={labelClass}>Sub Service</div>
                <div>:</div>
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
              </div>
            )}

            <div className="text-center mt-3">
              <button type="submit" className={primaryBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TABLE CARD */}
      {skuData.length > 0 && (
        <div className="rounded-xl border border-gray-300 shadow-lg p-4 mt-5">

          <div className="grid grid-cols-3 text-sm mb-3">
            <div><strong>Category:</strong> {displayInfo.category}</div>
            <div><strong>User Type:</strong> {displayInfo.displayUserType}</div>
            <div><strong>User ID:</strong> {displayInfo.userId}</div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input
              value={bulkAgentShare}
              name="bulkAgentShare"
              onChange={handleInputChange}
              placeholder="Agent %"
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40"
            />
            <button
              onClick={applyBulkAgentShare}
              type="button"
              className="px-3 py-1.5 text-sm rounded-md text-white bg-[#4fa2c2]"
            >
              Apply All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border px-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border px-2 py-1">#</th>
                  <th className="border px-2 py-1">Service</th>
                  <th className="border px-2 py-1">Sub-Service</th>
                  <th className="border px-2 py-1">Operator</th>
                  <th className="border px-2 py-1">Agent Share %</th>
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
                    <td className="border px-2 py-1">
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

          <div className="flex justify-end gap-2 mt-3">
            <button className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white">
              Update Selected
            </button>
            <button
              onClick={resetFunction}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-500 text-white"
            >
              Reset All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentMarginSet;
