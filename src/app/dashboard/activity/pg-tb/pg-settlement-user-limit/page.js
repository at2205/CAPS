"use client";

import React, { useState } from "react";

const PGSettlementUserLimit = () => {
  const [pgUserId, setPgUserId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [pgAllow, setPgAllow] = useState(false);

  const [row1, setRow1] = useState({
    min: "",
    daily: "",
    from: "",
    to: "",
    api: "",
  });

  const [row2, setRow2] = useState({
    min: "",
    daily: "",
    from: "",
    to: "",
    api: "",
  });

  const handleVerify = () => {
    if (!pgUserId.trim()) {
      alert("Please enter PG User Id");
      return;
    }
    setIsVerified(true);
  };

  const handleReset = () => {
    setPgUserId("");
    setIsVerified(false);
    setPgAllow(false);
    setRow1({ min: "", daily: "", from: "", to: "", api: "" });
    setRow2({ min: "", daily: "", from: "", to: "", api: "" });
  };

  const handleSubmit = () => {
    console.log({ pgUserId, pgAllow, row1, row2 });
    alert("Submitted (frontend only)");
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          PG Settlement User Limit
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6">

          {/* ===== PG USER INPUT ===== */}
          <div className="flex justify-center mb-6">
            <div className="w-[500px]">

              {/* INPUT */}
              <div className="flex items-center gap-4 mb-4">
                <label className="font-semibold w-[120px] text-right">
                  PG User Id
                </label>

                <input
                  value={pgUserId}
                  onChange={(e) =>
                    setPgUserId(e.target.value.toUpperCase())
                  }
                  className={inputStyle}
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleVerify}
                  className="px-5 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Verify
                </button>

                <button
                  onClick={handleReset}
                  className="px-5 py-2 rounded-2xl shadow border border-gray-400
                             hover:bg-gray-100 transition"
                >
                  Reset
                </button>
              </div>

            </div>
          </div>

          {/* ===== PG ALLOW ===== */}
          {isVerified && (
            <div className="text-center mb-6">
              <label className="inline-flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={pgAllow}
                  onChange={(e) => setPgAllow(e.target.checked)}
                  className="w-4 h-4"
                />
                PG Allow
              </label>
            </div>
          )}

          {/* ===== TABLE ===== */}
          {isVerified && pgAllow && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm text-center">

                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2"></th>
                      <th className="border p-2">Min Txn Limit</th>
                      <th className="border p-2">Daily Txn Limit</th>
                      <th className="border p-2">From Date / Time</th>
                      <th className="border p-2">To Date / Time</th>
                      <th className="border p-2">API ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-semibold">
                        PG TO API
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row1.min}
                          onChange={(e) =>
                            setRow1({ ...row1, min: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row1.daily}
                          onChange={(e) =>
                            setRow1({ ...row1, daily: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row1.from}
                          onChange={(e) =>
                            setRow1({ ...row1, from: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row1.to}
                          onChange={(e) =>
                            setRow1({ ...row1, to: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row1.api}
                          onChange={(e) =>
                            setRow1({ ...row1, api: e.target.value })
                          }
                        />
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50">
                      <td className="border p-2 font-semibold">
                        PG TO API-NB
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row2.min}
                          onChange={(e) =>
                            setRow2({ ...row2, min: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row2.daily}
                          onChange={(e) =>
                            setRow2({ ...row2, daily: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row2.from}
                          onChange={(e) =>
                            setRow2({ ...row2, from: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row2.to}
                          onChange={(e) =>
                            setRow2({ ...row2, to: e.target.value })
                          }
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          className={inputStyle}
                          value={row2.api}
                          onChange={(e) =>
                            setRow2({ ...row2, api: e.target.value })
                          }
                        />
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>

              {/* ===== CONTINUE BUTTON ===== */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Continue
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default PGSettlementUserLimit;
