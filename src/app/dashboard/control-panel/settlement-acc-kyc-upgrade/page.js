"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function SettlementKYC() {
  const [name, setName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [bankName, setBankName] = useState("0");

  const [bankList, setBankList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/getBankList").then((res) => {
      if (Array.isArray(res.data)) {
        setBankList(res.data);
      }
    });
  }, []);

  const digitOnly = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Please Enter Account Holder Name.");
    if (!accountNo.trim()) return alert("Please Enter Account Number.");
    if (!panNo.trim()) return alert("Please Enter PAN Number.");
    if (bankName === "0") return alert("Please Select Bank Name.");

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
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Settlement Account KYC Upgrade"
        description="Update settlement account holder KYC details"
      />

      <PageCard>
        {message && (
          <p className="text-center text-red-500 font-semibold mb-4 text-sm">
            {message}
          </p>
        )}

        {/* ✅ CENTERED FORM CONTAINER */}
        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            {/* Row */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Account Holder Name
              </label>
              <div className="text-center">:</div>
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value.toUpperCase())
                }
                disabled={loading}
                placeholder="Enter Account Holder Name"
                className="capsInput"
              />
            </div>

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Account No.
              </label>
              <div className="text-center">:</div>
              <input
                type="text"
                value={accountNo}
                onKeyDown={digitOnly}
                onChange={(e) =>
                  setAccountNo(e.target.value)
                }
                disabled={loading}
                placeholder="Enter Account Number"
                className="capsInput"
              />
            </div>

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                PAN No.
              </label>
              <div className="text-center">:</div>
              <input
                type="text"
                value={panNo}
                onChange={(e) =>
                  setPanNo(e.target.value.toUpperCase())
                }
                disabled={loading}
                placeholder="Enter PAN Number"
                className="capsInput"
              />
            </div>

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Bank Name
              </label>
              <div className="text-center">:</div>
              <select
                value={bankName}
                onChange={(e) =>
                  setBankName(e.target.value)
                }
                disabled={loading}
                className="capsInput"
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
                className="capsButton px-10"
              >
                {loading ? "Updating..." : "UPDATE"}
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default SettlementKYC;
