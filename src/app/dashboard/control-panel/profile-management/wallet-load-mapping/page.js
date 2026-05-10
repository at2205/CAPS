"use client";
import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

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
        title="Wallet Load Mapping"
        description="Upload wallet mapping Excel file"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* MAPPING TYPE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                Mapping Type
              </label>
              <div className="text-center">:</div>

              <select
                name="mappingType"
                value={formValues.mappingType}
                onChange={handleInputChange}
                className="capsInput"
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
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-1">
              <label className="text-right font-medium">
                Upload File
              </label>
              <div className="text-center">:</div>

              <input
                type="file"
                onChange={handleFileChange}
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

            {/* BUTTON */}
            <div className="text-center mt-4">
              <button
                onClick={handleFileUpload}
                className="capsButton min-w-[160px]"
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </div>

          </div>
        </div>

      </PageCard>
    </div>
  );
}

export default WalletLoadMapping;
