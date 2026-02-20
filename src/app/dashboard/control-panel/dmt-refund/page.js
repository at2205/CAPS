"use client";
import React, { useState } from "react";

function DmtRefundOtp() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    userId: "",
    mappingType: "",
    transactionId: "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const endPoint = "/";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : "";

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : "";

  /* ================= INPUT HANDLER ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
      userId: userId,
    }));
  };

  /* ================= GET OTP ================= */
  const handleGetOtp = async (e) => {
    e.preventDefault();

    if (!formValues.transactionId.trim()) {
      setError("Please enter Transaction ID");
      setSuccess("");
      return;
    }

    if (!baseUrl) {
      setError("Base URL not configured");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");
    setMessage("");

    const formData = new FormData();
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status === "0") {
        setSuccess("OTP sent successfully.");
        setError("");
      } else {
        setError(
          result.message ||
            "Something went wrong, please try again"
        );
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Error processing request.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 rounded-t-xl text-[18px] bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          DMT Refund OTP
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          <form onSubmit={handleGetOtp} className="space-y-4">

            {/* TRANSACTION ID */}
            <div className="flex justify-center items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap w-[320px] text-right">
                Service Delivery TID / Transaction ID :
              </label>

              <input
                type="text"
                name="transactionId"
                placeholder="Enter TID / Transaction ID"
                value={formValues.transactionId}
                onChange={handleInputChange}
                className="w-[250px] px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
              />
            </div>

            {/* MESSAGE / SPINNER */}
            <div className="text-center min-h-[30px]">

              {loading && (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {success && (
                <p className="text-green-600 text-sm mt-2">
                  {success}
                </p>
              )}

              {error && (
                <p className="text-red-600 text-sm mt-2">
                  {error}
                </p>
              )}

              {message && (
                <p className="text-red-600 text-sm mt-2">
                  {message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-1.5 text-sm text-white rounded-md bg-[#4fa2c2] hover:bg-[#3d89a6] transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}

                {loading ? "Sending OTP..." : "GET OTP"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default DmtRefundOtp;
