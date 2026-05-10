"use client";
import React, { useState } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

    // MOCK RESPONSE (Replace with API)
    const mockResponse = {
      marketLimit: "50",
      service: service.toUpperCase(),
      userId: userId || "ALL USERS",
      clientMarkup: "10",
      mdsMarkup: "15",
      dsMarkup: "12",
      agentMarkup: "8",
    };

    await new Promise((r) => setTimeout(r, 700));

    setMarkupData(mockResponse);
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

    await new Promise((r) => setTimeout(r, 700));

    alert("Markup Updated Successfully");
  };

  const inputClass =
    "capsInput w-full";
  const selectClass =
    "capsInput w-full";

  const rowClass = "grid grid-cols-[220px_20px_1fr] items-center mb-3";
  const labelClass = "text-sm font-semibold text-right";

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > Set Markup"
        description="Configure markup distribution across hierarchy"
      />

      <PageCard>
        {/* ===== FORM ===== */}
        <div className="max-w-xl mx-auto">

          {/* SERVICE */}
          <div className={rowClass}>
            <div className={labelClass}>Select Service</div>
            <div>:</div>
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

          {/* PANEL */}
          <div className={rowClass}>
            <div className={labelClass}>Select Panel</div>
            <div>:</div>
            <select
              className={selectClass}
              value={panel}
              onChange={(e) => {
                setPanel(e.target.value);
                setOption("select");
                setShowTable(false);
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

          {/* OPTION */}
          {panel !== "select" && panel !== "all" && (
            <div className={rowClass}>
              <div className={labelClass}>Select Option</div>
              <div>:</div>
              <select
                className={selectClass}
                value={option}
                onChange={(e) => {
                  setOption(e.target.value);
                  setShowTable(false);
                }}
              >
                <option value="select">Select</option>
                <option value="idwise">ID Wise</option>
                <option value="all">All</option>
              </select>
            </div>
          )}

          {/* USER ID */}
          {option === "idwise" && (
            <div className={rowClass}>
              <div className={labelClass}>User ID</div>
              <div>:</div>
              <input
                className={inputClass}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
              />
            </div>
          )}

          {/* BUTTON */}
          <div className="text-center mt-4">
            <button onClick={fetchMarkup} className="capsButton px-8">
              Submit
            </button>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        {showTable && markupData && (
          <div className="mt-6">

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr className="text-center font-semibold">
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
                className="capsButton px-8"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default SetMarkup;
