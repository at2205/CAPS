"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const PGUserLimitView = () => {

  const [clientId, setClientId] = useState("10002");
  const [mdsId, setMdsId] = useState("");
  const [category, setCategory] = useState("");
  const [mainService, setMainService] = useState("");
  const [subService, setSubService] = useState("");
  const [agentId, setAgentId] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const newErrors = {};

    if (!clientId.trim()) newErrors.clientId = "Client ID required";
    if (!mdsId) newErrors.mdsId = "Select MDS";
    if (!category) newErrors.category = "Select Category";
    if (!mainService) newErrors.mainService = "Select Main Service";
    if (!subService) newErrors.subService = "Select Sub Service";
    if (!agentId.trim()) newErrors.agentId = "Agent ID required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // 🔥 Your API Call Here

      Swal.fire("Success", "Data Loaded", "success");

      // mock data for UI
      setTableData([
        {
          id: 1,
          mainService: "Utility",
          subService: "Digital Mall Charges",
          category: "Postpaid",
          skuName: "SKU Test",
          status: "Active",
          dailyCount: 5,
          minAmt: 10,
          maxAmt: 1000,
        },
      ]);

    } catch (err) {
      Swal.fire("Error", "Something went wrong ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="PG User Limit"
        description="View and manage PG user transaction limits"
      />

      {/* FORM CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div className="grid gap-4 w-full max-w-3xl">

            <FormRow label="Client ID">
              <input
                className={`w-80 ${errors.clientId ? "capsInputError" : "capsInput"}`}
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </FormRow>

            <FormRow label="MDS ID">
              <select
                className="capsSelect w-80"
                value={mdsId}
                onChange={(e) => setMdsId(e.target.value)}
              >
                <option value="">Select</option>
                <option value="all">RO ID-Wise</option>
              </select>
            </FormRow>

            <FormRow label="Category">
              <select
                className="capsSelect w-80"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Postpaid">Postpaid</option>
              </select>
            </FormRow>

            <FormRow label="Main Service">
              <select
                className="capsSelect w-80"
                value={mainService}
                onChange={(e) => setMainService(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Utility">Utility</option>
              </select>
            </FormRow>

            <FormRow label="Sub Service">
              <select
                className="capsSelect w-80"
                value={subService}
                onChange={(e) => setSubService(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Digital Mall Charges">
                  Digital Mall Charges
                </option>
              </select>
            </FormRow>

            <FormRow label="Agent ID">
              <input
                className={`w-80 ${errors.agentId ? "capsInputError" : "capsInput"}`}
                value={agentId}
                onChange={(e) => setAgentId(e.target.value.toUpperCase())}
                placeholder="AGXXXX"
              />
            </FormRow>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[200px]"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>

          </div>
        </div>

        {/* TABLE */}
        {tableData.length > 0 && (
          <div className="mt-8 overflow-x-auto border rounded-lg bg-white">

            <table className="w-full text-sm text-center">

              <thead className="chcolor1 text-white">
                <tr>
                  <th className="p-2">S.N.</th>
                  <th>Main Service</th>
                  <th>Sub Service</th>
                  <th>Category</th>
                  <th>SKU Name</th>
                  <th>Daily Count</th>
                  <th>Min Slab</th>
                  <th>Max Slab</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, i) => (
                  <tr key={row.id} className="border-t">

                    <td>{i + 1}</td>
                    <td>{row.mainService}</td>
                    <td>{row.subService}</td>
                    <td>{row.category}</td>
                    <td>{row.skuName}</td>

                    <td>
                      <input
                        type="number"
                        className="capsInput w-24 text-center"
                        defaultValue={row.dailyCount}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        className="capsInput w-28 text-center"
                        defaultValue={row.minAmt}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        className="capsInput w-28 text-center"
                        defaultValue={row.maxAmt}
                      />
                    </td>

                    <td className="text-red-600 font-semibold">
                      {row.status}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </PageCard>
    </div>
  );
};

/* Reusable Row */
const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-3">
    <label className="text-right font-medium">{label}</label>
    <div className="text-center">:</div>
    <div>{children}</div>
  </div>
);

export default PGUserLimitView;
