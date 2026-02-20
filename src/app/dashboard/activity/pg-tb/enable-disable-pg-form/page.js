"use client";
import React, { useState } from "react";

const EnableDisablePGForm = () => {
  const [action, setAction] = useState("0");
  const [roIds, setRoIds] = useState("");

  const handleActionChange = (value) => {
    setAction(value);
    setRoIds("");
  };

  const updateStatus = () => {
    if (!roIds.trim()) {
      alert("Please Enter RO ID.");
      return;
    }

    // frontend only
    alert(`Action: ${action}\nRO IDs: ${roIds}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Enable / Disable PG Form
        </div>

        {/* ===== BODY ===== */}
        <div className="px-5 py-6 flex justify-center">
          <div className="w-[520px]">

            {/* ACTION */}
            <div className="mb-5 flex items-center">
              <label className="font-semibold w-1/2 text-right mr-3">
                Select Action
              </label>

              <select
                value={action}
                onChange={(e) =>
                  handleActionChange(e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
              >
                <option value="0">Select</option>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
            </div>

            {/* RO ID (Conditional) */}
            {action !== "0" && (
              <>
                <div className="mb-5 flex items-start">
                  <label className="font-semibold w-1/2 text-right mr-3 pt-2">
                    Enter RO ID
                  </label>

                  <textarea
                    value={roIds}
                    onChange={(e) =>
                      setRoIds(e.target.value)
                    }
                    placeholder="Full Agent ID (Use comma for multiple IDs)"
                    className="w-full h-[100px] border border-gray-300 rounded-md px-3 py-2
                               focus:outline-none focus:ring-2 focus:ring-[#4c95b3]
                               resize-y"
                  />
                </div>

                {/* BUTTON */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={updateStatus}
                    className="px-6 py-2 text-white rounded-2xl shadow
                               bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                               hover:opacity-90 transition"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default EnableDisablePGForm;
