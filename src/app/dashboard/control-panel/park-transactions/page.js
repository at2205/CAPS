"use client";
import React, { useState, useEffect } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ParkingTransaction = () => {
  const [transactionType, setTransactionType] = useState("neft");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [parkTransactions, setParkTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchParkTransactions();
  }, []);

  const fetchParkTransactions = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));

      setParkTransactions([
        {
          aesApiId: "API001",
          companyName: "ABC Corporation Pvt. Ltd.",
          transactionCount: 25,
          status: true,
          transactionStatus: "Active",
        },
        {
          aesApiId: "API002",
          companyName: "XYZ Enterprises",
          transactionCount: 18,
          status: false,
          transactionStatus: "Inactive",
        },
        {
          aesApiId: "API003",
          companyName: "PQR Solutions",
          transactionCount: 42,
          status: true,
          transactionStatus: "Active",
        },
        {
          aesApiId: "API004",
          companyName: "MNO Industries",
          transactionCount: 12,
          status: false,
          transactionStatus: "Inactive",
        },
        {
          aesApiId: "API005",
          companyName: "DEF Technologies",
          transactionCount: 31,
          status: true,
          transactionStatus: "Active",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);

    if (newVal) {
      setSelectedItems(parkTransactions.map((i) => i.aesApiId));
    } else {
      setSelectedItems([]);
    }
  };

  const handleAction = async (type) => {
    if (!selectedItems.length)
      return alert("Select at least one transaction");

    if (!window.confirm(`Confirm ${type} for selected transactions?`))
      return;

    try {
      setActionLoading(true);
      setMessage("");
      setErrorMessage("");

      await new Promise((r) => setTimeout(r, 1200));

      setMessage(
        `${type === "PARK" ? "Parked" : "Released"} ${
          selectedItems.length
        } transaction(s) successfully!`
      );

      await fetchParkTransactions();
      setSelectedItems([]);
      setSelectAll(false);
    } finally {
      setActionLoading(false);
    }
  };

  const badgeClass = (active, type = "status") => {
    if (type === "parking") {
      return active
        ? "text-[#0a8f08] bg-[#eaf8ef] border-[#b7e3c2]"
        : "text-[#d11a2a] bg-[#fdecea] border-[#f5b5b5]";
    }

    return active
      ? "text-[#0a4fd1] bg-[#eef4ff] border-[#b7ccff]"
      : "text-[#666] bg-[#f5f5f5] border-[#ddd]";
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Control Panel > Parking Transaction"
        description="Manage parking / release of API transactions"
      />

      <PageCard>
        {/* MESSAGE */}
        {message && (
          <div className="text-center bg-green-100 text-green-700 py-2 rounded mb-3 text-sm">
            {message}
          </div>
        )}

        {errorMessage && (
          <div className="text-center bg-red-100 text-red-600 py-2 rounded mb-3 text-sm">
            {errorMessage}
          </div>
        )}

        {/* RADIO BUTTONS */}
        <div className="flex justify-center gap-6 mb-4 text-sm">
          {["neft", "imps", "both"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                checked={transactionType === type}
                onChange={() => setTransactionType(type)}
                className="accent-[#4fa2c2]"
              />
              {type.toUpperCase()}
            </label>
          ))}
        </div>

        {/* LOADER */}
        {loading ? (
          <div className="text-center py-6">
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-2 text-sm">Loading transactions...</div>
          </div>
        ) : (
          <>
            {/* TABLE */}
            <div className="border rounded overflow-hidden">
              <table className="w-full text-sm text-center">
                <thead className="bg-[#4fa2c2] text-white">
                  <tr>
                    <th className="py-2">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Sr. No.</th>
                    <th>API ID</th>
                    <th>Name</th>
                    <th>Transaction Count</th>
                    <th>Action</th>
                    <th>Transaction Status</th>
                  </tr>
                </thead>

                <tbody>
                  {parkTransactions.map((item, index) => (
                    <tr
                      key={item.aesApiId}
                      className={`border-t ${
                        selectedItems.includes(item.aesApiId)
                          ? "bg-[#f0faff]"
                          : ""
                      }`}
                    >
                      <td className="py-2">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.aesApiId)}
                          onChange={() =>
                            handleCheckboxChange(item.aesApiId)
                          }
                        />
                      </td>

                      <td>{index + 1}</td>

                      <td className="font-semibold text-blue-600">
                        {item.aesApiId}
                      </td>

                      <td>{item.companyName}</td>

                      <td className="font-semibold text-green-600">
                        {item.transactionCount}
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-bold ${badgeClass(
                            item.status,
                            "parking"
                          )}`}
                        >
                          {item.status
                            ? "PARKING ON"
                            : "PARKING OFF"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-bold ${badgeClass(
                            item.transactionStatus === "Active"
                          )}`}
                        >
                          {item.transactionStatus.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-4">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded text-sm">
                Selected: {selectedItems.length} item(s)
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAction("PARK")}
                  disabled={actionLoading || !selectedItems.length}
                  className="capsButton px-6 flex items-center gap-2"
                >
                  {actionLoading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  PARK
                </button>

                <button
                  onClick={() => handleAction("RELEASE")}
                  disabled={actionLoading || !selectedItems.length}
                  className="capsButtonSecondary px-6 flex items-center gap-2"
                >
                  {actionLoading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  RELEASE
                </button>
              </div>
            </div>
          </>
        )}
      </PageCard>
    </div>
  );
};

export default ParkingTransaction;
