"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const AgentCategorization = () => {
  const [userType, setUserType] = useState("select");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ["Bronze", "Silver", "Gold", "Platinum"];

  const [rows, setRows] = useState({
    Bronze: { checked: false, fromAmount: "", toAmount: "", file: null },
    Silver: { checked: false, fromAmount: "", toAmount: "", file: null },
    Gold: { checked: false, fromAmount: "", toAmount: "", file: null },
    Platinum: { checked: false, fromAmount: "", toAmount: "", file: null },
  });

  const handleChannelChange = (e) => {
    setUserType(e.target.value);
    setShowTable(false);
  };

  const handleSearch = () => {
    if (userType === "select") {
      alert("Please Select Channel.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockData = {
        Bronze: { fromAmount: "0", toAmount: "1000" },
        Silver: { fromAmount: "1001", toAmount: "5000" },
      };

      const updated = { ...rows };

      categories.forEach((cat) => {
        if (mockData[cat]) {
          updated[cat] = {
            ...updated[cat],
            checked: true,
            fromAmount: mockData[cat].fromAmount,
            toAmount: mockData[cat].toAmount,
          };
        }
      });

      setRows(updated);
      setShowTable(true);
      setLoading(false);
    }, 1000);
  };

  const handleRowChange = (category, field, value) => {
    setRows((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const validateAndSubmit = () => {
    const selected = categories.filter((cat) => rows[cat].checked);

    if (selected.length === 0) {
      alert("Please select checkbox");
      return;
    }

    for (const cat of selected) {
      const row = rows[cat];

      if (!row.fromAmount) return alert(`Enter From Slab for ${cat}`);
      if (!row.toAmount) return alert(`Enter To Slab for ${cat}`);

      if (parseInt(row.fromAmount) > parseInt(row.toAmount))
        return alert(`Invalid slab range in ${cat}`);

      if (!row.file) return alert(`Upload file for ${cat}`);
    }

    alert("Submitted Successfully!");
  };

  const handleCancel = () => {
    setShowTable(false);
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Agent Categorization"
        description="Manage agent slab categories and uploads"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* CHANNEL SELECT */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">
            <label className="text-right font-medium">
              Select Channel
            </label>
            <div className="text-center">:</div>
            <select
              value={userType}
              onChange={handleChannelChange}
              className="capsSelect"
            >
              <option value="select">Select</option>
              <option value="agent">Retailer</option>
              <option value="ds">Distributor</option>
              <option value="mds">Master Distributor</option>
            </select>
          </div>
        </div>

        {!showTable && (
          <div className="text-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="capsButton min-w-[120px]"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        )}

        {/* TABLE */}
        {showTable && (
          <>
            <div className="capsColor text-center py-2 font-semibold rounded-md mb-4">
              Category Slabs
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">
                <thead>
                  <tr className="capsColor">
                    <th className="p-2 border">Select</th>
                    <th className="p-2 border">From Slab</th>
                    <th className="p-2 border">To Slab</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Upload</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat}>
                      <td className="p-2 border">
                        <input
                          type="checkbox"
                          checked={rows[cat].checked}
                          onChange={(e) =>
                            handleRowChange(cat, "checked", e.target.checked)
                          }
                        />
                      </td>

                      <td className="p-2 border">
                        <input
                          type="number"
                          className="capsInput w-full"
                          value={rows[cat].fromAmount}
                          onChange={(e) =>
                            handleRowChange(cat, "fromAmount", e.target.value)
                          }
                        />
                      </td>

                      <td className="p-2 border">
                        <input
                          type="number"
                          className="capsInput w-full"
                          value={rows[cat].toAmount}
                          onChange={(e) =>
                            handleRowChange(cat, "toAmount", e.target.value)
                          }
                        />
                      </td>

                      <td className="p-2 border font-semibold">
                        {cat}
                      </td>

                      <td className="p-2 border">
                        <input
                          type="file"
                          className="capsInput w-full"
                          onChange={(e) =>
                            handleRowChange(cat, "file", e.target.files[0])
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-6 space-x-4">
              <button
                onClick={validateAndSubmit}
                className="capsButton"
              >
                Submit
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default AgentCategorization;
