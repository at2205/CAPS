"use client";
import React, { useState } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  /* ================= GET MD DETAILS ================= */
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

  /* ================= SEND OTP ================= */
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

  /* ================= VERIFY OTP ================= */
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

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-2">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Scheme Management"
        description="Manage scheme configuration and SKU mapping"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* CLIENT ID */}
            <FieldRow label="Client ID">
              <input
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="capsInput"
              />
            </FieldRow>

            {/* GO BUTTON */}
            <div className="text-center mt-2 mb-3">
              <button
                onClick={getMDIDDetails}
                className="capsButton min-w-[140px]"
              >
                Go
              </button>
            </div>

            {/* FILTERS */}
            {mdList.length > 0 && (
              <>
                <FieldRow label="MDS ID">
                  <select
                    value={mdId}
                    onChange={(e) => setMdId(e.target.value)}
                    className="capsInput"
                  >
                    {mdList.map((m, i) => (
                      <option key={i} value={m.key}>
                        {m.value}
                      </option>
                    ))}
                  </select>
                </FieldRow>

                <FieldRow label="Category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="capsInput"
                  >
                    {categoryList.map((c, i) => (
                      <option key={i}>{c}</option>
                    ))}
                  </select>
                </FieldRow>

                <FieldRow label="Main Service">
                  <select
                    value={mainService}
                    onChange={(e) => setMainService(e.target.value)}
                    className="capsInput"
                  >
                    {mainServiceList.map((m, i) => (
                      <option key={i}>{m}</option>
                    ))}
                  </select>
                </FieldRow>

                <FieldRow label="Sub Service">
                  <select
                    value={subService}
                    onChange={(e) => setSubService(e.target.value)}
                    className="capsInput"
                  >
                    {subServiceList.map((s, i) => (
                      <option key={i}>{s}</option>
                    ))}
                  </select>
                </FieldRow>

                <div className="text-center mt-3">
                  <button
                    onClick={handleSubmit}
                    className="capsButton min-w-[160px]"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {/* LOADER */}
            {loading && (
              <div className="text-center mt-3 text-sm text-gray-500 animate-pulse">
                Processing...
              </div>
            )}
          </div>
        </div>

        {/* TABLE */}
        {skuData.length > 0 && (
          <>
            <div className="mt-6 overflow-x-auto">
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
                className="capsButton min-w-[160px]"
              >
                Send OTP
              </button>
            </div>

            {/* OTP BOX */}
            {otpBox && (
              <div className="flex justify-center mt-4">
                <div className="w-[260px] space-y-2">
                  <input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="capsInput"
                  />

                  <button
                    onClick={verifyOTP}
                    className="capsButton w-full"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </PageCard>
    </div>
  );
}

export default SchemeManagement;
