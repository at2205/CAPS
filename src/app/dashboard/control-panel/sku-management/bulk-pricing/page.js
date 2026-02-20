"use client";
import React, { useState } from "react";

function BulkPricing() {
  const [pricingType, setPricingType] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const [mainService, setMainService] = useState("select");
  const [vendor, setVendor] = useState("select");
  const [mode, setMode] = useState("select");

  const [showMode, setShowMode] = useState(false);
  const [showMD, setShowMD] = useState(true);

  const handlePricingType = (val) => {
    setPricingType(val);
    setShowOTP(false);
  };

  const handleMainService = (val) => {
    setMainService(val);
    setVendor("select");
    setMode("select");

    setShowMode(false);
    setShowMD(true);

    if (val === "DMC") setShowMode(true);
    if (val === "AEPS" || val === "DMT") setShowMD(false);
  };

  const handleVendor = (val) => {
    setVendor(val);
    if (mainService === "CMS" && val === "Airtel") {
      setShowMD(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[1200px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Bulk Pricing
        </div>

        <div className="px-10 py-6">

          {/* CLIENT ID ROW */}
          <div className="flex justify-center items-center mb-5">
            <label className="w-[140px] text-right text-sm font-semibold">
              Client ID :
            </label>

            <div className="w-[260px] ml-3">
              <input className={inputClass} />
            </div>

            <button className="ml-4 px-5 py-1.5 text-white text-sm rounded-md shadow bg-[#4fa2c2] hover:opacity-90">
              Go
            </button>
          </div>

          {/* RADIO OPTIONS */}
          <div className="flex justify-center gap-10 mb-6 text-sm">
            {[
              ["agentWisePG", "Agent Wise PG Pricing"],
              ["slabWise", "Slab Wise Pricing"],
              ["fixedExcel", "Fixed Pricing (Excel)"],
              ["agentWise", "Agent Wise Pricing"],
            ].map(([val, label]) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={pricingType === val}
                  onChange={() => handlePricingType(val)}
                  className="accent-[#4fa2c2]"
                />
                {label}
              </label>
            ))}
          </div>

          {/* ================= AGENT WISE PG ================= */}
          {pricingType === "agentWisePG" && (
            <Section title="Agent Wise PG Pricing">
              <FileRow />
              <LinkRow text="Download PG Pricing Format" />
              <OTPButton onClick={() => setShowOTP(true)} />
              {showOTP && <OTPBox />}
            </Section>
          )}

          {/* ================= SLAB WISE ================= */}
          {pricingType === "slabWise" && (
            <Section title="Slab Wise Pricing">
              <FileRow />
              <LinkRow text="MDS Slab Pricing Format" />
              <LinkRow text="API Slab Pricing Format" />
              <TextareaRow label="Enter Full IDs" />
              <OTPButton onClick={() => setShowOTP(true)} />
              {showOTP && <OTPBox />}
            </Section>
          )}

          {/* ================= FIXED EXCEL ================= */}
          {pricingType === "fixedExcel" && (
            <Section title="Fixed Pricing (Excel)">
              <FileRow />
              <LinkRow text="MDS Pricing Format" />
              <LinkRow text="API Pricing Format" />
              <TextareaRow label="Enter Full IDs" />
              <OTPButton onClick={() => setShowOTP(true)} />
              {showOTP && <OTPBox />}
            </Section>
          )}

          {/* ================= AGENT WISE ================= */}
          {pricingType === "agentWise" && (
            <Section title="Agent Wise Pricing">

              <SelectRow
                label="Main Service"
                value={mainService}
                onChange={handleMainService}
                options={["AEPS", "DMC", "BBPS", "BBPS FI", "CMS", "DMT"]}
              />

              {showMode && (
                <SelectRow
                  label="Mode"
                  value={mode}
                  onChange={setMode}
                  options={["CC", "DC", "NB", "UPI"]}
                />
              )}

              {mainService === "AEPS" && (
                <SelectRow
                  label="Vendor"
                  value={vendor}
                  onChange={handleVendor}
                  options={["NSDL", "Fingpay"]}
                />
              )}

              {mainService === "BBPS" && (
                <SelectRow
                  label="Vendor"
                  value={vendor}
                  onChange={handleVendor}
                  options={["Setu", "Mobikwik"]}
                />
              )}

              {mainService === "CMS" && (
                <SelectRow
                  label="Vendor"
                  value={vendor}
                  onChange={handleVendor}
                  options={["Airtel", "Fingpay"]}
                />
              )}

              <FileRow />
              <LinkRow text={`${mainService} Pricing Format`} />

              {showMD && <TextareaRow label="Enter MD IDs" />}

              <OTPButton onClick={() => setShowOTP(true)} />
              {showOTP && <OTPBox />}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <div className="bg-[#4fa2c2] text-white font-semibold text-center py-2 rounded-md mb-3 text-sm">
      {title}
    </div>
    <div className="px-3">{children}</div>
  </div>
);

const FileRow = () => (
  <div className="flex justify-center items-center mb-3 text-sm">
    <label className="w-[160px] text-right font-semibold">
      Upload File :
    </label>

    <div className="w-[260px] ml-3">
      <input type="file" className="text-sm" />
    </div>

    <span className="ml-3 text-gray-500">
      .xls / .xlsx only
    </span>
  </div>
);

const LinkRow = ({ text }) => (
  <div className="text-center mb-2">
    <a href="#" className="text-sm text-blue-600 hover:underline">
      {text}
    </a>
  </div>
);

const TextareaRow = ({ label }) => (
  <div className="flex justify-center mb-3">
    <label className="w-[160px] text-right text-sm font-semibold">
      {label} :
    </label>

    <div className="w-[300px] ml-3">
      <textarea
        rows={3}
        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2]"
      />
    </div>
  </div>
);

const SelectRow = ({ label, value, onChange, options }) => (
  <div className="flex justify-center items-center mb-3">
    <label className="w-[160px] text-right text-sm font-semibold">
      {label} :
    </label>

    <div className="w-[260px] ml-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2]"
      >
        <option value="select">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  </div>
);

const OTPButton = ({ onClick }) => (
  <div className="text-center mt-2">
    <button
      onClick={onClick}
      className="px-5 py-1.5 text-white text-sm rounded-md shadow bg-[#4fa2c2] hover:opacity-90"
    >
      Send OTP
    </button>
  </div>
);

const OTPBox = () => (
  <div className="flex justify-center mt-3">
    <div className="bg-[#eaf5fa] border border-[#b7dbe8] rounded-md p-3 w-[280px]">
      <input
        placeholder="Enter OTP"
        maxLength={6}
        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2]"
      />

      <button className="mt-3 w-full bg-[#4fa2c2] text-white text-sm py-1.5 rounded-md shadow">
        Verify OTP
      </button>
    </div>
  </div>
);

export default BulkPricing;
