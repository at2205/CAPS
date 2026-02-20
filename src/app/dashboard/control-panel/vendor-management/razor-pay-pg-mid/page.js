"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function RazorPayPGMid() {
  /* ================= STATES ================= */
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
  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          RazorPay PG MID
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <form onSubmit={handleSubmit}>

            {/* MID SELECT */}
            <div className="flex items-center justify-center mb-4">
              <label className="w-[120px] text-right text-sm font-semibold">
                MID <span className="text-red-500">*</span> :
              </label>

              <div className="w-[260px] ml-3">
                <select
                  className={inputClass}
                  value={selectedMid}
                  onChange={(e) => setSelectedMid(e.target.value)}
                >
                  <option value="">Select</option>

                  {midList.map((m, i) => (
                    <option key={i} value={m.UserId}>
                      {m.UserId === "pawan.thakur@bankit.in"
                        ? `T+1 - ${m.UserId}`
                        : m.UserId === "gaurav.chauhan@bankit.in"
                        ? `T+0 - ${m.UserId}`
                        : m.UserId}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* STATUS */}
            <div className="text-center min-h-[24px]">
              {success && (
                <p className="text-green-600 text-sm">{success}</p>
              )}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              {loading && (
                <p className="text-gray-500 text-sm animate-pulse">
                  Processing...
                </p>
              )}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={!selectedMid || loading}
                className={`px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90
                ${(!selectedMid || loading) ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default RazorPayPGMid;
