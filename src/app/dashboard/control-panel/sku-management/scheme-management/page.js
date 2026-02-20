"use client";
import React, { useState } from "react";
import axios from "axios";

function SchemeManagement() {
  const [clientId, setClientId] = useState("");
  const [mdList, setMdList] = useState([]);
  const [mdId, setMdId] = useState("all");

  const [categoryList, setCategoryList] = useState([]);
  const [mainServiceList, setMainServiceList] = useState([]);
  const [subServiceList, setSubServiceList] = useState([]);

  const [category, setCategory] = useState("");
  const [mainService, setMainService] = useState("");
  const [subService, setSubService] = useState("");

  const [skuData, setSkuData] = useState([]);
  const [checked, setChecked] = useState([]);

  const [otpBox, setOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const selectClass =
    "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  /* ================= GET MD ID ================= */
  const getMDIDDetails = async () => {
    if (!clientId) {
      alert("Please enter a valid Client ID.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `/SKUaction.action?param=getSBCUserTypeData&EnterUserId=${clientId}`
      );

      setMdList(res.data?.mdIdList || []);
      setCategoryList(res.data?.categoryList || []);
      setMainServiceList(res.data?.mainServiceList || []);
      setSubServiceList(res.data?.subServiceList || []);
    } catch {
      alert("Invalid Client ID");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`/SKUaction.action?param=getSBCData`, {
        clientId,
        mdId,
        category,
        mainService,
        subService,
      });

      setSkuData(res.data?.skuData || []);
    } catch {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const sendOTP = async () => {
    if (checked.length === 0) {
      alert("Select checkbox first");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`/SKUaction.action?param=sendEmailForCBS`);
      alert("OTP sent successfully!");
      setOtpBox(true);
    } catch {
      alert("OTP sending failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `/SKUaction.action?param=validateOtp&otp=${otp}`
      );

      res.data === true
        ? alert("OTP Verified!")
        : alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[900px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-lg rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Scheme Management
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {/* CLIENT ID */}
          <div className="flex items-center justify-center mb-3">
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
          </div>

          {/* GO BUTTON */}
          <div className="flex justify-center mb-4">
            <button
              onClick={getMDIDDetails}
              className="px-5 py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
            >
              Go
            </button>
          </div>

          {/* FILTERS */}
          {mdList.length > 0 && (
            <div className="space-y-2">

              <FilterRow label="MDS ID">
                <select
                  value={mdId}
                  onChange={(e) => setMdId(e.target.value)}
                  className={selectClass}
                >
                  {mdList.map((m, i) => (
                    <option key={i} value={m.key}>
                      {m.value}
                    </option>
                  ))}
                </select>
              </FilterRow>

              <FilterRow label="Category">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={selectClass}
                >
                  {categoryList.map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>
              </FilterRow>

              <FilterRow label="Main Service">
                <select
                  value={mainService}
                  onChange={(e) => setMainService(e.target.value)}
                  className={selectClass}
                >
                  {mainServiceList.map((m, i) => (
                    <option key={i}>{m}</option>
                  ))}
                </select>
              </FilterRow>

              <FilterRow label="Sub Service">
                <select
                  value={subService}
                  onChange={(e) => setSubService(e.target.value)}
                  className={selectClass}
                >
                  {subServiceList.map((s, i) => (
                    <option key={i}>{s}</option>
                  ))}
                </select>
              </FilterRow>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* LOADER */}
          {loading && (
            <div className="text-center mt-3 text-sm text-gray-500 animate-pulse">
              Processing...
            </div>
          )}

          {/* TABLE */}
          {skuData.length > 0 && (
            <>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-sm border border-gray-300">
                  <thead className="bg-[#4fa2c2] text-white">
                    <tr>
                      <th className="p-2"></th>
                      <th className="p-2">S.N</th>
                      <th className="p-2">Main</th>
                      <th className="p-2">Sub</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">SKU</th>
                    </tr>
                  </thead>

                  <tbody>
                    {skuData.map((row, i) => (
                      <tr key={i} className="text-center border-t">
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={checked.includes(row.id)}
                            onChange={() => toggleCheck(row.id)}
                          />
                        </td>
                        <td>{i + 1}</td>
                        <td>{row.MainService}</td>
                        <td>{row.SubService}</td>
                        <td>{row.Category}</td>
                        <td>{row.SKUName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SEND OTP */}
              <div className="text-center mt-4">
                <button
                  onClick={sendOTP}
                  className="px-6 py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
                >
                  Send OTP
                </button>
              </div>

              {/* OTP BOX */}
              {otpBox && (
                <div className="flex justify-center mt-4">
                  <div className="w-[220px] space-y-2">
                    <input
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={inputClass}
                    />

                    <button
                      onClick={verifyOTP}
                      className="w-full py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Filter Row */
const FilterRow = ({ label, children }) => (
  <div className="flex items-center justify-center">
    <label className="w-[140px] text-right text-sm font-semibold">
      {label} :
    </label>
    <div className="w-[260px] ml-3">{children}</div>
  </div>
);

export default SchemeManagement;
