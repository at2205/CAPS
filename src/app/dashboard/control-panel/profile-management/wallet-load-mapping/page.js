"use client";
import React, { useState } from "react";

function WalletLoadMapping() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    userId: "",
    mappingType: "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "/api/getexcelLWMapping";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ---------------- HELPERS ---------------- */

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
      userId: userId,
    }));
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
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-2 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Wallet Load Mapping
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          
          {/* TITLE STRIP */}
          <div className="bg-[#4fa2c2] text-white text-center font-semibold py-1.5 rounded-md mb-5">
            Wallet Load Mapping Details Upload
          </div>

          <div className="flex justify-center">
            <div className="w-[520px]">
              
              {/* MAPPING TYPE */}
              <div className="mb-4 flex items-center">
                <label className="w-1/2 text-right pr-3 font-semibold text-sm">
                  Mapping Type
                </label>

                <select
                  name="mappingType"
                  value={formValues.mappingType}
                  onChange={handleInputChange}
                  className="w-1/2 border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
                >
                  <option value="">--select--</option>
                  <option>CMD CardNumber</option>
                  <option>IserveU AEPS</option>
                  <option>ICICI Bank AEPS</option>
                  <option>Yes Bank AEPS</option>
                  <option>Fino Bank AEPS</option>
                  <option>PaysPrint Bank AEPS</option>
                  <option>MPOS Device</option>
                  <option>APMAHESH BBPS</option>
                  <option>Paytm BBPS</option>
                  <option>Paytm Wallet Mapping</option>
                  <option>ICICI Virtual Account Mapping</option>
                  <option>AXIS Virtual Account Mapppping</option>
                  <option>Paytm QR Code</option>
                  <option>
                    Bankit Micro ATM Register Device Details
                  </option>
                </select>
              </div>

              {/* FILE */}
              <div className="mb-2 flex items-center">
                <label className="w-1/2 text-right pr-3 font-semibold text-sm">
                  Upload File
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-1/2 border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
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

              {/* DOWNLOAD */}
              <div className="text-center mb-3 text-sm">
                <a
                  href="https://portal.bankit.in:9090/Demo/Links/WalletMapping.xlsx"
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
                {success && <p className="text-green-600">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                {loading && (
                  <p className="text-gray-500">Loading...</p>
                )}
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  onClick={handleFileUpload}
                  className="px-8 py-2 text-white text-sm rounded-full shadow-md bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletLoadMapping;
