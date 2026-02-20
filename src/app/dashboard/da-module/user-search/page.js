"use client";
import React, { useState } from "react";

const UserSearch = () => {
  const [userType, setUserType] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailID, setEmailID] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (!userType) {
      alert("Please select User Type");
      return;
    }

    if (!mobileNo && !emailID && !searchUserId) {
      alert("Please enter any one value");
      return;
    }

    if (mobileNo && mobileNo.length < 10) {
      alert("Please enter valid mobile number");
      return;
    }

    setMessage("Search submitted successfully ✅ (API later)");
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const primaryBtn =
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] text-white " +
    "px-6 py-2 rounded-xl shadow-md text-sm font-semibold hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[900px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          User Search
        </div>

        {/* ===== BODY ===== */}
        <div className="px-6 py-6 flex justify-center">
          <div className="w-[520px]">

            {/* MESSAGE */}
            {message && (
              <div className="mb-4 text-center text-green-700 bg-green-100 border border-green-200 rounded-md py-2 text-sm font-medium">
                {message}
              </div>
            )}

            {/* USER TYPE */}
            <div className="mb-3 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Select User :
              </label>
              <div className="w-1/2">
                <select
                  className={inputStyle}
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select User Type</option>
                  <option value="adminUser">Admin User</option>
                  <option value="mds">Master Distributor</option>
                  <option value="ds">Distributor</option>
                  <option value="agent">Agent</option>
                  <option value="egen">Egen</option>
                </select>
              </div>
            </div>

            {/* MOBILE */}
            <div className="mb-3 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Mobile Number :
              </label>
              <div className="w-1/2">
                <input
                  className={inputStyle}
                  type="text"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-3 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Email ID :
              </label>
              <div className="w-1/2">
                <input
                  className={inputStyle}
                  type="text"
                  value={emailID}
                  onChange={(e) => setEmailID(e.target.value)}
                />
              </div>
            </div>

            {/* USER ID */}
            <div className="mb-5 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                User ID :
              </label>
              <div className="w-1/2">
                <input
                  className={inputStyle}
                  type="text"
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button className={primaryBtn} onClick={handleSearch}>
                Search
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
