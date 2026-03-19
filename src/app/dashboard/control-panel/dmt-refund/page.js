"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

    setError("");
    setSuccess("");
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
      const response = await fetch(`${baseUrl}/`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.status === "0") {
        setSuccess("OTP sent successfully.");
      } else {
        setError(
          result.message ||
            "Something went wrong, please try again"
        );
      }
    } catch (err) {
      console.error(err);
      setError("Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="DA Module > DMT Refund OTP"
        description="Generate OTP for refund transaction validation"
      />

      <PageCard>
        <form onSubmit={handleGetOtp}>
          <div className="flex justify-center">
            <div className="w-[520px] space-y-4">

              {/* Transaction ID */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Service Delivery TID
                </label>
                <div className="text-center">:</div>

                <input
                  type="text"
                  name="transactionId"
                  placeholder="Enter TID / Transaction ID"
                  value={formValues.transactionId}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="capsInput"
                />
              </div>

              {/* STATUS AREA */}
              <div className="text-center min-h-[32px]">
                {loading && (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {success && (
                  <p className="text-green-600 text-sm">
                    {success}
                  </p>
                )}

                {error && (
                  <p className="text-red-500 text-sm">
                    {error}
                  </p>
                )}

                {message && (
                  <p className="text-red-500 text-sm">
                    {message}
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="text-center pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="capsButton px-10"
                >
                  {loading ? "Sending OTP..." : "GET OTP"}
                </button>
              </div>

            </div>
          </div>
        </form>
      </PageCard>
    </div>
  );
}

export default DmtRefundOtp;
