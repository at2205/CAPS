"use client";
import React, { useState, useRef } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function ApiAgentMapping() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({ userId: "" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "/api/getexcelApiAgentMapping";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const fileInputRef = useRef(null);

  /* ---------------- HELPERS ---------------- */

  const isExcelFile = (file) =>
    file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setSelectedFile(null);
    setMessage("");
    setSuccess("");
    setError("");
  };

  const handleFileChange = (e) => {
    setFormValues({ userId });
    const file = e.target.files[0];

    if (file && isExcelFile(file)) {
      setSelectedFile(file);
      setMessage("");
    } else {
      setSelectedFile(null);
      setMessage("Please select a valid .xls or .xlsx file");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("ExcelFile", selectedFile);
    formData.append(
      "adminUserFormBean",
      JSON.stringify(formValues)
    );

    try {
      const response = await fetch(
        `${baseUrl}${endPoint}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.status === "0") {
        setSuccess("File uploaded successfully.");
        setError("");
      } else {
        setError("Something went wrong, please try again.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Error uploading file.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="API Agent Mapping"
        description="Upload API Agent Excel mapping file"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* FILE INPUT */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-1">
              <label className="text-right font-medium">
                Upload Excel File
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
                href="https://portal.bankit.in:9090/Demo/Links/APIAgentMapping.xlsx"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Click here
              </a>{" "}
              to download excel format
            </div>

            {/* STATUS */}
            <div className="text-center mb-3 text-sm">
              {success && (
                <p className="text-green-600">{success}</p>
              )}
              {error && (
                <p className="text-red-500">{error}</p>
              )}
              {loading && (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                onClick={handleFileUpload}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Uploading..." : "Submit"}
              </button>

              <button
                onClick={clearFileInput}
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
}

export default ApiAgentMapping;
