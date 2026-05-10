"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const APIRefundTransaction = () => {
  const [tranId, setTranId] = useState("");
  const [transactionList, setTransactionList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const selectClass =
    "border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const buttonClass = "capsButton px-6 py-1.5 text-sm disabled:opacity-50";

  // GET TRANSACTION API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tranId.trim()) {
      alert("Please enter Transaction ID");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`/api/refund/getTran/${tranId.trim()}`);
      const data = await res.json();

      console.log("GET API Response:", data);

      if (!data || data.length === 0) {
        setMessage("No Data Found");
        setTransactionList([]);
        return;
      }

      // Mapping (adjust if needed)
      const formattedData = data.map((item) => ({
        user_id: item.user_id || item.userId,
        tran_id: item.tran_id || item.transactionId,
        CorpoateID: item.CorpoateID || item.corporateId,
        date_of_recharge:
          item.date_of_recharge || item.date || item.createdDate,
        mobile_number: item.mobile_number || item.mobile,
        service: item.service,
        amount: item.amount,
        Tran_status: item.Tran_status || item.status,
      }));

      setTransactionList(formattedData);
      setSelectedRows([]);
      setSelectAll(false);
      setStatusUpdates({});
      setMessage("Transaction details loaded");
    } catch (err) {
      console.error(err);
      setMessage("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // SELECT ALL
  const toggleAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedRows(checked ? transactionList.map((_, i) => i) : []);
  };

  // SELECT SINGLE ROW
  const toggleRow = (i) => {
    setSelectedRows((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  // BULK UPDATE API
  const updateStatus = async () => {
    if (selectedRows.length === 0) {
      alert("Select at least one transaction");
      return;
    }

    let transactionIds = [];
    let actionType = "";

    for (const i of selectedRows) {
      if (!statusUpdates[i]) {
        alert("Select status for all selected rows");
        return;
      }

      transactionIds.push(transactionList[i].tran_id);
      actionType = statusUpdates[i]; // assuming same status
    }

    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("transactionIds", transactionIds.join(","));
      params.append("actionType", actionType);
      params.append("ip", "127.0.0.1");

      const res = await fetch("/api/refund/bulkUpdate", {
        method: "POST",
        body: params,
      });

      const data = await res.json();

      console.log("UPDATE RESPONSE:", data);

      alert("Transaction status updated successfully");

      // Optional: reload data
      handleSubmit({ preventDefault: () => {} });
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="API Refund Transaction Process"
        description="View transactions and update refund status"
      />

      <PageCard>
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-4">
            <label className="w-[200px] text-right text-sm font-semibold">
              Enter Transaction ID :
            </label>

            <div className="w-[260px] ml-3">
              <input
                value={tranId}
                onChange={(e) => setTranId(e.target.value)}
                maxLength={30}
                disabled={loading}
                className={inputClass}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" disabled={loading} className={buttonClass}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>

        {/* MESSAGE */}
        {message && (
          <div className="text-center text-green-600 text-sm mt-3">
            {message}
          </div>
        )}

        {/* TABLE */}
        {transactionList.length > 0 && (
          <>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border border-gray-300">
                <thead className="bg-[#4fa2c2] text-white">
                  <tr>
                    <th className="p-2 text-left">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleAll}
                      />{" "}
                      Tick
                    </th>
                    <th>API ID</th>
                    <th>Customer Txn ID</th>
                    <th>API Txn ID</th>
                    <th>Txn Date</th>
                    <th>Connection No</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {transactionList.map((r, i) => (
                    <tr
                      key={i}
                      className="border-t text-center hover:bg-gray-50"
                    >
                      <td className="p-2 text-left">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(i)}
                          onChange={() => toggleRow(i)}
                        />
                      </td>
                      <td>{r.user_id}</td>
                      <td>{r.tran_id}</td>
                      <td>{r.CorpoateID}</td>
                      <td>{r.date_of_recharge}</td>
                      <td>{r.mobile_number}</td>
                      <td>{r.service}</td>
                      <td>₹{r.amount}</td>
                      <td>{r.Tran_status}</td>
                      <td>
                        <select
                          className={selectClass}
                          value={statusUpdates[i] || ""}
                          onChange={(e) =>
                            setStatusUpdates((prev) => ({
                              ...prev,
                              [i]: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select</option>
                          <option value="Refund">Refund</option>
                          <option value="Success">Success</option>
                          <option value="SuccessRefund">Success Refund</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* UPDATE BUTTON */}
            <div className="text-center mt-4">
              <button
                onClick={updateStatus}
                className={buttonClass}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Status"}
              </button>
            </div>
          </>
        )}
      </PageCard>
    </div>
  );
};

export default APIRefundTransaction;
