"use client";
import React, { useState } from "react";

function CarBooking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({});

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endPoint = "/";

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("secondUserId")
      : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith(".xls") || file.name.endsWith(".xlsx"))) {
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

  const handleFileUpload = async () => {
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
      setError("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  const Row = ({ label, children, extra }) => (
    <div className="flex items-center justify-center mb-2">
      <div className="w-[260px] text-right font-semibold text-sm">
        {label}
      </div>
      <div className="w-[320px] ml-3">{children}</div>
      {extra && <div className="w-[200px] ml-3">{extra}</div>}
    </div>
  );

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[1200px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Car Booking
        </div>

        <div className="px-10 py-6">
          <form>

            <Row label="Car Booking Type :">
              <select name="carBookingType" onChange={handleInputChange} className={inputStyle}>
                <option>Select</option>
                <option>Domistic</option>
                <option>International</option>
              </select>
            </Row>

            <Row label="Booking Type :">
              <select name="bookingType" onChange={handleInputChange} className={inputStyle}>
                <option>Select</option>
                <option>OutStation</option>
                <option>Local Usage</option>
                <option>Air/Rail Transfer</option>
              </select>
            </Row>

            <Row label="Trip Type :">
              <select name="tripType" onChange={handleInputChange} className={inputStyle}>
                <option>Select</option>
                <option>Round</option>
                <option>One Way</option>
                <option>Multi City</option>
              </select>
            </Row>

            <Row label="Origin City :">
              <input name="originCity" onChange={handleInputChange} className={inputStyle} />
            </Row>

            <Row label="Destination City :">
              <input name="destinationCity" onChange={handleInputChange} className={inputStyle} />
            </Row>

            <Row label="Days of Availability :">
              <select name="dayOfAvailability" onChange={handleInputChange} className={inputStyle}>
                {[...Array(15)].map((_, i) => (
                  <option key={i}>{i + 1} day</option>
                ))}
              </select>
            </Row>

            <Row label="Car Model Name :">
              <input name="carModelName" onChange={handleInputChange} className={inputStyle} />
            </Row>

            <Row label="Vendor Name :">
              <input name="venderName" onChange={handleInputChange} className={inputStyle} />
            </Row>

            <Row label="Seating Capacity :">
              <select name="seatingCapacity" onChange={handleInputChange} className={inputStyle}>
                {[1,2,3,4,5,6,7,8].map(v => <option key={v}>{v}</option>)}
              </select>
            </Row>

            <Row
              label="Trip Price :"
              extra={<input type="number" className={inputStyle} />}
            >
              <input type="range" min="10" max="100" step="0.5" className="w-full" />
            </Row>

            <Row label="Upload Image :">
              <input type="file" onChange={handleFileChange} className={inputStyle} />
            </Row>

            <Row label="Fuel Type :">
              <select name="fuelType" onChange={handleInputChange} className={inputStyle}>
                <option>Select</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>CNG</option>
              </select>
            </Row>

            <Row label="Special Offers :">
              <textarea name="specialOffer" maxLength="1500" onChange={handleInputChange} className={inputStyle} />
            </Row>

            <Row label="Terms & Conditions :">
              <textarea name="temsConditions" maxLength="1500" onChange={handleInputChange} className={inputStyle} />
            </Row>

            <Row label="Cancellation Policy :">
              <textarea name="cancellationPolicy" maxLength="1500" onChange={handleInputChange} className={inputStyle} />
            </Row>

            {/* STATUS */}
            <div className="text-center mt-4 text-sm">
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {message && <p className="text-red-500">{message}</p>}
              {loading && <p className="text-gray-500 animate-pulse">Loading...</p>}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-3">
              <button
                type="button"
                onClick={handleFileUpload}
                disabled={loading}
                className={`px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CarBooking;
