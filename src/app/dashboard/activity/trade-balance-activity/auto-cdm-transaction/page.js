"use client";

import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const selectStyle = inputStyle;

  const buttonStyle =
    "px-6 py-2 text-white rounded-xl shadow-md text-sm font-medium " +
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Auto CDM Transaction
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-6 flex justify-center">
          <form className="w-[520px]" onSubmit={handleSubmit}>

            {/* CHANNEL */}
            <div className="mb-4 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                All Channels
              </label>
              <select
                className={selectStyle}
                name="channels"
                value={formData.channels}
                onChange={handleChange}
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
            <div className="mb-4 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Bank
              </label>
              <select
                className={selectStyle}
                name="bank"
                value={formData.bank}
                onChange={handleChange}
              >
                <option value="">--select--</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
              </select>
            </div>

            {/* USER ID */}
            <div className="mb-4 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                RO / DS / MDS User Id
              </label>
              <input
                type="text"
                className={inputStyle}
                name="userId"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>

            {/* TRANSACTION NUMBER */}
            <div className="mb-4 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Transaction Number
              </label>
              <input
                type="text"
                className={inputStyle}
                name="transactionNumber"
                value={formData.transactionNumber}
                onChange={handleChange}
              />
            </div>

            {/* TRANSACTION AMOUNT */}
            <div className="mb-6 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Transaction Amount
              </label>
              <input
                type="text"
                className={inputStyle}
                name="transactionAmount"
                value={formData.transactionAmount}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button type="submit" className={buttonStyle}>
                Continue
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AutoCDMTransaction;
