"use client";
import React, { useState, useEffect } from "react";

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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-xl shadow-sm">

        {/* HEADER */}
        <div className="text-white font-bold text-[16px] px-6 py-3 rounded-t-xl bg-gradient-to-r from-[#4e8fb1] to-[#5fa3c6]">
          Control Panel &gt; Add / Modify IFSC Code
        </div>

        {/* BODY */}
        <div className="p-6">

          {message && (
            <div className="text-center bg-green-100 text-green-700 py-2 rounded mb-4 text-sm">
              {message}
            </div>
          )}

          {/* INFO BOX */}
          <div className="mb-4 p-3 rounded bg-[#e9f6fc] border-l-[5px] border-[#4e8fb1] text-sm">
            Enter an IFSC Code to search, add, or update bank details.
          </div>

          {/* SEARCH */}
          <form onSubmit={handleSearch}>
            <div className="flex justify-center mb-4">
              <input
                name="ifscCode"
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
                    <option key={i} value={b}>
                      {b}
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
                  maxLength={11}
                  disabled={flag === "Y"}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              {/* BRANCH */}
              <div>
                <label className="text-sm font-medium">Branch Name</label>
                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              {/* STATE */}
              <div>
                <label className="text-sm font-medium">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                >
                  <option value="">Select State</option>
                  {states.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* CITY */}
              <div>
                <label className="text-sm font-medium">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!formData.state}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-lg"
                >
                  <option value="">
                    {formData.state
                      ? "Select City"
                      : "Select State First"}
                  </option>

                  {cities.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
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

export default IfscCode;
