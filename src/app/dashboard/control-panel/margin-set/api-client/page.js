"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAPIClientCommission = () => {
  const [formData, setFormData] = useState({
    corpAgentId: "",
    service: "-1",
    rec_subservice: "",
    aremit_subservice: "DMR-AREMIT",
    aeps_subservice: "AEPS",
    marginType: "Commission",
  });

  const [operatorData, setOperatorData] = useState([]);
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showARemitDiv, setShowARemitDiv] = useState(false);
  const [showAEPSDiv, setShowAEPSDiv] = useState(false);
  const [loading, setLoading] = useState(false);

  // -------------------- FETCH SERVICES
  useEffect(() => {
    const mockServices = [
      "Recharge",
      "Utility",
      "Flights",
      "Bus",
      "Hotel",
      "PayCard",
      "TestMerit",
      "ARemit",
      "AEPS",
      "DTH-X",
      "Ops",
    ];
    setServices(mockServices);
  }, []);

  // -------------------- SUB SERVICES
  useEffect(() => {
    if (formData.service !== "-1") {
      fetchSubServices(formData.service);
      setShowARemitDiv(formData.service === "ARemit");
      setShowAEPSDiv(formData.service === "AEPS");
    } else {
      setSubServices([]);
      setShowARemitDiv(false);
      setShowAEPSDiv(false);
    }
  }, [formData.service]);

  const fetchSubServices = (service) => {
    let mock = [];
    if (service === "Recharge") mock = ["Mobile", "Datacard", "DTH"];
    else if (service === "ARemit")
      mock = ["DMR-AREMIT", "AccountVerification-AREMIT"];
    else if (service === "AEPS") mock = ["AEPS"];
    else mock = [`${service}-Sub1`, `${service}-Sub2`];

    setSubServices(mock);
    if (mock.length) {
      setFormData((p) => ({ ...p, rec_subservice: mock[0] }));
    }
  };

  // -------------------- INPUT HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------- TABLE HANDLERS
  const handleStatusChange = (i, val) => {
    const updated = [...operatorData];
    updated[i].status = val;
    setOperatorData(updated);
  };

  const handleCommMarkChange = (i, val) => {
    const updated = [...operatorData];
    updated[i].commMark = val;
    setOperatorData(updated);
  };

  const handleCommissionChange = (i, val) => {
    const re = /^([0-9]+[.]?[0-9]?[0-9]?|[0-9]+)$/;
    if (!re.test(val) && val !== "") return;

    const updated = [...operatorData];
    updated[i].comm = val;
    setOperatorData(updated);
  };

  // -------------------- SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.corpAgentId.trim())
      return alert("Please Enter Agent Id");
    if (formData.service === "-1")
      return alert("Please select a service");

    try {
      setLoading(true);

      const mockOperatorData = [
        {
          corporateAgntId: formData.corpAgentId,
          operatorName: "Operator 1",
          service: formData.service,
          subservice: formData.rec_subservice,
          status: "Y",
          comm: "10",
          commMark: "P",
        },
        {
          corporateAgntId: formData.corpAgentId,
          operatorName: "Operator 2",
          service: formData.service,
          subservice: formData.rec_subservice,
          status: "N",
          comm: "15",
          commMark: "R",
        },
      ];

      setOperatorData(mockOperatorData);
      setMessage("Data loaded successfully");
      setSelectedRows([]);
      setSelectAll(false);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- SELECT HANDLING
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedRows(checked ? operatorData.map((_, i) => i) : []);
  };

  const handleRowSelection = (i) => {
    let rows = [...selectedRows];
    rows.includes(i)
      ? (rows = rows.filter((r) => r !== i))
      : rows.push(i);

    setSelectedRows(rows);
    setSelectAll(rows.length === operatorData.length);
  };

  // -------------------- BUTTON ACTIONS
  const actionAlert = (text) => {
    if (!selectedRows.length)
      return alert("Please select rows to update");
    alert(text);
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
          Customer Care Module &gt; Edit API Client Commission
        </div>

        {/* FORM */}
        <div className="px-10 py-6">
          <form onSubmit={handleSubmit}>

            <div className={rowClass}>
              <div className={labelClass}>Enter API Client ID</div>
              <div>:</div>
              <input
                name="corpAgentId"
                value={formData.corpAgentId}
                onChange={handleInputChange}
                className={inputClass}
                disabled={loading}
              />
            </div>

            <div className={rowClass}>
              <div className={labelClass}>Select Service</div>
              <div>:</div>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={inputClass}
                disabled={loading}
              >
                <option value="-1">Please Select</option>
                {services.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {!showARemitDiv && !showAEPSDiv && (
              <div className={rowClass}>
                <div className={labelClass}>Select Sub Service</div>
                <div>:</div>
                <select
                  name="rec_subservice"
                  value={formData.rec_subservice}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={loading}
                >
                  <option value="">Select Sub Service</option>
                  {subServices.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showARemitDiv && (
              <div className={rowClass}>
                <div className={labelClass}>Select Sub Service</div>
                <div>:</div>
                <select
                  name="aremit_subservice"
                  value={formData.aremit_subservice}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="DMR-AREMIT">DMR-AREMIT</option>
                  <option value="AccountVerification-AREMIT">
                    AccountVerification-AREMIT
                  </option>
                </select>
              </div>
            )}

            {showAEPSDiv && (
              <div className={rowClass}>
                <div className={labelClass}>Select Sub Service</div>
                <div>:</div>
                <select
                  name="aeps_subservice"
                  value={formData.aeps_subservice}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="AEPS">AEPS</option>
                </select>
              </div>
            )}

            <div className={rowClass}>
              <div className={labelClass}>Select Margin Type</div>
              <div>:</div>
              <select
                name="marginType"
                value={formData.marginType}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="Commission">Commission</option>
                <option value="Surcharge">Surcharge</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className={primaryBtn} disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TABLE */}
      {operatorData.length > 0 && (
        <div className="rounded-xl shadow-lg border border-gray-300 p-4 mt-5">
          <h5 className="text-sm font-semibold mb-3">
            Commission and Status Details
          </h5>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border px-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    /> #
                  </th>
                  <th className="border px-2 py-1">Corporate Agent ID</th>
                  <th className="border px-2 py-1">Operator Name</th>
                  <th className="border px-2 py-1">Service</th>
                  <th className="border px-2 py-1">Sub Service</th>
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">{formData.marginType}</th>
                  <th className="border px-2 py-1">{formData.marginType} Mark</th>
                </tr>
              </thead>

              <tbody>
                {operatorData.map((row, i) => (
                  <tr key={i} className="text-center">
                    <td className="border">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(i)}
                        onChange={() => handleRowSelection(i)}
                      /> {i + 1}
                    </td>
                    <td className="border">{row.corporateAgntId}</td>
                    <td className="border">{row.operatorName}</td>
                    <td className="border">{row.service}</td>
                    <td className="border">{row.subservice}</td>
                    <td className="border px-1">
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={row.status}
                        onChange={(e) =>
                          handleStatusChange(i, e.target.value)
                        }
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </td>
                    <td className="border px-1">
                      <input
                        className="border border-gray-300 rounded px-2 py-1 w-20 text-sm"
                        value={row.comm}
                        onChange={(e) =>
                          handleCommissionChange(i, e.target.value)
                        }
                      />
                    </td>
                    <td className="border px-1">
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={row.commMark}
                        onChange={(e) =>
                          handleCommMarkChange(i, e.target.value)
                        }
                      >
                        <option value="P">P</option>
                        <option value="R">R</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => actionAlert("Status updated successfully")}
              className="px-3 py-1.5 text-sm rounded bg-yellow-500 text-white disabled:opacity-50"
              disabled={!selectedRows.length}
            >
              Update Status
            </button>

            <button
              onClick={() =>
                actionAlert(`${formData.marginType} updated successfully`)
              }
              className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white disabled:opacity-50"
              disabled={!selectedRows.length}
            >
              Update {formData.marginType}
            </button>

            <button
              onClick={() => actionAlert("All updates applied successfully")}
              className="px-3 py-1.5 text-sm rounded bg-green-600 text-white disabled:opacity-50"
              disabled={!selectedRows.length}
            >
              Update All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAPIClientCommission;
