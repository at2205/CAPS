"use client";
import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recordsPerPage = 10;

  const submitForm = async () => {
    if (!fromDate || !toDate) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select date range", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      setKycList([]);
      const payload = {
        userId: localStorage.getItem("userId"),
        type: channelType,
        fromDate,
        toDate,
        zone: zone === "all" ? "" : zone,
        currentPage: String(currentPage),
        recordsPerPage: String(recordsPerPage),
      };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.kycProcessChannel,
        new URLSearchParams({ jsonData: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        const pgData = data.getKYCRequestDataByPaging || {};
        if (pgData.status === 100 && pgData.data) {
          setKycList(pgData.data);
          setTotalPages(pgData.totalPage || 1);
          setCurrentPage(pgData.currentpage || 1);
        } else {
          Swal.fire({ icon: "info", title: "No Data", text: pgData.message || "No KYC records found" });
        }
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to fetch KYC data" });
      }
    } catch (error) {
      console.error("KYC fetch error:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (status) => {
    if (status === "Accept")
      return "bg-green-100 text-green-700";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="KYC Request"
        description="View and manage KYC onboarding requests"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* FILTER FORM */}
        <div className="flex justify-center mb-6">
          <div>

            {/* CHANNEL */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">Channel</label>
              <div className="text-center">:</div>
              <select
                value={channelType}
                onChange={handleChannelChange}
                className="capsSelect"
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
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">From Date</label>
              <div className="text-center">:</div>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* TO DATE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">To Date</label>
              <div className="text-center">:</div>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* ZONE (Conditional) */}
            {showZone && (
              <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
                <label className="text-right font-medium">Zone</label>
                <div className="text-center">:</div>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="capsSelect"
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
                className="capsButton min-w-[120px]"
              >
                {loading ? "Please wait..." : "Submit"}
              </button>
            </div>

          </div>
        </div>

        {/* TABLE */}
        {kycList.length > 0 && (
          <>
            <div className="capsColor text-center py-2 font-semibold rounded-md mb-4">
              KYC Requests
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">

                <thead>
                  <tr className="capsColor">
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
                    <tr key={row.id}>
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

                      <td className="border p-1">
                        <input
                          placeholder="Remarks"
                          className="capsInput px-2 py-1 text-xs"
                        />
                      </td>

                      <td className="border p-2">
                        <button className="capsButton px-4 py-1 text-xs">
                          Submit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default KYCRequest;
