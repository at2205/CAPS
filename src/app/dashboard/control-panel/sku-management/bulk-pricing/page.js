"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <div className="bg-[#4fa2c2] text-white font-semibold text-center py-2 rounded-md mb-3 text-sm">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      
      {/* HEADER */}
      <CapsCard
        title="Bulk Pricing"
        description="Configure bulk pricing using Excel or interface mode"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[720px]">

            {/* CLIENT ID */}
            <FieldRow label="Client ID">
              <div className="flex gap-2">
                <input className="capsInput" />
                <button className="capsButtonSecondary px-5">
                  Go
                </button>
              </div>
            </FieldRow>

            {/* RADIO OPTIONS */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
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
                  />
                  {label}
                </label>
              ))}
            </div>

            {/* ================= AGENT WISE PG ================= */}
            {pricingType === "agentWisePG" && (
              <Section title="Agent Wise PG Pricing">
                <FileUpload />
                <DownloadLink text="Download PG Pricing Format" />
                <OTPButton onClick={() => setShowOTP(true)} />
                {showOTP && <OTPBox />}
              </Section>
            )}

            {/* ================= SLAB WISE ================= */}
            {pricingType === "slabWise" && (
              <Section title="Slab Wise Pricing">
                <FileUpload />
                <DownloadLink text="MDS Slab Pricing Format" />
                <DownloadLink text="API Slab Pricing Format" />
                <TextArea label="Enter Full IDs" />
                <OTPButton onClick={() => setShowOTP(true)} />
                {showOTP && <OTPBox />}
              </Section>
            )}

            {/* ================= FIXED EXCEL ================= */}
            {pricingType === "fixedExcel" && (
              <Section title="Fixed Pricing (Excel)">
                <FileUpload />
                <DownloadLink text="MDS Pricing Format" />
                <DownloadLink text="API Pricing Format" />
                <TextArea label="Enter Full IDs" />
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

                <FileUpload />
                <DownloadLink text={`${mainService} Pricing Format`} />

                {showMD && <TextArea label="Enter MD IDs" />}

                <OTPButton onClick={() => setShowOTP(true)} />
                {showOTP && <OTPBox />}
              </Section>
            )}

          </div>
        </div>
      </PageCard>
    </div>
  );
}

/* ================= SMALL REUSABLE COMPONENTS ================= */

const FileUpload = () => (
  <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
    <label className="text-right font-medium">Upload File</label>
    <div className="text-center">:</div>
    <input type="file" className="capsInput" />
  </div>
);

const DownloadLink = ({ text }) => (
  <div className="text-center mb-2">
    <a href="#" className="text-sm text-blue-600 hover:underline">
      {text}
    </a>
  </div>
);

const TextArea = ({ label }) => (
  <div className="grid grid-cols-[200px_20px_250px] items-start gap-4 mb-3">
    <label className="text-right font-medium">{label}</label>
    <div className="text-center mt-2">:</div>
    <textarea rows={3} className="capsInput" />
  </div>
);

const SelectRow = ({ label, value, onChange, options }) => (
  <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
    <label className="text-right font-medium">{label}</label>
    <div className="text-center">:</div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="capsInput"
    >
      <option value="select">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const OTPButton = ({ onClick }) => (
  <div className="text-center mt-2">
    <button onClick={onClick} className="capsButton">
      Send OTP
    </button>
  </div>
);

const OTPBox = () => (
  <div className="flex justify-center mt-3">
    <div className="border border-[#b7dbe8] rounded-md p-4 w-[280px] bg-[#eaf5fa]">
      <input
        placeholder="Enter OTP"
        maxLength={6}
        className="capsInput mb-3"
      />
      <button className="capsButton w-full">
        Verify OTP
      </button>
    </div>
  </div>
);

export default BulkPricing;
