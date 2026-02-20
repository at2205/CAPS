"use client";
import React, { useState, useEffect } from "react";

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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-xl shadow-sm">

        {/* HEADER */}
        <div className="text-white font-bold text-[16px] px-6 py-3 rounded-t-xl bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6]">
          Control Panel &gt; Add / Modify APM IFSC Code
        </div>

        {/* BODY */}
        <div className="p-6">

          {message && (
            <div className="text-center bg-green-100 text-green-700 py-2 rounded mb-4 text-sm">
              {message}
            </div>
          )}

          {/* SEARCH */}
          <form onSubmit={handleSearch}>
            <div className="flex justify-center mb-4">
              <input
                value={searchData.ifscCode}
                onChange={handleSearchChange}
                maxLength={11}
                placeholder="Enter IFSC Code"
                disabled={loading}
                className="w-[280px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5fa3c6]"
              />
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-1.5 text-white text-sm rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1] flex items-center gap-2 disabled:opacity-50"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                Search
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="px-5 py-1.5 text-white text-sm rounded-full bg-gradient-to-b from-[#666] to-[#444] disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>

          {/* FORM */}
          {(flag === "Y" || flag === "N") && (
            <div className="max-w-xl mx-auto space-y-4">

              {/* BANK */}
              <div>
                <label className="text-sm font-medium">Bank Name</label>
                <select
                  name="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  disabled={loading || flag === "Y"}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                >
                  <option value="">Select Bank</option>
                  {bankList.map((b, i) => (
                    <option key={i} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                  {flag === "N" && <option value="others">Others</option>}
                </select>
              </div>

              {/* OTHER BANK */}
              {showOtherBank && (
                <div>
                  <label className="text-sm font-medium">
                    Other Bank Name
                  </label>
                  <input
                    name="otherBank"
                    value={formData.otherBank}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                  />
                </div>
              )}

              {/* IFSC */}
              <div>
                <label className="text-sm font-medium">IFSC Code</label>
                <input
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  disabled={flag === "Y"}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              {/* SHORT CODE */}
              <div>
                <label className="text-sm font-medium">Short Code</label>
                <input
                  name="shortcode"
                  value={formData.shortcode}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium">
                  Bank Category
                </label>
                <select
                  name="bank_category"
                  value={formData.bank_category}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                >
                  <option value="IMPS">IMPS</option>
                  <option value="NEFT">NEFT</option>
                </select>
              </div>

              {/* BUTTON */}
              <div className="text-center pt-2">
                <button
                  onClick={handleSubmitDetails}
                  disabled={loading}
                  className="px-8 py-1.5 text-white text-sm rounded-full bg-gradient-to-b from-[#5fa3c6] to-[#4e8fb1] flex items-center gap-2 mx-auto disabled:opacity-50"
                >
                  {loading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}

                  {flag === "Y" ? "Update" : "Add"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApmIfscCode;
