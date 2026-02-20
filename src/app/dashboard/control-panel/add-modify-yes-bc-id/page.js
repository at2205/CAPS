"use client";
import React, { useState } from "react";

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

      await new Promise((r) => setTimeout(r, 1200));
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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-xl shadow-sm">

        {/* HEADER */}
        <div className="text-white font-bold text-[16px] px-6 py-3 rounded-t-xl bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6]">
          Control Panel &gt; Add/Modify Yes BC ID
        </div>

        {/* BODY */}
        <div className="p-6">

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
                    <th className="py-2">
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
                          className="w-[180px] px-2 py-1 border rounded-md text-sm"
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
                          className="w-[200px] px-2 py-1 border rounded-md text-sm"
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
                          className="w-[180px] px-2 py-1 border rounded-md text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-1.5 text-white text-sm rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1] flex items-center gap-2 disabled:opacity-50"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                Submit
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="px-5 py-1.5 text-white text-sm rounded-full bg-gradient-to-b from-[#666] to-[#444] disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>

          {/* INSTRUCTIONS BOX */}
          <div className="mt-10 p-4 rounded bg-[#f5fbff] border border-[#cfe7f3]">
            <h5 className="font-bold mb-2 text-[#4e8fb1]">
              Instructions:
            </h5>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Check the box for each row you want to process</li>
              <li>
                All fields (Agent ID, Agent Name, and Yes BC ID)
                are required for selected rows
              </li>
              <li>
                You can select multiple rows at once using the
                "Select All" checkbox
              </li>
              <li>
                Only selected rows will be processed when you click
                Submit
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesBcId;
