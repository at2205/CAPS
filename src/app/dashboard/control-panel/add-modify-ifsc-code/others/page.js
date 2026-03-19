"use client";
import React, { useState, useEffect } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const IfscCode = () => {
  const [searchData, setSearchData] = useState({ ifscCode: "" });

  const [formData, setFormData] = useState({
    bank: "",
    otherBank: "",
    ifsc: "",
    branch: "",
    state: "",
    city: "",
    oldifsc: "",
  });

  const [showOtherBank, setShowOtherBank] = useState(false);
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    setStates(["DELHI", "MAHARASHTRA", "KARNATAKA", "TAMIL NADU"]);
    setBankList([
      "STATE BANK OF INDIA",
      "HDFC BANK",
      "ICICI BANK",
      "AXIS BANK",
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
    } else if (name === "state") {
      setFormData((p) => ({ ...p, state: value, city: "" }));
      fetchCities(value);
    } else {
      setFormData((p) => ({
        ...p,
        [name]: value.toUpperCase(),
      }));
    }
  };

  const fetchCities = async (state) => {
    const mockCityData = {
      DELHI: ["NEW DELHI", "DWARKA"],
      MAHARASHTRA: ["MUMBAI", "PUNE"],
      KARNATAKA: ["BANGALORE", "MYSORE"],
      "TAMIL NADU": ["CHENNAI", "MADURAI"],
    };

    await new Promise((r) => setTimeout(r, 400));
    setCities(mockCityData[state] || []);
  };

  const validateIfsc = (ifsc) => /^[A-Z0-9]{11}$/.test(ifsc);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchData.ifscCode)
      return alert("Please enter IFSC Code");

    if (!validateIfsc(searchData.ifscCode))
      return alert("IFSC must be 11 characters Alpha Numeric");

    try {
      setLoading(true);
      setMessage("");

      await new Promise((r) => setTimeout(r, 1200));

      if (searchData.ifscCode === "SBIN0001234") {
        setFlag("Y");
        setFormData({
          bank: "STATE BANK OF INDIA",
          otherBank: "",
          ifsc: "SBIN0001234",
          branch: "MAIN BRANCH",
          state: "DELHI",
          city: "NEW DELHI",
          oldifsc: "SBIN0001234",
        });

        fetchCities("DELHI");
        setMessage("IFSC found. You can update details.");
      } else {
        setFlag("N");
        setFormData({
          bank: "",
          otherBank: "",
          ifsc: searchData.ifscCode,
          branch: "",
          state: "",
          city: "",
          oldifsc: "",
        });

        setMessage("IFSC not found. You can add new details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSearchData({ ifscCode: "" });
    setFormData({
      bank: "",
      otherBank: "",
      ifsc: "",
      branch: "",
      state: "",
      city: "",
      oldifsc: "",
    });

    setShowOtherBank(false);
    setFlag("");
  };

  const handleSubmitDetails = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));

      setMessage(
        flag === "Y"
          ? "IFSC details updated successfully!"
          : "IFSC details added successfully!"
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
        title="Control Panel > Add / Modify IFSC Code"
        description="Search, add or update IFSC bank details"
      />

      <PageCard>
        {/* MESSAGE */}
        {message && (
          <div className="text-center bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {/* INFO BOX */}
        <div className="mb-4 p-3 rounded bg-[#e9f6fc] border-l-[5px] border-[#4fa0c2] text-sm">
          Enter an IFSC Code to search, add, or update bank details.
        </div>

        {/* SEARCH */}
        <form onSubmit={handleSearch}>
          <Row label="IFSC Code :">
            <input
              name="ifscCode"
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
              className="capsButton px-8 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="capsButtonSecondary px-8"
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
                  <option key={i} value={b}>
                    {b}
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
                maxLength={11}
                disabled={flag === "Y"}
                className={inputClass}
              />
            </Row>

            <Row label="Branch Name :">
              <input
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className={inputClass}
              />
            </Row>

            <Row label="State :">
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select State</option>
                {states.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Row>

            <Row label="City :">
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!formData.state}
                className={`${inputClass} disabled:bg-gray-100`}
              >
                <option value="">
                  {formData.state ? "Select City" : "Select State First"}
                </option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Row>

            <div className="text-center mt-4">
              <button
                onClick={handleSubmitDetails}
                disabled={loading}
                className="capsButton px-10 disabled:opacity-50"
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

export default IfscCode;
