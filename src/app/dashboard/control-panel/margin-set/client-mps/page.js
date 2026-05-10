"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const MarginSet = () => {
  const [formData, setFormData] = useState({
    clientId: "",
    serviceType: "",
    shareType: "Commission",
    mdsOptions: [{ value: "select", label: "------- Select -------" }],
    selectedMdsId: "select",
  });

  const [skuData, setSkuData] = useState([]);
  const [message, setMessage] = useState("");
  const [displayInfo, setDisplayInfo] = useState({
    category: "",
    clientId: "",
    mdsId: "",
  });

  const [bulkCommission, setBulkCommission] = useState("0");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(["Service1", "Service2", "Service3"]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bulkCommission") {
      const re = /^([0-9]+[.]?[0-9]?[0-9]?|[0-9]+)$/;
      if (re.test(value) || value === "") {
        setBulkCommission(value);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getMDID = async () => {
    if (!formData.clientId.trim()) {
      alert("Please enter a valid Client ID");
      return;
    }

    try {
      const res = await axios.post(`/api/getMdid?Id=${formData.clientId}`);

      const options = [
        { value: "select", label: "------- Select -------" },
        ...(res.data || []).map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ];

      setFormData((prev) => ({
        ...prev,
        mdsOptions: options,
        selectedMdsId: "select",
      }));
    } catch {
      alert("Error fetching MDS ID");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.selectedMdsId === "select") {
      alert("Please select a valid MDS ID");
      return;
    }

    try {
      const res = await axios.post("/api/getWLMDDetails", {
        clientId: formData.clientId,
        mdsId: formData.selectedMdsId,
        serviceType: formData.serviceType,
        shareType: formData.shareType,
      });

      setSkuData(res.data?.skuData || []);
      setDisplayInfo({
        category: res.data?.category || "",
        clientId: res.data?.clientId || "",
        mdsId: res.data?.mdsId || "",
      });

      setMessage(res.data?.message || "");
      setSelectedRows([]);
      setSelectAll(false);
    } catch {
      alert("Error fetching details");
    }
  };

  const applyBulkCommission = () => {
    const commission = parseFloat(bulkCommission);
    if (commission > 100) return alert("Cannot be greater than 100%");

    const updated = skuData.map((item) => {
      const mdShare = 100 - commission;
      const margin = parseFloat(item.SKU_Comm || 0);
      const mdsMargin = (margin * mdShare) / 100;

      return {
        ...item,
        Client_Share: commission,
        MD_Share: mdShare,
        MDSMargin: mdsMargin.toFixed(2),
      };
    });

    setSkuData(updated);
  };

  const handleCommissionChange = (i, value) => {
    const commission = parseFloat(value);
    if (commission > 100) return alert("Total cannot exceed 100");

    const updated = [...skuData];
    const mdShare = 100 - commission;
    const margin = parseFloat(updated[i].SKU_Comm || 0);
    const mdsMargin = (margin * mdShare) / 100;

    updated[i] = {
      ...updated[i],
      Client_Share: commission,
      MD_Share: mdShare,
      MDSMargin: mdsMargin.toFixed(2),
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
    setDisplayInfo({ category: "", clientId: "", mdsId: "" });
    setFormData({
      clientId: "",
      serviceType: "",
      shareType: "Commission",
      mdsOptions: [{ value: "select", label: "------- Select -------" }],
      selectedMdsId: "select",
    });
    setBulkCommission("0");
    setSelectedRows([]);
    setSelectAll(false);
    setMessage("");
  };

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

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module > Margin Set"
        description="Manage commission / surcharge share distribution"
      />

      <PageCard>

        {message && (
          <div className="mb-3 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Row label="Client ID :">
            <div className="flex">
              <input
                name="clientId"
                value={formData.clientId}
                onChange={handleInputChange}
                className={inputClass}
              />
              <button
                type="button"
                onClick={getMDID}
                className="ml-2 px-4 capsButton"
              >
                Go
              </button>
            </div>
          </Row>

          <Row label="MDS ID :">
            <select
              name="selectedMdsId"
              value={formData.selectedMdsId}
              onChange={handleInputChange}
              className={inputClass}
            >
              {formData.mdsOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Row>

          <Row label="Service :">
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Row>

          <Row label="Share Type :">
            <select
              name="shareType"
              value={formData.shareType}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="Commission">Commission</option>
              <option value="Surcharge">Surcharge</option>
            </select>
          </Row>

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
              <div><strong>Client ID:</strong> {displayInfo.clientId}</div>
              <div><strong>MD ID:</strong> {displayInfo.mdsId}</div>
            </div>

            <div className="flex mb-3 justify-center">
              <input
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40 mr-2"
                name="bulkCommission"
                value={bulkCommission}
                onChange={handleInputChange}
                placeholder="Client %"
              />
              <button
                onClick={applyBulkCommission}
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
                    <th className="border">Margin</th>
                    <th className="border">Client %</th>
                    <th className="border">RO %</th>
                    <th className="border">RO Margin</th>
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
                      <td className="border">{row.SKU_Comm}</td>

                      <td className="border">
                        <input
                          className="border border-gray-300 rounded px-2 py-1 w-20"
                          value={row.Client_Share || ""}
                          onChange={(e) =>
                            handleCommissionChange(i, e.target.value)
                          }
                        />
                      </td>

                      <td className="border">
                        <input
                          readOnly
                          className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-20"
                          value={row.MD_Share || ""}
                        />
                      </td>

                      <td className="border">
                        <input
                          readOnly
                          className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-24"
                          value={row.MDSMargin || ""}
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

export default MarginSet;
