"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const YesBcId = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      checked: false,
      agentId: "",
      agentName: "",
      yesBCId: "",
    }))
  );

  const [selectAll, setSelectAll] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleCheckboxChange = (index) => {
    const updated = [...rows];
    updated[index].checked = !updated[index].checked;
    setRows(updated);
    setSelectAll(updated.every((r) => r.checked));
  };

  const handleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setRows(rows.map((r) => ({ ...r, checked: newVal })));
  };

  const validateForm = () => {
    const selected = rows.filter((r) => r.checked);

    if (!selected.length) {
      alert("Please select at least one row");
      return false;
    }

    for (const r of selected) {
      if (!r.agentId.trim()) {
        alert(`Enter Agent ID for row ${r.id}`);
        return false;
      }
      if (!r.agentName.trim()) {
        alert(`Enter Agent Name for row ${r.id}`);
        return false;
      }
      if (!r.yesBCId.trim()) {
        alert(`Enter Yes BC ID for row ${r.id}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = rows.filter((r) => r.checked);
      console.log("Submitting:", payload);

      await new Promise((r) => setTimeout(r, 1000));

      setMessage("Yes BC IDs added / modified successfully!");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setRows(
      Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        checked: false,
        agentId: "",
        agentName: "",
        yesBCId: "",
      }))
    );
    setSelectAll(false);
    setMessage("");
  };

  const inputClass = "capsInput";
  const thClass = "py-2";

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > Add / Modify Yes BC ID"
        description="Manage Yes Bank BC mapping for agents"
      />

      <PageCard>
        {/* MESSAGE */}
        {message && (
          <div className="text-center bg-green-100 text-green-700 py-2 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {/* INFO BOX */}
        <div className="mb-4 p-3 rounded bg-[#e9f6fc] border-l-[5px] border-[#4e8fb1] text-sm">
          Please fill in the details for each row and select the rows you want to submit.
        </div>

        <form onSubmit={handleSubmit}>
          {/* TABLE */}
          <div className="border rounded overflow-hidden">
            <table className="w-full text-sm text-center">
              <thead className="bg-[#5a97b5] text-white">
                <tr>
                  <th className={thClass}>
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      Select All
                    </div>
                  </th>
                  <th>Agent Id</th>
                  <th>Agent Name</th>
                  <th>Yes BC Id</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-t ${
                      row.checked ? "bg-[#f0faff]" : ""
                    }`}
                  >
                    <td className="py-2">
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="checkbox"
                          checked={row.checked}
                          onChange={() =>
                            handleCheckboxChange(index)
                          }
                          disabled={loading}
                        />
                        {row.id}
                      </div>
                    </td>

                    <td>
                      <input
                        type="text"
                        placeholder="Enter Agent ID"
                        value={row.agentId}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "agentId",
                            e.target.value
                          )
                        }
                        disabled={loading}
                        className={`${inputClass} w-[180px]`}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        placeholder="Enter Agent Name"
                        value={row.agentName}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "agentName",
                            e.target.value
                          )
                        }
                        disabled={loading}
                        className={`${inputClass} w-[220px]`}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        placeholder="Enter Yes BC ID"
                        value={row.yesBCId}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "yesBCId",
                            e.target.value
                          )
                        }
                        disabled={loading}
                        className={`${inputClass} w-[180px]`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-5 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="capsButton px-10"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="capsButtonSecondary px-10"
            >
              Clear
            </button>
          </div>
        </form>

        {/* INSTRUCTIONS */}
        <div className="mt-10 p-4 rounded bg-[#f5fbff] border border-[#cfe7f3]">
          <h5 className="font-bold mb-2 text-[#4e8fb1]">
            Instructions:
          </h5>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Check the box for each row you want to process</li>
            <li>All fields are required for selected rows</li>
            <li>Use "Select All" to quickly select rows</li>
            <li>Only selected rows will be submitted</li>
          </ul>
        </div>
      </PageCard>
    </div>
  );
};

export default YesBcId;
