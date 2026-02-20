"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const EditSKU = () => {
  /* ================= STATE ================= */
  const [clientId, setClientId] = useState("");
  const [mdList, setMdList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [mainServiceList, setMainServiceList] = useState([]);
  const [subServiceList, setSubServiceList] = useState([]);

  const [mode, setMode] = useState(""); // interface | excel
  const [file, setFile] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const [loading, setLoading] = useState(false);

  /* ================= LOAD DROPDOWNS ================= */
  useEffect(() => {
    axios.get("/api/getInitialData").then((res) => {
      setCategoryList(res.data.categories || []);
      setMainServiceList(res.data.mainServices || []);
      setSubServiceList(res.data.subServices || []);
    });
  }, []);

  /* ================= GET MD ================= */
  const getMDID = async () => {
    if (!clientId) {
      alert("Please enter Client ID");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`/api/getMdid/${clientId}`);
      setMdList(res.data || []);
    } catch {
      alert("Failed to fetch MD IDs");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND OTP ================= */
  const sendOtpExcel = async () => {
    if (!file) {
      alert("Please select Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post("/api/sendUploadExcel", formData);
      alert("OTP sent successfully");
      setShowOtp(true);
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`/api/validateOtp?otp=${otp}`);
      res.data === true ? alert("OTP verified") : alert("Invalid OTP");
    } catch {
      alert("OTP validation failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[900px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-lg rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Edit SKU
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {/* CLIENT ID */}
          <div className="flex items-center justify-center mb-4">
            <label className="w-[140px] text-right text-sm font-semibold">
              Client ID :
            </label>

            <div className="w-[260px] ml-3">
              <input
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              onClick={getMDID}
              className="ml-3 px-4 py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
            >
              Go
            </button>
          </div>

          {/* RADIO */}
          <div className="flex justify-center gap-10 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={mode === "interface"}
                onChange={() => {
                  setMode("interface");
                  setShowOtp(false);
                }}
              />
              Interface
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={mode === "excel"}
                onChange={() => {
                  setMode("excel");
                  setShowOtp(false);
                }}
              />
              Update Excel
            </label>
          </div>

          {/* ===== INTERFACE MODE ===== */}
          {mode === "interface" && (
            <div className="space-y-3">

              <SelectBox label="Select MDS">
                <option>Select MDS</option>
                {mdList.map((md, i) => (
                  <option key={i}>{md}</option>
                ))}
              </SelectBox>

              <SelectBox label="Select Category">
                <option>Select Category</option>
                {categoryList.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </SelectBox>

              <div className="flex justify-center pt-2">
                <button className="w-[260px] py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90">
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* ===== EXCEL MODE ===== */}
          {mode === "excel" && (
            <div className="space-y-3">

              <SelectBox label="Upload Excel">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="text-sm"
                />
              </SelectBox>

              <div className="flex justify-center">
                <button
                  onClick={sendOtpExcel}
                  className="w-[260px] py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
                >
                  Send OTP
                </button>
              </div>
            </div>
          )}

          {/* ===== OTP ===== */}
          {showOtp && mode === "excel" && (
            <div className="mt-4 space-y-2">

              <SelectBox label="Enter OTP">
                <input
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={inputClass}
                  placeholder="Enter OTP"
                />
              </SelectBox>

              <div className="flex justify-center">
                <button
                  onClick={verifyOtp}
                  className="w-[260px] py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}

          {/* LOADER */}
          {loading && (
            <div className="text-center mt-4 text-sm text-gray-500 animate-pulse">
              Processing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* Reusable Select Row */
const SelectBox = ({ label, children }) => (
  <div className="flex items-center justify-center">
    <label className="w-[140px] text-right text-sm font-semibold">
      {label} :
    </label>
    <div className="w-[260px] ml-3">
      {children}
    </div>
  </div>
);

export default EditSKU;
