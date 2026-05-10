"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

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

  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!pgUserId.trim()) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please enter PG User Id", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), pgUserId: pgUserId.trim() };
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.pgUserIdAuth, new URLSearchParams({ jsonData: JSON.stringify(payload) }));
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") { setIsVerified(true); }
      else { Swal.fire({ icon: "error", title: "Failed", text: data.message || "User not found" }); }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
    finally { setLoading(false); }
  };

  const handleReset = () => {
    setPgUserId("");
    setIsVerified(false);
    setPgAllow(false);
    setRow1({ min: "", daily: "", from: "", to: "", api: "" });
    setRow2({ min: "", daily: "", from: "", to: "", api: "" });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), pgUserId: pgUserId.trim(), pgAllow: pgAllow ? "Y" : "N", row1, row2 };
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.savePgUserLimit, new URLSearchParams({ jsonData: JSON.stringify(payload) }));
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") { Swal.fire({ icon: "success", title: "Success", text: data.message || "Limits saved successfully" }); }
      else { Swal.fire({ icon: "error", title: "Failed", text: data.message || "Save failed" }); }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
    finally { setLoading(false); }
  };

  const badgeStyle = (enabled) =>
    enabled
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600";

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > PG Settlement User Limit"
        description="Configure PG transaction limits"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[620px] space-y-4">

            {/* PG USER ID */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                PG User Id
              </label>
              <div className="text-center">:</div>

              <input
                value={pgUserId}
                onChange={(e) =>
                  setPgUserId(e.target.value.toUpperCase())
                }
                className="capsInput"
                placeholder="Enter PG User ID"
              />
            </div>

            {/* Buttons */}
            <div className="text-center space-x-3 pt-2">
              <button
                onClick={handleVerify}
                className="capsButton px-6"
              >
                VERIFY
              </button>

              <button
                onClick={handleReset}
                className="capsButtonSecondary px-6"
              >
                RESET
              </button>
            </div>

            {/* PG ALLOW */}
            {isVerified && (
              <div className="text-center pt-2">
                <label className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pgAllow}
                    onChange={(e) =>
                      setPgAllow(e.target.checked)
                    }
                  />
                  PG Allow
                </label>

                <div className="pt-1">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${badgeStyle(
                      pgAllow
                    )}`}
                  >
                    {pgAllow ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            )}

            {/* TABLE */}
            {isVerified && pgAllow && (
              <>
                <div className="pt-3 overflow-x-auto">
                  <table className="w-full border text-sm text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2"></th>
                        <th className="border px-3 py-2">
                          Min Txn Limit
                        </th>
                        <th className="border px-3 py-2">
                          Daily Txn Limit
                        </th>
                        <th className="border px-3 py-2">
                          From Date / Time
                        </th>
                        <th className="border px-3 py-2">
                          To Date / Time
                        </th>
                        <th className="border px-3 py-2">
                          API ID
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* ROW 1 */}
                      <tr className="hover:bg-gray-50">
                        <td className="border font-semibold">
                          PG TO API
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row1.min}
                            onChange={(e) =>
                              setRow1({
                                ...row1,
                                min: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row1.daily}
                            onChange={(e) =>
                              setRow1({
                                ...row1,
                                daily: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row1.from}
                            onChange={(e) =>
                              setRow1({
                                ...row1,
                                from: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row1.to}
                            onChange={(e) =>
                              setRow1({
                                ...row1,
                                to: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row1.api}
                            onChange={(e) =>
                              setRow1({
                                ...row1,
                                api: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>

                      {/* ROW 2 */}
                      <tr className="hover:bg-gray-50">
                        <td className="border font-semibold">
                          PG TO API-NB
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row2.min}
                            onChange={(e) =>
                              setRow2({
                                ...row2,
                                min: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row2.daily}
                            onChange={(e) =>
                              setRow2({
                                ...row2,
                                daily: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row2.from}
                            onChange={(e) =>
                              setRow2({
                                ...row2,
                                from: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row2.to}
                            onChange={(e) =>
                              setRow2({
                                ...row2,
                                to: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="border p-1">
                          <input
                            className="capsInput"
                            value={row2.api}
                            onChange={(e) =>
                              setRow2({
                                ...row2,
                                api: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Continue Button */}
                <div className="text-center pt-3">
                  <button
                    onClick={handleSubmit}
                    className="capsButton px-10"
                  >
                    CONTINUE
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default PGSettlementUserLimit;
