"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  /* ================= SERVICES ================= */
  useEffect(() => {
    setServices([
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
    ]);
  }, []);

  /* ================= SUB SERVICES ================= */
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

  /* ================= INPUT ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= TABLE EDIT ================= */
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

  /* ================= SUBMIT ================= */
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

  /* ================= SELECTION ================= */
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

  const actionAlert = (text) => {
    if (!selectedRows.length)
      return alert("Please select rows to update");
    alert(text);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[220px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module > Edit API Client Commission"
        description="Manage commission / surcharge settings"
      />

      <PageCard>

        {message && (
          <div className="mb-3 text-center text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md py-2">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Row label="Enter API Client ID :">
            <input
              name="corpAgentId"
              value={formData.corpAgentId}
              onChange={handleInputChange}
              className={inputClass}
              disabled={loading}
            />
          </Row>

          <Row label="Select Service :">
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={inputClass}
              disabled={loading}
            >
              <option value="-1">Please Select</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Row>

          {!showARemitDiv && !showAEPSDiv && (
            <Row label="Select Sub Service :">
              <select
                name="rec_subservice"
                value={formData.rec_subservice}
                onChange={handleInputChange}
                className={inputClass}
              >
                {subServices.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Row>
          )}

          {showARemitDiv && (
            <Row label="Select Sub Service :">
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
            </Row>
          )}

          {showAEPSDiv && (
            <Row label="Select Sub Service :">
              <select
                name="aeps_subservice"
                value={formData.aeps_subservice}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="AEPS">AEPS</option>
              </select>
            </Row>
          )}

          <Row label="Select Margin Type :">
            <select
              name="marginType"
              value={formData.marginType}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="Commission">Commission</option>
              <option value="Surcharge">Surcharge</option>
            </select>
          </Row>

          <div className="text-center mt-3">
            <button type="submit" className="capsButton px-8">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>

        </form>

        {/* ================= TABLE ================= */}
        {operatorData.length > 0 && (
          <div className="mt-6">

            <div className="text-sm font-semibold mb-2">
              Commission and Status Details
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-[#4fa2c2] text-white">
                  <tr>
                    <th className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      /> #
                    </th>
                    <th className="border">Corporate Agent ID</th>
                    <th className="border">Operator Name</th>
                    <th className="border">Service</th>
                    <th className="border">Sub Service</th>
                    <th className="border">Status</th>
                    <th className="border">{formData.marginType}</th>
                    <th className="border">{formData.marginType} Mark</th>
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
                      <td className="border">
                        <select
                          className="border border-gray-300 rounded px-2 py-1"
                          value={row.status}
                          onChange={(e) =>
                            handleStatusChange(i, e.target.value)
                          }
                        >
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                        </select>
                      </td>
                      <td className="border">
                        <input
                          className="border border-gray-300 rounded px-2 py-1 w-20"
                          value={row.comm}
                          onChange={(e) =>
                            handleCommissionChange(i, e.target.value)
                          }
                        />
                      </td>
                      <td className="border">
                        <select
                          className="border border-gray-300 rounded px-2 py-1"
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

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => actionAlert("Status updated successfully")}
                className="capsButton px-4"
              >
                Update Status
              </button>

              <button
                onClick={() =>
                  actionAlert(`${formData.marginType} updated successfully`)
                }
                className="capsButton px-4"
              >
                Update {formData.marginType}
              </button>

              <button
                onClick={() => actionAlert("All updates applied successfully")}
                className="capsButton px-4"
              >
                Update All
              </button>
            </div>

          </div>
        )}

      </PageCard>
    </div>
  );
};

export default EditAPIClientCommission;
