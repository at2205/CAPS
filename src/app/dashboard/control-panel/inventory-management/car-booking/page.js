"use client";
import React, { useState, useRef } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function CarBooking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({});

  const fileInputRef = useRef(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "/";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const isExcelFile = (file) =>
    file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && isExcelFile(file)) {
      setSelectedFile(file);
      setMessage("");
    } else {
      setSelectedFile(null);
      setMessage("Please select a valid file");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
      userId,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setMessage("Please select a file");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    const formData = new FormData();
    formData.append("ExcelFile", selectedFile);
    formData.append("adminUserFormBean", JSON.stringify(formValues));

    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === "0") {
        setSuccess("Submit successfully.");
      } else {
        setError("Something went wrong.");
      }
    } catch {
      setError("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormValues({});
    setSelectedFile(null);
    setMessage("");
    setSuccess("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Car Booking"
        description="Configure car booking details"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <FieldRow label="Car Booking Type">
              <select
                name="carBookingType"
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </FieldRow>

            <FieldRow label="Booking Type">
              <select
                name="bookingType"
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option>OutStation</option>
                <option>Local Usage</option>
                <option>Air/Rail Transfer</option>
              </select>
            </FieldRow>

            <FieldRow label="Trip Type">
              <select
                name="tripType"
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option>Round</option>
                <option>One Way</option>
                <option>Multi City</option>
              </select>
            </FieldRow>

            <FieldRow label="Origin City">
              <input
                name="originCity"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Destination City">
              <input
                name="destinationCity"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Days of Availability">
              <select
                name="dayOfAvailability"
                onChange={handleInputChange}
                className="capsInput"
              >
                {[...Array(15)].map((_, i) => (
                  <option key={i}>{i + 1} day</option>
                ))}
              </select>
            </FieldRow>

            <FieldRow label="Car Model Name">
              <input
                name="carModelName"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Vendor Name">
              <input
                name="vendorName"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Seating Capacity">
              <select
                name="seatingCapacity"
                onChange={handleInputChange}
                className="capsInput"
              >
                {[1,2,3,4,5,6,7,8].map(v => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </FieldRow>

            <FieldRow label="Trip Price">
              <input type="number" className="capsInput mb-2" />
              <input type="range" min="10" max="100" step="0.5" />
            </FieldRow>

            <FieldRow label="Upload Image">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Fuel Type">
              <select
                name="fuelType"
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>CNG</option>
              </select>
            </FieldRow>

            <FieldRow label="Special Offers">
              <textarea
                name="specialOffer"
                maxLength="1500"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Terms & Conditions">
              <textarea
                name="termsConditions"
                maxLength="1500"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Cancellation Policy">
              <textarea
                name="cancellationPolicy"
                maxLength="1500"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            {/* STATUS */}
            <div className="text-center mt-4 text-sm">
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {message && <p className="text-red-500">{message}</p>}
              {loading && <p className="text-gray-500">Loading...</p>}
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleClear}
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

export default CarBooking;
