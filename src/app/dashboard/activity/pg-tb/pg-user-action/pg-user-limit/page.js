"use client";

import React, { useState } from "react";

const PGUserLimit = () => {
  const [clientId, setClientId] = useState("");
  const [showForms, setShowForms] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");

  const [formData, setFormData] = useState({
    mdsId: "",
    category: "",
    mainService: "",
    subService: "",
    fullAgentId: "",
    agentId: "",
    file: null,
  });

  const handleGo = () => {
    if (!clientId.trim()) {
      alert("Please enter Client Id");
      return;
    }
    setShowForms(true);
  };

  const handleSubmit = () => {
    console.log({ clientId, selectedForm, formData });
    alert("PG User Limit submitted (frontend only)");
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const selectStyle = inputStyle;

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          PG User Limit
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-8">

          {/* ===== CLIENT ID ===== */}
          <div className="flex justify-center mb-6">
            <div className="w-[600px] flex items-center gap-3">

              <label className="font-semibold w-[120px] text-right">
                Client Id
              </label>

              <input
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className={inputStyle}
              />

              <button
                onClick={handleGo}
                className="px-4 py-2 text-white rounded-lg shadow
                           bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                           hover:opacity-90 transition"
              >
                GO
              </button>
            </div>
          </div>

          {/* ===== RADIO ===== */}
          {showForms && (
            <div className="flex justify-center gap-10 mb-6">
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  checked={selectedForm === "single"}
                  onChange={() => setSelectedForm("single")}
                />
                Single Agent
              </label>

              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  checked={selectedForm === "bulk"}
                  onChange={() => setSelectedForm("bulk")}
                />
                Bulk Upload
              </label>
            </div>
          )}

          {/* ===== SINGLE AGENT FORM ===== */}
          {selectedForm === "single" && (
            <div className="flex justify-center">
              <div className="w-[600px] space-y-4">

                {[
                  {
                    label: "MDS ID",
                    key: "mdsId",
                    options: ["RO ID-Wise"],
                  },
                  {
                    label: "Category",
                    key: "category",
                    options: ["Postpaid", "Prepaid"],
                  },
                  {
                    label: "Main Service",
                    key: "mainService",
                    options: ["Utility"],
                  },
                  {
                    label: "Sub Service",
                    key: "subService",
                    options: ["Digital Mall Charges", "PGTopUp"],
                  },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-3">
                    <label className="font-semibold w-[120px] text-right">
                      {field.label}
                    </label>

                    <select
                      className={selectStyle}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      {field.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* FULL AGENT ID */}
                <div className="flex items-center gap-3">
                  <label className="font-semibold w-[120px] text-right">
                    Full Agent Id
                  </label>

                  <input
                    className={inputStyle}
                    value={formData.fullAgentId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullAgentId: e.target.value,
                      })
                    }
                  />
                </div>

              </div>
            </div>
          )}

          {/* ===== BULK UPLOAD ===== */}
          {selectedForm === "bulk" && (
            <div className="flex justify-center">
              <div className="w-[600px] space-y-4">

                {/* FILE */}
                <div className="flex items-center gap-3">
                  <label className="font-semibold w-[120px] text-right">
                    Select File
                  </label>

                  <input
                    type="file"
                    className={inputStyle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        file: e.target.files[0],
                      })
                    }
                  />
                </div>

                {/* DOWNLOAD */}
                <div className="text-center text-sm">
                  <a
                    href="#"
                    className="font-semibold text-[#3d89a6] hover:underline"
                  >
                    Click To Download Format
                  </a>
                </div>

                {/* AGENT ID */}
                <div className="flex items-center gap-3">
                  <label className="font-semibold w-[120px] text-right">
                    Agent Id
                  </label>

                  <input
                    className={inputStyle}
                    value={formData.agentId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agentId: e.target.value,
                      })
                    }
                  />
                </div>

              </div>
            </div>
          )}

          {/* ===== SUBMIT ===== */}
          {selectedForm && (
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-white rounded-2xl shadow
                           bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                           hover:opacity-90 transition"
              >
                Continue
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PGUserLimit;
