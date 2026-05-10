"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const SliderUpload = () => {

  const [selectedChannel, setSelectedChannel] = useState("");
  const [files, setFiles] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= FILE VALIDATION ================= */

  const validateFile = (file, num) => {

    return new Promise((resolve) => {

      const allowedTypes = ["image/jpeg", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {

        Swal.fire({
          icon: "warning",
          title: "Invalid File",
          text: "Only .jpg or .jpeg allowed",
        });

        return resolve(false);
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {

        if (img.width !== 1587 || img.height !== 531) {

          Swal.fire({
            icon: "warning",
            title: "Invalid Image Size",
            text: "Image must be 1587 × 531 px",
          });

          resolve(false);

        } else {

          resolve(true);

        }

      };

    });

  };

  /* ================= FILE CHANGE ================= */

  const handleFileChange = async (e, num) => {

    const file = e.target.files[0];
    if (!file) return;

    const isValid = await validateFile(file, num);

    if (isValid) {

      setFiles(prev => ({
        ...prev,
        [num]: file
      }));

    } else {

      setFiles(prev => {
        const updated = { ...prev };
        delete updated[num];
        return updated;
      });

    }

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!selectedChannel) {

      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please select channel",
      });

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

      Object.values(files).forEach(file => {
        formData.append("files", file);
      });

      formData.append("channel", selectedChannel);

      const portalId = typeof window !== "undefined" ? localStorage.getItem("portalId") : "";

      if (portalId) {
        formData.append("portalId", portalId);
      }

      const response = await axiosInstance.post(
        endpoints.marketingModuleEndpoints.sliderUpload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const data = response.data;

      if (data?.status === "01") {

        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: data.message,
        });

      } else {

        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: "Image file has been uploaded successfully!",
        }).then(() => {
          window.location.reload();
        });

      }

    }
    catch (err) {

      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Upload failed. Please try again.",
      });

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 min-h-screen text-[#226b88]">

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
              <option value="RETAILER">Retailer</option>
              <option value="DS">Distributor</option>
              <option value="MDS">Master Distributor</option>

            </select>

          </div>

          {/* Slider Upload */}

          {selectedChannel && (

            <div className="mt-6">

              <h3 className="text-center font-semibold capsText mb-6">
                {selectedChannel} Offer Slider Upload (Web Login Page)
              </h3>

              {[1,2,3,4,5].map((num) => (

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
                      onChange={(e)=>handleFileChange(e,num)}
                      className="capsInput w-full"
                    />

                    <p className="text-xs text-gray-500 mt-1">
                      .jpg Format Only (1587 × 531 px)
                    </p>

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

    </div>

  );

};

export default SliderUpload;