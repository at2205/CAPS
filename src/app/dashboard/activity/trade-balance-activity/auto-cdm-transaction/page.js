"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const AutoCDMTransaction = () => {
  const [formData, setFormData] = useState({
    channels: "",
    bank: "",
    userId: "",
    transactionNumber: "",
    transactionAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.channels || !formData.bank || !formData.userId || !formData.transactionNumber || !formData.transactionAmount) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please fill all fields", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), Channels: formData.channels, bankname: formData.bank, portalId: localStorage.getItem("portalId") || "10002", transactionNumber: formData.transactionNumber, transactionAmount: formData.transactionAmount, cdmUserId: formData.userId };
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.autoCdmTxn, new URLSearchParams({ jsonData: JSON.stringify(payload) }));
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") { Swal.fire({ icon: "success", title: "Success", text: data.message || "Transaction processed" }); }
      else { Swal.fire({ icon: "error", title: "Failed", text: data.message || "Transaction failed" }); }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Auto CDM Transaction"
        description="Process CDM transactions for selected channels"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>

            {/* CHANNEL */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                All Channels
              </label>

              <div className="text-center">:</div>

              <select
                name="channels"
                value={formData.channels}
                onChange={handleChange}
                className="capsSelect"
              >
                <option value="">--select--</option>
                <option value="MasterDistributor">
                  Master Distributor
                </option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
              </select>
            </div>

            {/* BANK */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                Bank
              </label>

              <div className="text-center">:</div>

              <select
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="capsSelect"
              >
                <option value="">--select--</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
              </select>
            </div>

            {/* USER ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                RO / DS / MDS User Id
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* TRANSACTION NUMBER */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                Transaction Number
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="transactionNumber"
                value={formData.transactionNumber}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* TRANSACTION AMOUNT */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                Transaction Amount
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="transactionAmount"
                value={formData.transactionAmount}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="capsInput"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                type="submit"
                className="capsButton min-w-[120px]"
              >
                Continue
              </button>
            </div>

          </form>
        </div>

      </PageCard>
    </div>
  );
};

export default AutoCDMTransaction;
