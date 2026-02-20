"use client";
import React, { useEffect, useState } from "react";

const KYCRequest = () => {
  const [channelType, setChannelType] = useState("Mobile App");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [zone, setZone] = useState("all");
  const [showZone, setShowZone] = useState(false);
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFromDate(today);
    setToDate(today);
  }, []);

  const handleChannelChange = (e) => {
    const value = e.target.value;
    setChannelType(value);
    setShowZone(value === "DS_App");
  };

  const submitForm = () => {
    setLoading(true);

    setTimeout(() => {
      setKycList([
        {
          id: 1,
          formNo: "FRM123",
          date: "2026-01-18",
          agentId: "AG1001",
          name: "Rahul Sharma",
          mobile: "9876543210",
          aadhaar: "Pending",
          selfie: "Accept",
          bank: "Pending",
          poi: "Accept",
          poa: "Pending",
          cheque: "Not Given",
          other: "Not Given",
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const getBadgeStyle = (status) => {
    if (status === "Accept")
      return "bg-green-100 text-green-700";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          KYC Request
        </div>

        {/* ===== BODY ===== */}
        <div className="px-4 py-5">

          {/* ===== FILTER FORM ===== */}
          <div className="flex justify-center mb-6">
            <div className="w-[520px]">

              {/* CHANNEL */}
              <div className="mb-4 flex items-center">
                <label className="font-semibold w-1/2 text-right mr-3">
                  Channel
                </label>
                <select
                  value={channelType}
                  onChange={handleChannelChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                >
                  <option>Mobile App</option>
                  <option>Distributor</option>
                  <option>Master Distributor</option>
                  <option value="DS_App">
                    DS Agent Mobile Onboarding
                  </option>
                </select>
              </div>

              {/* FROM DATE */}
              <div className="mb-4 flex items-center">
                <label className="font-semibold w-1/2 text-right mr-3">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* TO DATE */}
              <div className="mb-4 flex items-center">
                <label className="font-semibold w-1/2 text-right mr-3">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* ZONE (Conditional) */}
              {showZone && (
                <div className="mb-4 flex items-center">
                  <label className="font-semibold w-1/2 text-right mr-3">
                    Zone
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                  >
                    <option value="all">All</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                  </select>
                </div>
              )}

              {/* BUTTON */}
              <div className="text-center mt-2">
                <button
                  onClick={submitForm}
                  disabled={loading}
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? "Please wait..." : "Submit"}
                </button>
              </div>

            </div>
          </div>

          {/* ===== TABLE ===== */}
          {kycList.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-center text-sm">
                
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">Form No</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Agent ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Mobile</th>
                    <th className="border p-2">Aadhaar</th>
                    <th className="border p-2">Selfie</th>
                    <th className="border p-2">Bank</th>
                    <th className="border p-2">POI</th>
                    <th className="border p-2">POA</th>
                    <th className="border p-2">Cheque</th>
                    <th className="border p-2">Other</th>
                    <th className="border p-2">Remarks</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {kycList.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2">{row.formNo}</td>
                      <td className="border p-2">{row.date}</td>
                      <td className="border p-2">{row.agentId}</td>
                      <td className="border p-2">{row.name}</td>
                      <td className="border p-2">{row.mobile}</td>

                      {["aadhaar", "selfie", "bank", "poi", "poa"].map((key) => (
                        <td key={key} className="border p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getBadgeStyle(
                              row[key]
                            )}`}
                          >
                            {row[key]}
                          </span>
                        </td>
                      ))}

                      <td className="border p-2">{row.cheque}</td>
                      <td className="border p-2">{row.other}</td>

                      <td className="border p-2">
                        <input
                          placeholder="Remarks"
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#4c95b3]"
                        />
                      </td>

                      <td className="border p-2">
                        <button
                          className="px-3 py-1 text-xs text-white rounded-md bg-green-600 hover:bg-green-700 transition"
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default KYCRequest;
