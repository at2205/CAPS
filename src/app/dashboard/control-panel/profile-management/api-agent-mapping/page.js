"use client";
import React, { useState, useRef } from "react";

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
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
    formData.append("adminUserFormBean", JSON.stringify(formValues));

    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

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
    <div className="min-h-screen flex justify-center items-start bg-white">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* PAGE HEADER */}
        <div className="text-white font-bold text-center py-2 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          API Agent Mapping
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          
          {/* TITLE STRIP */}
          <div className="bg-[#4fa2c2] text-white text-center font-semibold py-1.5 rounded-md mb-5">
            API Agent Details Upload
          </div>

          <div className="flex justify-center">
            <div className="w-[520px]">
              
              {/* FILE INPUT */}
              <div className="mb-2 flex items-center">
                <label className="w-1/2 text-right pr-3 font-semibold">
                  Upload Excel File
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
                />
              </div>

              <div className="text-center text-gray-500 text-sm mb-3">
                (.xls / .xlsx format only)
              </div>

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
                  <div className="text-gray-500">Loading...</div>
                )}
              </div>

              {/* BUTTONS */}
              <div className="text-center mt-2">
                <button
                  onClick={handleFileUpload}
                  className="px-5 py-2 mr-3 text-white rounded-full shadow-md bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90"
                >
                  Submit
                </button>

                <button
                  onClick={clearFileInput}
                  className="px-5 py-2 text-white rounded-full shadow-md bg-gradient-to-b from-[#9aa7ad] to-[#7c8a90] hover:opacity-90"
                >
                  Clear
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiAgentMapping;
