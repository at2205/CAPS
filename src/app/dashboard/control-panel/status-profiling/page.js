"use client";
import React, { useState, useEffect } from "react";

const PendingTransaction = () => {
  const [searchData, setSearchData] = useState({
    service: "DMR-ARemit",
    tranId: "",
    fromDate: "",
    toDate: "",
  });

  const [tranList, setTranList] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  /* ---------------- DEFAULT DATES ---------------- */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    setSearchData((prev) => ({
      ...prev,
      fromDate: today,
      toDate: today,
    }));
  }, []);

  /* ---------------- INPUT ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- CHECKBOX ---------------- */
  const handleCheckboxChange = (tranId) => {
    setSelectedTransactions((prev) =>
      prev.includes(tranId)
        ? prev.filter((id) => id !== tranId)
        : [...prev, tranId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTransactions(tranList.map((t) => t[1]));
    } else {
      setSelectedTransactions([]);
    }
  };

  /* ---------------- VALIDATION ---------------- */
  const validateSearchForm = () => {
    const { fromDate, toDate } = searchData;

    if (!fromDate || !toDate)
      return alert("Please select both From Date and To Date"), false;

    if (new Date(fromDate) > new Date(toDate))
      return alert("From Date cannot be greater than To Date"), false;

    return true;
  };

  /* ---------------- SEARCH ---------------- */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!validateSearchForm()) return;

    try {
      setLoading(true);
      setMessage("");
      setTranList([]);
      setSelectedTransactions([]);

      await new Promise((r) => setTimeout(r, 1500));

      const mockTranList = [
        ["AGENT001", "TXN001", "DMR-ARemit", "2024-01-15", "14:30:45", "₹5,000.00", "₹50.00", "Pending", "CLIENT001"],
        ["AGENT002", "TXN002", "AccountVerification-AREMIT", "2024-01-15", "15:45:22", "₹2,500.00", "₹25.00", "Pending", "CLIENT002"],
        ["AGENT003", "TXN003", "DMR-MyRemit", "2024-01-14", "10:15:33", "₹10,000.00", "₹100.00", "Pending", "CLIENT003"],
        ["AGENT001", "TXN004", "DMR-ARemit", "2024-01-14", "16:20:18", "₹3,000.00", "₹30.00", "Pending", "CLIENT004"],
      ];

      setTranList(mockTranList);
      setMessage(`Found ${mockTranList.length} pending transactions`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTransactions.length)
      return alert("You have to check at least one transaction.");

    if (!window.confirm("Do you want to update?")) return;

    try {
      setSubmitLoading(true);

      await new Promise((r) => setTimeout(r, 1500));

      alert(`Successfully updated ${selectedTransactions.length} transaction(s)!`);
      setMessage(`${selectedTransactions.length} transaction(s) updated successfully!`);
      setSelectedTransactions([]);

      await handleSearch({ preventDefault: () => {} });
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ---------------- CLEAR ---------------- */
  const handleClear = () => {
    setTranList([]);
    setSelectedTransactions([]);
    setMessage("");
    setSearchData((prev) => ({
      ...prev,
      tranId: "",
    }));
  };

  const serviceOptions = [
    "DMR-ARemit",
    "AccountVerification-AREMIT",
    "DMR-MyRemit",
    "AccountVerification-MyRemit",
  ];

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6] text-white rounded-lg shadow px-6 py-4 mb-6">
        <h1 className="text-xl font-bold">
          Pending Transaction Process
        </h1>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mb-4 text-center">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
            {message}
          </div>
        </div>
      )}

      {/* SEARCH FORM */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div>
            <label className="text-sm font-medium">Services</label>
            <select
              name="service"
              value={searchData.service}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              {serviceOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Txn ID</label>
            <input
              name="tranId"
              value={searchData.tranId}
              onChange={handleInputChange}
              placeholder="Enter Transaction ID"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={searchData.fromDate}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">To Date</label>
            <input
              type="date"
              name="toDate"
              value={searchData.toDate}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-4 flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-white rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1]"
            >
              {loading ? "Searching..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-2 text-white rounded-full bg-gradient-to-b from-[#666] to-[#444]"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      {tranList.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">
            Pending Transactions ({tranList.length})
          </h2>

          <form onSubmit={handleUpdateSubmit}>
            <div className="overflow-auto">
              <table className="w-full text-sm text-center border">
                <thead className="bg-[#5a97b5] text-white">
                  <tr>
                    <th className="py-2">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedTransactions.length === tranList.length
                        }
                        disabled={submitLoading}
                      />
                      <span className="ml-2">Select All</span>
                    </th>
                    <th>Agent ID</th>
                    <th>Client ID</th>
                    <th>Txn ID</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tranList.map((tran, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedTransactions.includes(tran[1])}
                          onChange={() =>
                            handleCheckboxChange(tran[1])
                          }
                          disabled={submitLoading}
                        />
                      </td>
                      <td>{tran[0]}</td>
                      <td>{tran[8]}</td>
                      <td className="font-semibold text-blue-600">
                        {tran[1]}
                      </td>
                      <td>{tran[2]}</td>
                      <td>{formatDate(tran[3])}</td>
                      <td>{tran[4]}</td>
                      <td className="font-semibold text-green-600">
                        {tran[5]}
                      </td>
                      <td>{tran[6]}</td>
                      <td>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          {tran[7]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm">
                Selected: {selectedTransactions.length} transaction(s)
              </div>

              <button
                type="submit"
                disabled={submitLoading || !selectedTransactions.length}
                className="px-6 py-2 text-white rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1]"
              >
                {submitLoading ? "Updating..." : "Update Selected"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {(loading || submitLoading) && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-[#4e8fb1] border-t-transparent rounded-full animate-spin mb-2"></div>
            <div className="text-sm">
              {loading
                ? "Searching transactions..."
                : "Updating transactions..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingTransaction;
