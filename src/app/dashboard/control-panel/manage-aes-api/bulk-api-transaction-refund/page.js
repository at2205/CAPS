"use client";
import React, { useState, useEffect } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const BulkRefundTransaction = () => {
  const [formData, setFormData] = useState({
    actionType: "Select",
    tranId: "",
    ipAdd: "127.0.0.1",
  });

  const [resultList, setResultList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const d = new Date();
    const f = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
    setCurrentDate(f);
  }, []);

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const selectClass =
    "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const textareaClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const primaryBtn =
    "capsButton px-6 py-1.5 text-sm disabled:opacity-50";

  const secondaryBtn =
    "px-6 py-1.5 text-sm rounded-md text-white bg-gray-500 hover:opacity-90 disabled:opacity-50";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleTextareaChange = (e) => {
    const v = e.target.value.replace(/[^\w\s,\-\n]/g, "");
    setFormData((p) => ({ ...p, tranId: v }));
  };

  const parseTransactionIds = (text) => {
    if (!text.trim()) return [];
    return [
      ...new Set(
        text
          .split(/[\s,]+/)
          .map((x) => x.trim())
          .filter(
            (x) =>
              /^[A-Za-z0-9\-_]+$/.test(x) &&
              x.length >= 8 &&
              x.length <= 32
          )
      ),
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.actionType === "Select") {
      alert("Please Select Action");
      return;
    }
    if (!formData.tranId.trim()) {
      alert("Please enter Transaction Id");
      return;
    }

    const ids = parseTransactionIds(formData.tranId);
    if (ids.length === 0) {
      alert("Invalid Transaction Id(s)");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await new Promise((r) => setTimeout(r, 1000));

      setResultList(
        ids.map((id) => ({
          TranId: id,
          updateStatus: formData.actionType,
        }))
      );

      setMessage(`${ids.length} transaction(s) processed successfully`);
      setFormData((p) => ({ ...p, tranId: "" }));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData((p) => ({
      ...p,
      tranId: "",
      actionType: "Select",
    }));
    setResultList([]);
    setMessage("");
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Bulk Refund Transaction"
        description="Process multiple refund / success transactions"
      />

      <PageCard>

        <form onSubmit={handleSubmit}>
          {/* ACTION */}
          <div className="flex items-center justify-center mb-4">
            <label className="w-[200px] text-right text-sm font-semibold">
              Select Action :
            </label>

            <div className="w-[260px] ml-3">
              <select
                name="actionType"
                value={formData.actionType}
                onChange={handleChange}
                disabled={loading}
                className={selectClass}
              >
                <option value="Select">---- Select Action ----</option>
                <option value="SuccessRefund">Success Refund</option>
                <option value="Refund">Refund</option>
                <option value="Success">Success</option>
              </select>
            </div>
          </div>

          {/* TEXTAREA */}
          <div className="flex justify-center mb-4">
            <label className="w-[200px] text-right text-sm font-semibold pt-2">
              Transaction Id :
            </label>

            <div className="w-[260px] ml-3">
              <textarea
                rows={5}
                placeholder="Enter transaction IDs (comma / space / new line)"
                value={formData.tranId}
                onChange={handleTextareaChange}
                disabled={loading}
                className={textareaClass}
              />

              <p className="text-xs text-gray-500 mt-1">
                {parseTransactionIds(formData.tranId).length} transaction(s)
                detected
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="text-center mt-3 space-x-2">
            <button type="submit" disabled={loading} className={primaryBtn}>
              {loading ? "Processing..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className={secondaryBtn}
            >
              Clear
            </button>
          </div>
        </form>

        {/* MESSAGE */}
        {message && (
          <div className="text-center text-green-600 text-sm mt-4">
            {message}
          </div>
        )}

        {/* RESULT TABLE */}
        {resultList.length > 0 && (
          <div className="mt-6">
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-[#4fa2c2] text-white">
                <tr>
                  <th className="p-2 text-left">Transaction Id</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {resultList.map((r, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2">{r.TranId}</td>
                    <td className="text-center">{r.updateStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center text-xs text-gray-500 mt-2">
              Date : {currentDate}
            </div>
          </div>
        )}

      </PageCard>
    </div>
  );
};

export default BulkRefundTransaction;
