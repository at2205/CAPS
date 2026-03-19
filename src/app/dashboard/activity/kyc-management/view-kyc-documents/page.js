"use client";

import React, { useState } from "react";
import axios from "axios";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="View KYC Documents"
        description="Search and view uploaded KYC documents"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* SEARCH FORM */}
        <div className="flex justify-center mb-6">
          <div>

            {/* PLATFORM */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Platform
              </label>

              <div className="text-center">:</div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={platform === "bankit"}
                    onChange={() => setPlatform("bankit")}
                  />
                  <span className="text-sm font-medium">BANKIT</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={platform === "findi"}
                    onChange={() => setPlatform("findi")}
                  />
                  <span className="text-sm font-medium">FINDI</span>
                </label>
              </div>
            </div>

            {/* AGENT ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                Agent ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                placeholder="Enter Full Agent ID"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[120px]"
              >
                {loading ? "Please wait..." : "Submit"}
              </button>
            </div>

          </div>
        </div>

        {/* KYC DETAILS TABLE */}
        {kycData && (
          <>
            <div className="capsColor text-center py-2 font-semibold rounded-md mb-4">
              KYC Details
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm">

                <tbody>
                  <tr>
                    <td className="border p-2 font-medium w-[30%]">
                      Agent ID
                    </td>
                    <td className="border p-2">
                      {kycData.agentId || "Not Available"}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-2 font-medium">
                      Platform
                    </td>
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

                  {/* FINDI */}
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

                  {/* BANKIT */}
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
          </>
        )}

      </PageCard>
    </div>
  );
};

export default ViewKYCDocument;
