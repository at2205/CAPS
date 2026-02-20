"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const SliderUpload = () => {

  const [selectedChannel, setSelectedChannel] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [files, setFiles] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [visible, setVisible] = useState(false);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    let missingSliders = [];
    for (let num = 1; num <= 5; num++) {
      if (!files[num]) missingSliders.push(`Slider ${num}`);
    }

    if (missingSliders.length > 0) {
      setError(`Missing files: ${missingSliders.join(", ")}`);
      setVisible(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.values(files).forEach((file) =>
      formData.append("files", file)
    );
    formData.append("channel", selectedChannel);

    try {
      const response = await fetch(
        "http://localhost:8281/api/slider-upload/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed.");

      setSuccess("Sliders uploaded successfully!");
      setVisible(true);
    } catch (err) {
      setError(`Upload failed. ${err.message}`);
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILE VALIDATION ================= */
  const validateFile = (file, num) => {
    return new Promise((resolve) => {
      const allowedTypes = ["image/jpeg", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {
        setFileErrors((prev) => ({
          ...prev,
          [num]: "Invalid file type (Only .jpg, .jpeg allowed)",
        }));
        return resolve(false);
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width !== 1587 || img.height !== 531) {
          setFileErrors((prev) => ({
            ...prev,
            [num]: "Invalid dimensions (Must be 1587 × 531 px)",
          }));
          resolve(false);
        } else {
          setFileErrors((prev) => ({ ...prev, [num]: "" }));
          resolve(true);
        }
      };
    });
  };

  const handleFileChange = async (e, num) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValid = await validateFile(file, num);
    if (isValid) {
      setFiles((prev) => ({ ...prev, [num]: file }));
    } else {
      setFiles((prev) => {
        const updated = { ...prev };
        delete updated[num];
        return updated;
      });
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    if (success) window.location.reload();
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">

      <CapsCard
        title="Slider Upload"
        description="Upload login page offer sliders"
      />

  
      <PageCard>

        <form onSubmit={handleSubmit}>

          {/* Select Channel */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <label className="text-lg whitespace-nowrap">
              Select Channel
            </label>

            <select
              required
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="capsSelect w-80"
            >
              <option value="">Select Channel</option>
              <option value="Retailer">Retailer</option>
              <option value="ds">Distributor</option>
              <option value="mds">Master Distributor</option>
            </select>
          </div>

          {/* Slider Inputs */}
          {selectedChannel && (
            <div className="mt-6">

              <h3 className="text-center font-semibold capsText mb-6">
                {selectedChannel === "Retailer"
                  ? "RO"
                  : selectedChannel === "ds"
                  ? "DS"
                  : "MDS"}{" "}
                Offer Slider Upload (Web Login Page)
              </h3>

              {[1, 2, 3, 4, 5].map((num) => (
                <div
  key={num}
  className="flex items-start justify-center gap-4 mb-4"
>
  <div className="w-28 text-right">
    Slider {num}
  </div>

  <div>:</div>

  <div className="w-96">
    <input
      type="file"
      accept=".jpg,.jpeg"
      onChange={(e) => handleFileChange(e, num)}
      className={`w-full ${
        fileErrors[num] ? "capsInputError" : "capsInput"
      }`}
    />

    <p className="text-xs text-gray-500 mt-1">
      .jpg Format Only (1587 × 531 px)
    </p>

    {fileErrors[num] && (
      <p className="text-red-600 text-xs mt-1">
        {fileErrors[num]}
      </p>
    )}
  </div>
</div>

              ))}

              {/* Submit Button */}
              <div className="text-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="capsButton min-w-[140px]"
                >
                  {loading ? "Uploading..." : "Submit"}
                </button>
              </div>

            </div>
          )}

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
              <button
                onClick={handleCloseModal}
                className="capsButton"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SliderUpload;
