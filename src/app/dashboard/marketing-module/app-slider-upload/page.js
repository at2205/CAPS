"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const AppSliderUpload = () => {

  const [selectedChannel, setSelectedChannel] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const handleInputChange = (e) => {
    setSelectedChannel(e.target.value);
  };

  /* ================= FILE VALIDATION ================= */
  const validateFile = (file, num) => {
    return new Promise((resolve) => {
      const allowed = ["image/jpeg", "image/jpg"];

      if (!file || !allowed.includes(file.type)) {
        setFileErrors((p) => ({
          ...p,
          [num]: "Only JPG format allowed",
        }));
        return resolve(false);
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width !== 600 || img.height !== 300) {
          setFileErrors((p) => ({
            ...p,
            [num]: "Size must be 600×300 px",
          }));
          resolve(false);
        } else {
          setFileErrors((p) => ({ ...p, [num]: "" }));
          resolve(true);
        }
      };
    });
  };

  const handleFileChange = async (e, num) => {
    const file = e.target.files[0];
    if (!file) return;

    const valid = await validateFile(file, num);
    if (valid) {
      setFiles((p) => ({ ...p, [num]: file }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedChannel) {
      setError("Please select a channel");
      setVisible(true);
      return;
    }

    for (let i = 1; i <= 5; i++) {
      if (!files[i]) {
        setError(`Please upload Slider ${i}`);
        setVisible(true);
        return;
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.values(files).forEach((f) =>
        formData.append("files", f)
      );
      formData.append("channel", selectedChannel);

      const res = await fetch(
        "http://localhost:8281/api/app-slider-upload/upload",
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Upload failed");

      setSuccess("Sliders uploaded successfully!");
      setError("");
      setVisible(true);
    } catch (err) {
      setError(err.message);
      setSuccess("");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setVisible(false);
    if (success) window.location.reload();
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* 🔵 HEADER CARD */}
      <CapsCard
        title="App Slider Upload"
        description="Upload app offer sliders"
      />

      {/* ⚪ FORM CARD */}
      <PageCard>

        <form onSubmit={handleSubmit}>

          {/* Select Channel */}
          <div className="flex justify-center items-center gap-6 mb-8">

            <label className="text-lg whitespace-nowrap">
              Select Channel
            </label>

            <select
              value={selectedChannel}
              onChange={handleInputChange}
              className="capsSelect w-80"
            >
              <option value="">Select Channel</option>
              <option value="Retailer">Retailer</option>
              <option value="Distributor">Distributor</option>
            </select>

          </div>

          {/* Slider Section */}
          {selectedChannel && (
            <div className="mt-6">

              <h3 className="text-center font-semibold capsText mb-6">
                {selectedChannel} Offer Slider Upload
              </h3>

              {[1, 2, 3, 4, 5].map((num) => (
                <div
  key={num}
  className="flex items-start justify-center gap-4 mb-4"
>
  {/* Label */}
  <div className="w-28 text-right">
    Slider {num}
  </div>

  {/* Colon */}
  <div>:</div>

  {/* Input Section */}
  <div className="w-96">
    <input
      type="file"
      accept=".jpg,.jpeg"
      onChange={(e) => handleFileChange(e, num)}
      disabled={loading}
      className={`w-full ${
        fileErrors[num]
          ? "capsInputError"
          : "capsInput"
      }`}
    />

    <p className="text-xs text-gray-500 mt-1">
      JPG format only (600 × 300 px)
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
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">

            <h3 className="text-lg font-semibold mb-4">
              {success ? "Success" : "Error"}
            </h3>

            <p className={success ? "text-green-600" : "text-red-600"}>
              {success || error}
            </p>

            <div className="text-right mt-4">
              <button onClick={closeModal} className="capsButton">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AppSliderUpload;
