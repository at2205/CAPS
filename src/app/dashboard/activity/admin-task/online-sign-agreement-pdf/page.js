"use client";

import React, { useState } from "react";

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
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 min-h-[320px] rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Online Sign Agreement PDF Upload
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {message && (
            <div className="text-center mb-4 text-[#2c3e50] font-medium">
              {message}
            </div>
          )}

          <div className="flex justify-center">
            <form className="w-[520px]" onSubmit={handleSubmit}>

              {/* SELECT PORTAL */}
              <div className="mb-5 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Select Portal :
                </label>

                <select
                  value={portal}
                  onChange={(e) => setPortal(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
                >
                  <option value="RO">RO</option>
                  <option value="DS">DS</option>
                  <option value="MDS">MDS</option>
                  <option value="WL">White Label</option>
                  <option value="API">API</option>
                </select>
              </div>

              {/* FILE UPLOAD */}
              <div className="mb-2 flex items-center">
                <label className="font-semibold mr-3 w-1/2 text-right">
                  Browse PDF :
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 file:mr-3 file:px-3 file:py-1 file:border-0 file:rounded-md file:bg-[#4c95b3] file:text-white hover:file:bg-[#3d89a6]"
                />
              </div>

              <div className="text-center mb-5 text-xs text-gray-500">
                PDF only, size below 1 MB
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-2xl shadow bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineSignAgreementPDF;
