"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
      setFormData({ ...formData, [name]: value });
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
        ...res.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ];

      setFormData({
        ...formData,
        mdsOptions: options,
        selectedMdsId: "select",
      });
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

      setSkuData(res.data.skuData || []);
      setDisplayInfo({
        category: res.data.category || "",
        clientId: res.data.clientId || "",
        mdsId: res.data.mdsId || "",
      });

      setMessage(res.data.message || "");
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
      const margin = parseFloat(item.SKU_Comm);
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
    const margin = parseFloat(updated[i].SKU_Comm);
    const mdsMargin = (margin * mdShare) / 100;

    updated[i] = {
      ...updated[i],
      Client_Share: commission,
      MD_Share: mdShare,
      MDSMargin: mdsMargin.toFixed(2),
    };

    setSkuData(updated);
  };

  const handleSelectAll = (e) => {
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

  const checkMargin = () => {
    if (!selectedRows.length) return alert("Select rows to update");
    alert("Updated successfully");
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

  const rowClass = "grid grid-cols-[220px_20px_1fr] items-center mb-2";
  const labelClass = "text-sm font-semibold text-right";
  const primaryBtn =
    "mt-2 px-6 py-1.5 text-sm rounded-full text-white bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

  return (
    <div className="max-w-5xl mx-auto py-6">

      {message && (
        <div className="mb-3 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
          {message}
        </div>
      )}

      {/* CARD */}
      <div className="rounded-xl shadow-xl border border-gray-300">
        <div className="text-white font-bold text-lg px-5 py-3 rounded-t-xl bg-gradient-to-r from-[#4fa0c2] to-[#3a89a6]">
          Customer Care Module &gt; Margin Set
        </div>

        {/* FORM */}
        <div className="px-10 py-6">
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-[220px_20px_1fr_90px] items-center mb-2">
              <div className={labelClass}>Client ID</div>
              <div>:</div>
              <input
                name="clientId"
                value={formData.clientId}
                onChange={handleInputChange}
                className={inputClass}
              />
              <button
                type="button"
                onClick={getMDID}
                className="ml-2 px-3 py-1.5 text-sm text-white rounded-md bg-gradient-to-r from-[#4fa0c2] to-[#3a89a6]"
              >
                Go
              </button>
            </div>

            <div className={rowClass}>
              <div className={labelClass}>MDS ID</div>
              <div>:</div>
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
            </div>

            <div className={rowClass}>
              <div className={labelClass}>Service</div>
              <div>:</div>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select Service</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className={rowClass}>
              <div className={labelClass}>Select Share Type</div>
              <div>:</div>
              <select
                name="shareType"
                value={formData.shareType}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="Commission">Commission</option>
                <option value="Surcharge">Surcharge</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className={primaryBtn}>
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* TABLE */}
      {skuData.length > 0 && (
        <div className="rounded-xl shadow-lg border border-gray-300 p-4 mt-5">

          <div className="grid grid-cols-3 text-sm mb-3">
            <div><strong>Category:</strong> {displayInfo.category}</div>
            <div><strong>Client ID:</strong> {displayInfo.clientId}</div>
            <div><strong>MD ID:</strong> {displayInfo.mdsId}</div>
          </div>

          <div className="flex mb-3">
            <input
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-40 mr-2"
              name="bulkCommission"
              value={bulkCommission}
              onChange={handleInputChange}
              placeholder="Client %"
            />
            <button
              onClick={applyBulkCommission}
              className="px-3 py-1.5 text-sm text-white rounded-md bg-[#4fa2c2]"
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
                  <th className="border">#</th>
                  <th className="border">Service</th>
                  <th className="border">Sub-Service</th>
                  <th className="border">Operator</th>
                  <th className="border">Category Margin</th>
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
                    <td className="border px-1">
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

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={checkMargin}
              className="px-4 py-1.5 text-sm rounded bg-green-600 text-white"
            >
              Update Selected
            </button>

            <button
              onClick={resetFunction}
              className="px-4 py-1.5 text-sm rounded bg-gray-500 text-white"
            >
              Reset All
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default MarginSet;
