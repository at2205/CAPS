"use client";
import React, { useState } from "react";
import axios from "axios";

const SetMarkup = () => {
  const [service, setService] = useState("flight");
  const [panel, setPanel] = useState("select");
  const [option, setOption] = useState("select");
  const [userId, setUserId] = useState("");

  const [markupData, setMarkupData] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const fetchMarkup = async () => {
    if (panel === "select") {
      alert("Please Select Panel");
      return;
    }
    if (panel !== "all" && option === "select") {
      alert("Please Select Option");
      return;
    }
    if (option === "idwise" && !userId) {
      alert("Please Enter User ID");
      return;
    }

    const res = await axios.post("/api/markup/details", {
      service,
      panel,
      option,
      userId,
    });

    setMarkupData(res.data);
    setShowTable(true);
  };

  const updateMarkup = async () => {
    const total =
      Number(markupData.clientMarkup) +
      Number(markupData.mdsMarkup) +
      Number(markupData.dsMarkup) +
      Number(markupData.agentMarkup);

    if (total > Number(markupData.marketLimit)) {
      alert("Please check input values");
      return;
    }

    await axios.post("/api/markup/save", markupData);
    alert("Markup Updated Successfully");
  };

  const labelClass = "text-sm font-semibold text-right";
  const inputClass =
    "w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";
  const selectClass =
    "w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-5xl rounded-xl shadow-lg border-2 border-[#b7dbe8]">
        
        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-r from-[#4c95b3] to-[#3d89a6] text-white font-bold text-center py-3 rounded-t-xl text-lg">
          Control Panel &gt; Set Markup
        </div>

        {/* ===== BODY ===== */}
        <div className="p-4">

          {/* ===== FORM ===== */}
          <div className="space-y-3 mb-5">

            {/* SERVICE */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-4 text-right text-sm font-semibold">
                Select Service :
              </div>
              <div className="col-span-5">
                <select
                  className={selectClass}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="flight">Flight</option>
                  <option value="bus">Bus</option>
                  <option value="hotel">Hotel</option>
                </select>
              </div>
            </div>

            {/* PANEL */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-4 text-right text-sm font-semibold">
                Select Panel :
              </div>
              <div className="col-span-5">
                <select
                  className={selectClass}
                  value={panel}
                  onChange={(e) => {
                    setPanel(e.target.value);
                    setOption("select");
                  }}
                >
                  <option value="select">Select</option>
                  <option value="client">Client</option>
                  <option value="mds">MDS</option>
                  <option value="ds">DS</option>
                  <option value="agent">Agent</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>

            {/* OPTION */}
            {panel !== "select" && panel !== "all" && (
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-4 text-right text-sm font-semibold">
                  Select Option :
                </div>
                <div className="col-span-5">
                  <select
                    className={selectClass}
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  >
                    <option value="select">Select</option>
                    <option value="idwise">ID Wise</option>
                    <option value="all">All</option>
                  </select>
                </div>
              </div>
            )}

            {/* USER ID */}
            {option === "idwise" && (
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-4 text-right text-sm font-semibold">
                  User ID :
                </div>
                <div className="col-span-5">
                  <input
                    className={inputClass}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* BUTTON */}
            <div className="text-center pt-2">
              <button
                onClick={fetchMarkup}
                className="px-5 py-1.5 text-sm text-white rounded-md bg-[#4fa2c2] hover:bg-[#3d8daa]"
              >
                Submit
              </button>
            </div>
          </div>

          {/* ===== TABLE ===== */}
          {showTable && markupData && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr className="text-center">
                      <th className="border px-2 py-1">Markup Limit</th>
                      <th className="border px-2 py-1">Service</th>
                      <th className="border px-2 py-1">ID</th>
                      <th className="border px-2 py-1">Client</th>
                      <th className="border px-2 py-1">MDS</th>
                      <th className="border px-2 py-1">DS</th>
                      <th className="border px-2 py-1">Agent</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="text-center">
                      <td className="border p-1">
                        <input
                          value={markupData.marketLimit}
                          readOnly
                          className={inputClass}
                        />
                      </td>

                      <td className="border">{markupData.service}</td>
                      <td className="border">{markupData.userId}</td>

                      <td className="border p-1">
                        <input
                          value={markupData.clientMarkup}
                          readOnly={panel !== "client"}
                          onChange={(e) =>
                            setMarkupData({
                              ...markupData,
                              clientMarkup: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </td>

                      <td className="border p-1">
                        <input
                          value={markupData.mdsMarkup}
                          readOnly={panel === "client"}
                          onChange={(e) =>
                            setMarkupData({
                              ...markupData,
                              mdsMarkup: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </td>

                      <td className="border p-1">
                        <input
                          value={markupData.dsMarkup}
                          onChange={(e) =>
                            setMarkupData({
                              ...markupData,
                              dsMarkup: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </td>

                      <td className="border p-1">
                        <input
                          value={markupData.agentMarkup}
                          onChange={(e) =>
                            setMarkupData({
                              ...markupData,
                              agentMarkup: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* UPDATE BUTTON */}
              <div className="text-right mt-3">
                <button
                  onClick={updateMarkup}
                  className="px-5 py-1.5 text-sm text-white rounded-md bg-green-600 hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetMarkup;
