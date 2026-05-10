"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const AppSliderUpload = () => {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [files, setFiles] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

      if (!allowed.includes(file.type)) {
        setFileErrors((p) => ({
          ...p,
          [num]: "Only JPG allowed",
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
          setFileErrors((p) => ({
            ...p,
            [num]: "",
          }));

          resolve(true);
        }
      };
    });
  };

  /* ================= FILE CHANGE ================= */

  const handleFileChange = async (e, num) => {
    const file = e.target.files[0];

    if (!file) return;

    const valid = await validateFile(file, num);

    if (valid) {
      setFiles((prev) => ({
        ...prev,
        [num]: file,
      }));
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedChannel) {
      Swal.fire("Error", "Please select channel", "error");
      return;
    }

    let missing = [];

    for (let i = 1; i <= 5; i++) {
      if (!files[i]) {
        missing.push(`Slider ${i}`);
      }
    }

    if (missing.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Files",
        text: `Please upload: ${missing.join(", ")}`,
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.values(files).forEach((file) => {
        formData.append("files", file);
      });

      let channelValue = "";

      if (selectedChannel === "Retailer") {
        channelValue = "retailer";
      } else if (selectedChannel === "Distributor") {
        channelValue = "ds";
      }

      formData.append("channel", channelValue);
      formData.append("portalId", localStorage.getItem("portalId"));

      const res = await axiosInstance.post(
        endpoints.marketingModuleEndpoints.sliderUpload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message || "Images uploaded successfully",
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Upload failed",
        "error",
      );
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
      <CapsCard
        title="App Slider Upload"
        description="Upload app offer sliders"
      />

      <PageCard>
        <form onSubmit={handleSubmit}>
          {/* Channel Select */}

          <div className="flex justify-center items-center gap-6 mb-8">
            <label className="text-lg">Select Channel</label>

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

          {/* Slider Upload */}

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
                  <div className="w-28 text-right">Slider {num}</div>

                  <div>:</div>

                  <div className="w-96">
                    <input
                      type="file"
                      accept=".jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, num)}
                      disabled={loading}
                      className={`w-full ${
                        fileErrors[num] ? "capsInputError" : "capsInput"
                      }`}
                    />

                    <p className="text-xs text-gray-500 mt-1">
                      JPG format only (600×300 px)
                    </p>

                    {fileErrors[num] && (
                      <p className="text-red-600 text-xs mt-1">
                        {fileErrors[num]}
                      </p>
                    )}
                  </div>
                </div>
              ))}

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
