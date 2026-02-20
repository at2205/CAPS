"use client";

import React, { useState } from "react";
import axios from "axios";

const ViewKYCDocument = () => {
  const [platform, setPlatform] = useState("");
  const [agentId, setAgentId] = useState("");
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setKycData(null);

    if (!platform) {
      alert("Please select one platform.");
      return;
    }
    if (!agentId) {
      alert("Please enter Agent ID.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `agentKYCDetails.action?platform=${platform}&agentId=${agentId}`
      );

      if (res.data.status === 100) {
        setKycData(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderImage = (url, label) => {
    if (!url || url === "Not Available") return "Not Available";

    return (
      <a href={url} target="_blank" rel="noreferrer">
        <img
          src={url}
          alt={label}
          className="w-[90px] h-[65px] object-cover rounded-md border border-gray-300 hover:scale-105 transition"
        />
      </a>
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          View KYC Documents
        </div>

        {/* ===== BODY ===== */}
        <div className="px-5 py-5">

          {/* ===== SEARCH FORM ===== */}
          <div className="flex justify-center mb-6">
            <div className="w-[520px]">

              {/* PLATFORM */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold w-1/2 text-right mr-3">
                  Platform
                </label>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={platform === "bankit"}
                      onChange={() => setPlatform("bankit")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">BANKIT</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={platform === "findi"}
                      onChange={() => setPlatform("findi")}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">FINDI</span>
                  </label>
                </div>
              </div>

              {/* AGENT ID */}
              <div className="mb-6 flex items-center">
                <label className="font-semibold w-1/2 text-right mr-3">
                  Agent ID
                </label>

                <input
                  type="text"
                  placeholder="Enter Full Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                />
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
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

          {/* ===== KYC DETAILS TABLE ===== */}
          {kycData && (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">

                <tbody>
                  <tr className="bg-gray-100">
                    <th
                      colSpan="2"
                      className="border p-3 text-center font-semibold"
                    >
                      KYC Details
                    </th>
                  </tr>

                  <tr>
                    <td className="border p-2 font-medium w-[30%]">
                      Agent ID
                    </td>
                    <td className="border p-2">
                      {kycData.agentId || "Not Available"}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2 font-medium">Platform</td>
                    <td className="border p-2">
                      {kycData.platform || platform}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2 font-medium">
                      Onboarding Lat
                    </td>
                    <td className="border p-2">
                      {kycData.onboarding_lat || "Not Available"}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2 font-medium">
                      Onboarding Long
                    </td>
                    <td className="border p-2">
                      {kycData.onboarding_log || "Not Available"}
                    </td>
                  </tr>

                  {/* ===== FINDI ===== */}
                  {platform === "findi" && (
                    <>
                      <tr>
                        <td className="border p-2">Aadhaar</td>
                        <td className="border p-2">
                          {renderImage(kycData.aadhaarUrls, "Aadhaar")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">Selfie</td>
                        <td className="border p-2">
                          {renderImage(kycData.selfieUrls, "Selfie")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">PAN</td>
                        <td className="border p-2">
                          {renderImage(kycData.panUrls, "PAN")}
                        </td>
                      </tr>
                    </>
                  )}

                  {/* ===== BANKIT ===== */}
                  {platform === "bankit" && (
                    <>
                      <tr>
                        <td className="border p-2">Aadhaar Front</td>
                        <td className="border p-2">
                          {renderImage(kycData.aadharFront, "Aadhaar Front")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">Aadhaar Back</td>
                        <td className="border p-2">
                          {renderImage(kycData.aadharBack, "Aadhaar Back")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">PAN</td>
                        <td className="border p-2">
                          {renderImage(kycData.pancard, "PAN")}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ViewKYCDocument;
