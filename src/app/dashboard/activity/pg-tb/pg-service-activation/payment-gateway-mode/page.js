"use client";

import React, { useState } from "react";

const PaymentGatewayMode = () => {
  const [userType, setUserType] = useState("");
  const [all, setAll] = useState(false);

  const [vendors, setVendors] = useState([
    { id: "paytm", name: "PAYTM", checked: false, status: "Deactivated", action: "" },
    { id: "payu", name: "PAYU", checked: false, status: "Deactivated", action: "" },
    { id: "razorpay", name: "RAZORPAY", checked: false, status: "Deactivated", action: "" },
    { id: "cashfree", name: "CASHFREE", checked: false, status: "Deactivated", action: "" },
    { id: "lyra", name: "LYRA", checked: false, status: "Deactivated", action: "" },
  ]);

  /* ===== SELECT ALL ===== */
  const toggleAll = (checked) => {
    setAll(checked);
    setVendors(vendors.map(v => ({ ...v, checked })));
  };

  /* ===== SINGLE CHECK ===== */
  const toggleVendor = (id, checked) => {
    const updated = vendors.map(v =>
      v.id === id ? { ...v, checked } : v
    );
    setVendors(updated);
    setAll(updated.every(v => v.checked)); // sync select-all
  };

  /* ===== ACTION CHANGE ===== */
  const changeAction = (id, value) => {
    setVendors(
      vendors.map(v =>
        v.id === id ? { ...v, action: value } : v
      )
    );
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = (status) => {
    const updated = vendors.map(v =>
      v.checked ? { ...v, status } : v
    );

    setVendors(updated);
    console.log("Updated Vendors:", updated);
    alert(`Selected vendors ${status}`);
  };

  const badgeStyle = (status) =>
    status === "Activated"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600";

  const hasSelection = vendors.some(v => v.checked);

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Payment Gateway Mode
        </div>

        {/* ===== BODY ===== */}
        <div className="px-5 py-6">

          {/* USER TYPE */}
          <div className="flex justify-center mb-6">
            <div className="w-[520px] flex items-center">
              <label className="font-semibold w-1/2 text-right mr-3">
                Select User Type
              </label>

              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
              >
                <option value="">Select</option>
                <option value="Agent">Agent</option>
                <option value="Distributor">Distributor</option>
                <option value="Master Distributor">
                  Master Distributor
                </option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          {userType && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-center text-sm">

                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">
                        <input
                          type="checkbox"
                          checked={all}
                          onChange={(e) => toggleAll(e.target.checked)}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="border p-2">S.No</th>
                      <th className="border p-2">Vendor</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vendors.map((v, i) => (
                      <tr
                        key={v.id}
                        className={`hover:bg-gray-50 ${
                          v.checked ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="border p-2">
                          <input
                            type="checkbox"
                            checked={v.checked}
                            onChange={(e) =>
                              toggleVendor(v.id, e.target.checked)
                            }
                            className="w-4 h-4"
                          />
                        </td>

                        <td className="border p-2">{i + 1}</td>

                        <td className="border p-2 font-semibold">
                          {v.name}
                        </td>

                        <td className="border p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${badgeStyle(
                              v.status
                            )}`}
                          >
                            {v.status}
                          </span>
                        </td>

                        <td className="border p-2">
                          <select
                            value={v.action}
                            onChange={(e) =>
                              changeAction(v.id, e.target.value)
                            }
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs
                                       focus:outline-none focus:ring-1 focus:ring-[#4c95b3]"
                          >
                            <option value="">Select</option>
                            <option value="Activated">Activate</option>
                            <option value="Deactivated">Deactivate</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-6 mt-6">
                <button
                  onClick={() => handleSubmit("Activated")}
                  disabled={!hasSelection}
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition disabled:opacity-50"
                >
                  Activate
                </button>

                <button
                  onClick={() => handleSubmit("Deactivated")}
                  disabled={!hasSelection}
                  className="px-6 py-2 rounded-2xl shadow border border-gray-400
                             hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Deactivate
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayMode;
