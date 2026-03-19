"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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
    setVendors(vendors.map((v) => ({ ...v, checked })));
  };

  /* ===== SINGLE CHECK ===== */
  const toggleVendor = (id, checked) => {
    const updated = vendors.map((v) =>
      v.id === id ? { ...v, checked } : v
    );
    setVendors(updated);
    setAll(updated.every((v) => v.checked));
  };

  /* ===== ACTION CHANGE ===== */
  const changeAction = (id, value) => {
    setVendors(
      vendors.map((v) =>
        v.id === id ? { ...v, action: value } : v
      )
    );
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = (status) => {
    const updated = vendors.map((v) =>
      v.checked ? { ...v, status } : v
    );

    setVendors(updated);
    alert(`Selected vendors ${status}`);
  };

  const badgeStyle = (status) =>
    status === "Activated"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600";

  const hasSelection = vendors.some((v) => v.checked);

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > Payment Gateway Mode"
        description="Manage activation mode for payment vendors"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[620px] space-y-4">

            {/* User Type */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Select User Type
              </label>
              <div className="text-center">:</div>

              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="Agent">Agent</option>
                <option value="Distributor">Distributor</option>
                <option value="Master Distributor">
                  Master Distributor
                </option>
              </select>
            </div>

            {/* Table */}
            {userType && (
              <>
                <div className="pt-3 overflow-x-auto">
                  <table className="w-full border text-sm text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">
                          <input
                            type="checkbox"
                            checked={all}
                            onChange={(e) =>
                              toggleAll(e.target.checked)
                            }
                          />
                        </th>
                        <th className="border px-3 py-2">S.No</th>
                        <th className="border px-3 py-2">Vendor</th>
                        <th className="border px-3 py-2">Status</th>
                        <th className="border px-3 py-2">Action</th>
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
                          <td className="border py-2">
                            <input
                              type="checkbox"
                              checked={v.checked}
                              onChange={(e) =>
                                toggleVendor(
                                  v.id,
                                  e.target.checked
                                )
                              }
                            />
                          </td>

                          <td className="border">{i + 1}</td>

                          <td className="border font-semibold">
                            {v.name}
                          </td>

                          <td className="border">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${badgeStyle(
                                v.status
                              )}`}
                            >
                              {v.status}
                            </span>
                          </td>

                          <td className="border">
                            <select
                              value={v.action}
                              onChange={(e) =>
                                changeAction(
                                  v.id,
                                  e.target.value
                                )
                              }
                              className="capsInput text-xs py-1"
                            >
                              <option value="">Select</option>
                              <option value="Activated">
                                Activate
                              </option>
                              <option value="Deactivated">
                                Deactivate
                              </option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-6 pt-4">
                  <button
                    onClick={() => handleSubmit("Activated")}
                    disabled={!hasSelection}
                    className="capsButton px-8 disabled:opacity-50"
                  >
                    ACTIVATE
                  </button>

                  <button
                    onClick={() =>
                      handleSubmit("Deactivated")
                    }
                    disabled={!hasSelection}
                    className="capsButtonSecondary px-6 disabled:opacity-50"
                  >
                    DEACTIVATE
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default PaymentGatewayMode;
