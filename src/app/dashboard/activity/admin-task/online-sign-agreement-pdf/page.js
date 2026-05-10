"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const OnlineSignAgreementPDF = () => {
  const [portal, setPortal] = useState("RO");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size / 1024 > 1024) {
      alert("File size should be below 1 MB");
      e.target.value = "";
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select PDF file");
      return;
    }

    setMessage("PDF uploaded successfully (frontend only)");
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Online Sign Agreement"
        description="Upload agreement PDF for selected portal"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="text-center mb-4 font-medium">
            {message}
          </div>
        )}

        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>

            {/* SELECT PORTAL */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Select Portal
              </label>

              <div className="text-center">:</div>

              <select
                value={portal}
                onChange={(e) => setPortal(e.target.value)}
                className="capsSelect"
              >
                <option value="RO">RO</option>
                <option value="DS">DS</option>
                <option value="MDS">MDS</option>
                <option value="WL">White Label</option>
                <option value="API">API</option>
              </select>
            </div>

            {/* FILE UPLOAD */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-2">
              <label className="text-right font-medium">
                Browse PDF
              </label>

              <div className="text-center">:</div>

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="capsInput"
              />
            </div>

            <div className="text-center mb-5 text-xs text-gray-500">
              PDF only, size below 1 MB
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                type="submit"
                className="capsButton min-w-[120px]"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </PageCard>
    </div>
  );
};

export default OnlineSignAgreementPDF;
