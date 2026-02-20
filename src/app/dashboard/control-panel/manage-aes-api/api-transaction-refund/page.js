"use client";
import React, { useState } from "react";

const APIRefundTransaction = () => {
  const [tranId, setTranId] = useState("");
  const [transactionList, setTransactionList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formatDate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const selectClass =
    "border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const buttonClass =
    "px-5 py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90 disabled:opacity-50";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tranId.trim()) {
      alert("Please enter Transaction ID");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // MOCK DATA
      const data = [
        {
          user_id: "API001",
          tran_id: tranId,
          CorpoateID: "CORP123",
          date_of_recharge: formatDate(new Date()),
          mobile_number: "9876543210",
          service: "Mobile Recharge",
          amount: "500.00",
          Tran_status: "Pending",
        },
        {
          user_id: "API002",
          tran_id: tranId + "-1",
          CorpoateID: "CORP456",
          date_of_recharge: formatDate(new Date()),
          mobile_number: "8765432109",
          service: "DTH Recharge",
          amount: "1000.00",
          Tran_status: "Success",
        },
      ];

      setTransactionList(data);
      setSelectedRows([]);
      setSelectAll(false);
      setStatusUpdates({});
      setMessage("Transaction details loaded");
    } finally {
      setLoading(false);
    }
  };

  const toggleAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedRows(checked ? transactionList.map((_, i) => i) : []);
  };

  const toggleRow = (i) => {
    setSelectedRows((p) =>
      p.includes(i) ? p.filter((x) => x !== i) : [...p, i]
    );
  };

  const updateStatus = () => {
    if (selectedRows.length === 0) {
      alert("Select at least one transaction");
      return;
    }

    for (const i of selectedRows) {
      if (!statusUpdates[i]) {
        alert("Select status for all selected rows");
        return;
      }
    }

    alert("Transaction status updated successfully");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[850px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-lg rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          API Refund Transaction Process
        </div>

        <div className="px-10 py-6">

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
                      <th className="p-2">API ID</th>
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
                              setStatusUpdates((p) => ({
                                ...p,
                                [i]: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option value="Refund">Refund</option>
                            <option value="Success">Success</option>
                            <option value="SuccessRefund">
                              Success Refund
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* UPDATE BUTTON */}
              <div className="text-center mt-4">
                <button onClick={updateStatus} className={buttonClass}>
                  Update Status
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default APIRefundTransaction;
