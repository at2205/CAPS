"use client";
import React, { useState, useRef } from "react";
import Rating from "@mui/material/Rating";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function HolidayPackages() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({});
  const [rating, setRating] = useState(3);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
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
      hotelRating: rating,
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
        setError("Something went wrong please try again");
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
    setRating(3);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const FieldRow = ({ label, children, hint }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-start gap-4 mb-3">
      <label className="text-right font-medium pt-2">{label}</label>
      <div className="text-center pt-2">:</div>
      <div>
        {children}
        {hint && (
          <div className="text-xs text-gray-500 mt-1">{hint}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Holidays Packages"
        description="Configure holiday package details"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <FieldRow label="Holiday Package Type">
              <select
                name="holidayPackage"
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </FieldRow>

            <FieldRow label="Depart From">
              <input
                name="departFrom"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Arrival To">
              <input
                name="arrivalTo"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Travel By">
              <select
                name="travelBy"
                onChange={handleInputChange}
                className="capsInput"
              >
                <option>Flight</option>
                <option>Bus</option>
                <option>Train</option>
              </select>
            </FieldRow>

            <FieldRow label="Package Price">
              <input type="number" className="capsInput mb-2" />
              <input type="range" />
            </FieldRow>

            <FieldRow label="Hotel Name">
              <input
                name="hotelName"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Hotel Rating">
              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
              />
            </FieldRow>

            <FieldRow label="Meal Preferences">
              <select
                name="mealPreferences"
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </FieldRow>

            <FieldRow
              label="Meal Included"
              hint="Max 400 characters"
            >
              <textarea
                name="mealIncluded"
                maxLength="400"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Upload Image">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow
              label="Place Description"
              hint="Max 1000 characters"
            >
              <textarea
                name="placeDescription"
                maxLength="1000"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow label="Package Title">
              <input
                name="packageTitle"
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            <FieldRow
              label="Cancellation Policy"
              hint="Max 1000 characters"
            >
              <textarea
                name="cancellationPolicy"
                maxLength="1000"
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

export default HolidayPackages;
