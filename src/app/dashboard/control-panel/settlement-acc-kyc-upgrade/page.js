"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function SettlementKYC() {
  const [name, setName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [bankName, setBankName] = useState("0");

  const [bankList, setBankList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD BANK LIST ================= */
  useEffect(() => {
    axios.get("/getBankList").then((res) => {
      if (Array.isArray(res.data)) {
        setBankList(res.data);
      }
    });
  }, []);

  /* ================= DIGIT ONLY ================= */
  const digitOnly = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please Enter Account Holder Name.");
      return;
    }
    if (!accountNo.trim()) {
      alert("Please Enter Account Number.");
      return;
    }
    if (!panNo.trim()) {
      alert("Please Enter PAN Number.");
      return;
    }
    if (bankName === "0") {
      alert("Please Select Bank Name.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "/settlementKYCUpdate.action?param=updateSettlementKYC",
        {
          name,
          account_no: accountNo,
          pan_no: panNo,
          bankName,
        }
      );

      setMessage(res.data?.message || "Updated Successfully");
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-[950px] bg-white rounded-xl shadow-lg border-2 border-[#b7dbe8] overflow-hidden">
        
        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-r from-[#4c95b3] to-[#3d89a6] text-white text-center font-bold text-[17px] py-3 tracking-wide">
          SETTLEMENT ACCOUNT KYC UPGRADE
        </div>

        {/* ===== BODY ===== */}
        <div className="px-8 py-6 text-sm">

          {message && (
            <p className="text-center text-red-500 font-semibold mb-4">
              {message}
            </p>
          )}

          <div className="space-y-4">

            {/* Account Holder */}
            <div className="flex items-center justify-center gap-4">
              <label className="w-[220px] text-right font-semibold">
                Account Holder Name :
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value.toUpperCase())
                }
                placeholder="Enter Account Holder Name"
                className="input w-[280px]"
              />
            </div>

            {/* Account No */}
            <div className="flex items-center justify-center gap-4">
              <label className="w-[220px] text-right font-semibold">
                Account No. :
              </label>
              <input
                type="text"
                value={accountNo}
                onKeyDown={digitOnly}
                onChange={(e) =>
                  setAccountNo(e.target.value)
                }
                placeholder="Enter Account Number"
                className="input w-[280px]"
              />
            </div>

            {/* PAN */}
            <div className="flex items-center justify-center gap-4">
              <label className="w-[220px] text-right font-semibold">
                PAN No. :
              </label>
              <input
                type="text"
                value={panNo}
                onChange={(e) =>
                  setPanNo(e.target.value.toUpperCase())
                }
                placeholder="Enter PAN Number"
                className="input w-[280px]"
              />
            </div>

            {/* Bank */}
            <div className="flex items-center justify-center gap-4">
              <label className="w-[220px] text-right font-semibold">
                Bank Name :
              </label>
              <select
                value={bankName}
                onChange={(e) =>
                  setBankName(e.target.value)
                }
                className="input w-[280px]"
              >
                <option value="0">Select Bank</option>
                {bankList.map((b, i) => (
                  <option key={i} value={b.bankName}>
                    {b.bankName}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#4fa2c2] text-white px-8 py-1.5 rounded-md shadow
                           hover:bg-[#3d89a6] transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  "UPDATE"
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SettlementKYC;
