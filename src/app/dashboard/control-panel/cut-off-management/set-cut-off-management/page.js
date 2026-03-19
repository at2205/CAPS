"use client";
import React, { useState, useRef } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const SetCutOffManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const isExcelFile = (file) =>
    file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && isExcelFile(file)) {
      setSelectedFile(file);
      setMessage("");
    } else {
      setSelectedFile(null);
      setMessage("Please select a valid .xls or .xlsx file");
    }
  };

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setSelectedFile(null);
    setMessage("");
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setMessage("Please select a file");
      return;
    }

    setLoading(true);

    // API CALL HERE
    setTimeout(() => {
      setLoading(false);
      setMessage("");
      alert("File submitted (demo)");
    }, 1000);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Set Cut-Off Management"
        description="Upload cut-off configuration Excel file"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* FILE INPUT */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-1">
              <label className="text-right font-medium">
                Please Upload File
              </label>
              <div className="text-center">:</div>

              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="capsInput"
              />
            </div>

            <div className="text-center text-gray-500 text-sm mb-3">
              (.xls / .xlsx format only)
            </div>

            {/* VALIDATION MESSAGE */}
            {message && (
              <p className="text-red-500 text-center text-sm mb-2">
                {message}
              </p>
            )}

            {/* DOWNLOAD FORMAT */}
            <div className="text-center mb-3 text-sm">
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                Click here
              </a>{" "}
              to download excel format
            </div>

            {/* STATUS */}
            {loading && (
              <p className="text-center text-sm text-gray-500 mb-2">
                Loading...
              </p>
            )}

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                onClick={clearFile}
                className="capsButtonSecondary min-w-[140px]"
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default SetCutOffManagement;
