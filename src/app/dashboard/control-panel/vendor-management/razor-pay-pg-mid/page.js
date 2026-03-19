"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function RazorPayPGMid() {
  const [midList, setMidList] = useState([]);
  const [selectedMid, setSelectedMid] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD MID LIST ================= */
  useEffect(() => {
    axios
      .get("/getPGMidList")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMidList(res.data);
        } else if (Array.isArray(res.data?.PGMidList)) {
          setMidList(res.data.PGMidList);
        } else {
          setMidList([]);
        }
      })
      .catch(() => setMidList([]));
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!selectedMid) {
      setError("Please select MID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.post(
        "/settlementAcc_switch.action?param=PGMidUpdate",
        { mid: selectedMid }
      );

      setSuccess("PG MID updated successfully");
    } catch {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedMid("");
    setSuccess("");
    setError("");
  };

  const formatMidLabel = (userId) => {
    if (userId === "pawan.thakur@bankit.in")
      return `T+1 — ${userId}`;

    if (userId === "gaurav.chauhan@bankit.in")
      return `T+0 — ${userId}`;

    return userId;
  };

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">
        {label}
      </label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="RazorPay PG MID"
        description="Update RazorPay payment gateway MID"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* MID */}
            <FieldRow label="Select MID">
              <select
                className="capsInput"
                value={selectedMid}
                onChange={(e) => setSelectedMid(e.target.value)}
              >
                <option value="">Select</option>

                {midList.map((m, i) => (
                  <option key={i} value={m.UserId}>
                    {formatMidLabel(m.UserId)}
                  </option>
                ))}
              </select>
            </FieldRow>

            {/* STATUS */}
            <div className="text-center text-sm mb-2">
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {loading && <p className="text-gray-500">Processing...</p>}
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={!selectedMid || loading}
                className="capsButton min-w-[140px]"
              >
                Submit
              </button>

              <button
                onClick={handleClear}
                className="capsButtonSecondary min-w-[140px]"
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default RazorPayPGMid;
