"use client";
import React, { useState, useEffect } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ApmIfscCode = () => {
  const [searchData, setSearchData] = useState({ ifscCode: "" });

  const [formData, setFormData] = useState({
    bank: "",
    otherBank: "",
    ifsc: "",
    shortcode: "",
    bank_category: "IMPS",
    oldifsc: "",
  });

  const [showOtherBank, setShowOtherBank] = useState(false);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    setBankList([
      { value: "STATE BANK OF INDIA", label: "STATE BANK OF INDIA" },
      { value: "HDFC BANK", label: "HDFC BANK" },
      { value: "ICICI BANK", label: "ICICI BANK" },
      { value: "AXIS BANK", label: "AXIS BANK" },
      { value: "PUNJAB NATIONAL BANK", label: "PUNJAB NATIONAL BANK" },
    ]);
  }, []);

  const handleSearchChange = (e) => {
    setSearchData({ ifscCode: e.target.value.toUpperCase() });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bank") {
      setShowOtherBank(value === "others");
      setFormData((p) => ({
        ...p,
        bank: value,
        otherBank: value === "others" ? p.otherBank : "",
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [name]: value.toUpperCase(),
      }));
    }
  };

  const validateIfsc = (ifsc) => /^[A-Z0-9]{11}$/.test(ifsc);
  const validateAlphabetic = (value) => /^[A-Z\s]+$/.test(value);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchData.ifscCode)
      return alert("Please enter the IFSC Code");

    if (!validateIfsc(searchData.ifscCode))
      return alert("IFSC must be 11 characters Alpha Numeric");

    try {
      setLoading(true);
      setMessage("");

      await new Promise((r) => setTimeout(r, 1200));

      const mockIfscData = {
        SBIN0001234: {
          BANK: "STATE BANK OF INDIA",
          IFSC: "SBIN0001234",
          BANKCODE: "SBI001",
          bank_category: "IMPS",
        },
        HDFC0005678: {
          BANK: "HDFC BANK",
          IFSC: "HDFC0005678",
          BANKCODE: "HDFC001",
          bank_category: "NEFT",
        },
      };

      const ifscDetails = mockIfscData[searchData.ifscCode];

      if (ifscDetails) {
        setFlag("Y");
        setFormData({
          bank: ifscDetails.BANK,
          otherBank: "",
          ifsc: ifscDetails.IFSC,
          shortcode: ifscDetails.BANKCODE,
          bank_category: ifscDetails.bank_category,
          oldifsc: ifscDetails.IFSC,
        });
        setShowOtherBank(false);
        setMessage("IFSC found. You can update details.");
      } else {
        setFlag("N");
        setFormData({
          bank: "",
          otherBank: "",
          ifsc: searchData.ifscCode,
          shortcode: "",
          bank_category: "IMPS",
          oldifsc: "",
        });
        setMessage("IFSC not found. You can add new details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateAddForm = () => {
    const { bank, otherBank, ifsc, shortcode } = formData;

    if (!bank) return alert("Select Bank"), false;

    if (bank === "others") {
      if (!otherBank) return alert("Enter Other Bank Name"), false;
      if (!validateAlphabetic(otherBank))
        return alert("Other Bank must be CAPITAL letters only"), false;
    }

    if (!ifsc || !validateIfsc(ifsc))
      return alert("Enter valid IFSC Code"), false;

    if (!shortcode) return alert("Enter Short Code"), false;

    return true;
  };

  const resetForm = () => {
    setSearchData({ ifscCode: "" });
    setFormData({
      bank: "",
      otherBank: "",
      ifsc: "",
      shortcode: "",
      bank_category: "IMPS",
      oldifsc: "",
    });
    setShowOtherBank(false);
    setFlag("");
  };

  const handleSubmitDetails = async () => {
    if (!validateAddForm()) return;

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));

      setMessage(
        flag === "Y"
          ? "APM IFSC updated successfully!"
          : "APM IFSC added successfully!"
      );

      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-start justify-center mb-3">
      <label className="w-[220px] text-right text-sm font-semibold pt-1">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Control Panel > Add / Modify APM IFSC Code"
        description="Search, add or update APM IFSC mapping"
      />

      <PageCard>
        {/* MESSAGE */}
        {message && (
          <div className="text-center bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {/* SEARCH */}
        <form onSubmit={handleSearch}>
          <Row label="IFSC Code :">
            <input
              value={searchData.ifscCode}
              onChange={handleSearchChange}
              maxLength={11}
              placeholder="Enter IFSC Code"
              disabled={loading}
              className={`${inputClass} disabled:bg-gray-100`}
            />
          </Row>

          <div className="text-center mt-2 space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="capsButton px-10 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="capsButtonSecondary px-10"
            >
              Clear
            </button>
          </div>
        </form>

        {/* FORM */}
        {(flag === "Y" || flag === "N") && (
          <div className="mt-6">
            <Row label="Bank Name :">
              <select
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                disabled={loading || flag === "Y"}
                className={inputClass}
              >
                <option value="">Select Bank</option>
                {bankList.map((b, i) => (
                  <option key={i} value={b.value}>
                    {b.label}
                  </option>
                ))}
                {flag === "N" && <option value="others">Others</option>}
              </select>
            </Row>

            {showOtherBank && (
              <Row label="Other Bank :">
                <input
                  name="otherBank"
                  value={formData.otherBank}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </Row>
            )}

            <Row label="IFSC Code :">
              <input
                name="ifsc"
                value={formData.ifsc}
                onChange={handleInputChange}
                disabled={flag === "Y"}
                className={inputClass}
              />
            </Row>

            <Row label="Short Code :">
              <input
                name="shortcode"
                value={formData.shortcode}
                onChange={handleInputChange}
                className={inputClass}
              />
            </Row>

            <Row label="Bank Category :">
              <select
                name="bank_category"
                value={formData.bank_category}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="IMPS">IMPS</option>
                <option value="NEFT">NEFT</option>
              </select>
            </Row>

            <div className="text-center mt-4">
              <button
                onClick={handleSubmitDetails}
                disabled={loading}
                className="capsButton px-12 disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : flag === "Y"
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default ApmIfscCode;
