"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const SPDUpload = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [visible, setVisible] = useState(false);

  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    setUserId(sessionStorage.getItem("login"));
    setUserType(localStorage.getItem("adminUserType"));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setFileError("Only PDF file allowed");
        setFile(null);
      } else {
        setFile(selectedFile);
        setFileError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    if (!file) {
      setError("Please select a PDF file");
      setVisible(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file1", file);
    formData.append("RequestUserId", userId);
    formData.append("UserType", userType);

    try {
      const response = await fetch(
        "http://localhost:8281/api/upload/spd",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error();

      setSuccess("File uploaded successfully!");
      setVisible(true);
    } catch {
      setError("Upload failed");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setVisible(false);
    if (success) window.location.reload();
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      <CapsCard
        title="SPD File Upload"
        description="Upload SPD PDF file to the system"
      />


      <PageCard>

        <form onSubmit={handleSubmit}>

          <div className="flex flex-col items-center gap-6">

            {/* File Row */}
            <div className="grid grid-cols-[auto_20px_auto] items-center gap-4">

              <label className="text-lg whitespace-nowrap">
                Select PDF File
              </label>

              <div className="text-center text-lg">:</div>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={loading}
                className={`w-96 ${
                  fileError ? "capsInputError" : "capsInput"
                }`}
              />

            </div>

            {/* Info Text */}
            <p className="text-sm text-gray-500">
              .pdf format only
            </p>

            {fileError && (
              <p className="text-red-600 text-sm">
                {fileError}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="capsButton min-w-[120px] flex items-center justify-center"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>

          </div>

        </form>

      </PageCard>

      {/* Modal */}
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">

            <h3 className="text-lg font-semibold mb-4">
              {success ? "Success" : "Error"}
            </h3>

            <p className={success ? "text-green-600" : "text-red-600"}>
              {success || error}
            </p>

            <div className="text-right mt-4">
              <button onClick={closeModal} className="capsButton">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SPDUpload;
