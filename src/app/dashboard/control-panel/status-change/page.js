"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    setSearchData((prev) => ({
      ...prev,
      fromDate: today,
      toDate: today,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (tranId) => {
    setSelectedTransactions((prev) =>
      prev.includes(tranId)
        ? prev.filter((id) => id !== tranId)
        : [...prev, tranId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = tranList.map((tran) => tran[1]);
      setSelectedTransactions(allIds);
    } else {
      setSelectedTransactions([]);
    }
  };

  const validateSearchForm = () => {
    const { fromDate, toDate } = searchData;

    if (!fromDate || !toDate) {
      alert("Please select both From Date and To Date");
      return false;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      alert("From Date cannot be greater than To Date");
      return false;
    }

    return true;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!validateSearchForm()) return;

    try {
      setLoading(true);
      setMessage("");
      setTranList([]);
      setSelectedTransactions([]);

      await new Promise((r) => setTimeout(r, 1200));

      const mockTranList = [
        [
          "AGENT001",
          "TXN001",
          "DMR-ARemit",
          "2024-01-15",
          "14:30:45",
          "₹5,000.00",
          "₹50.00",
          "Pending",
          "CLIENT001",
        ],
        [
          "AGENT002",
          "TXN002",
          "AccountVerification-AREMIT",
          "2024-01-15",
          "15:45:22",
          "₹2,500.00",
          "₹25.00",
          "Pending",
          "CLIENT002",
        ],
      ];

      setTranList(mockTranList);
      setMessage(`Found ${mockTranList.length} pending transactions`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTransactions.length) {
      alert("You have to check at least one transaction.");
      return;
    }

    if (!window.confirm("Do you want to update?")) return;

    try {
      setSubmitLoading(true);

      await new Promise((r) => setTimeout(r, 1200));

      alert("Updated Successfully");
      setMessage(`${selectedTransactions.length} transaction(s) updated`);
      setSelectedTransactions([]);

      await handleSearch({ preventDefault: () => {} });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleClear = () => {
    setSearchData((prev) => ({
      ...prev,
      service: "DMR-ARemit",
      tranId: "",
    }));
    setTranList([]);
    setSelectedTransactions([]);
    setMessage("");
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[200px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Control Panel > Pending Transaction Process"
        description="Search and update pending transactions"
      />

      <PageCard>
        {/* MESSAGE */}
        {message && (
          <div className="mb-4 text-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-md py-2">
            {message}
          </div>
        )}

        {/* SEARCH FORM */}
        <form onSubmit={handleSearch}>
          <div className="grid md:grid-cols-4 gap-4 mb-3">
            <div>
              <label className="text-sm font-semibold">Services</label>
              <select
                name="service"
                value={searchData.service}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="DMR-ARemit">DMR-ARemit</option>
                <option value="AccountVerification-AREMIT">
                  AccountVerification-AREMIT
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">
                Txn No / Txn Id
              </label>
              <input
                name="tranId"
                value={searchData.tranId}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Enter Transaction ID"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={searchData.fromDate}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-semibold">To Date</label>
              <input
                type="date"
                name="toDate"
                value={searchData.toDate}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 mt-2">
            <button
              className="capsButton px-10"
              disabled={loading}
            >
              {loading ? "Searching..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="capsButtonSecondary px-10"
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </form>
      </PageCard>

      {/* TABLE */}
      {tranList.length > 0 && (
        <PageCard>
          <div className="font-semibold mb-3">
            Pending Transactions ({tranList.length})
          </div>

          <form onSubmit={handleUpdateSubmit}>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedTransactions.length === tranList.length
                        }
                      />{" "}
                      Select All
                    </th>
                    <th className="border">Agent ID</th>
                    <th className="border">Client ID</th>
                    <th className="border">Txn ID</th>
                    <th className="border">Service</th>
                    <th className="border">Date</th>
                    <th className="border">Time</th>
                    <th className="border">Amount</th>
                    <th className="border">Fee</th>
                    <th className="border">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tranList.map((tran, i) => (
                    <tr key={i} className="text-center">
                      <td className="border">
                        <input
                          type="checkbox"
                          checked={selectedTransactions.includes(tran[1])}
                          onChange={() =>
                            handleCheckboxChange(tran[1])
                          }
                        />
                      </td>
                      <td className="border">{tran[0]}</td>
                      <td className="border">{tran[8]}</td>
                      <td className="border">{tran[1]}</td>
                      <td className="border">{tran[2]}</td>
                      <td className="border">
                        {formatDate(tran[3])}
                      </td>
                      <td className="border">{tran[4]}</td>
                      <td className="border">{tran[5]}</td>
                      <td className="border">{tran[6]}</td>
                      <td className="border text-orange-600 font-semibold">
                        {tran[7]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="text-sm">
                Selected: {selectedTransactions.length}
              </div>

              <button
                type="submit"
                disabled={!selectedTransactions.length}
                className="capsButtonSuccess px-8 disabled:opacity-50"
              >
                {submitLoading ? "Updating..." : "Update Selected"}
              </button>
            </div>
          </form>
        </PageCard>
      )}

      {/* LOADER */}
      {(loading || submitLoading) && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4fa2c2] border-t-transparent mx-auto mb-2"></div>
            <div className="text-sm font-semibold">
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
