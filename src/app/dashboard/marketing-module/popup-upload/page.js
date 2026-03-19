"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const PopupUpload = () => {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedChannelType, setSelectedChannelType] = useState("");
  const [selectedLinkType, setSelectedLinkType] = useState("");
  const [notificationLink, setNotificationLink] = useState("");

  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [portalId, setPortalId] = useState("");

  useEffect(() => {
    setUserId(sessionStorage.getItem("login") || "");
    setPortalId(localStorage.getItem("adminUserPortalId") || "");
  }, []);

  /* ================= FILE VALIDATION ================= */

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (!selectedFiles.length) return;

    for (let file of selectedFiles) {
      if (!["image/jpeg", "image/jpg"].includes(file.type)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid File",
          text: "Only JPG format allowed",
        });

        setFiles([]);
        return;
      }
    }

    setFiles(selectedFiles);
    setFileError("");
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedChannel) {
      Swal.fire("Validation", "Please select channel", "warning");
      return;
    }

    if (!selectedChannelType) {
      Swal.fire("Validation", "Please select channel type", "warning");
      return;
    }

    if (!selectedLinkType) {
      Swal.fire("Validation", "Please select link type", "warning");
      return;
    }

    if (selectedLinkType !== "WLink" && !notificationLink) {
      Swal.fire("Validation", "Please enter notification link", "warning");
      return;
    }

    if (!files.length) {
      Swal.fire("Validation", "Please upload image", "warning");
      return;
    }

    setLoading(true);

    let boxValue = "";

    if (selectedLinkType === "ELink") boxValue = "1";
    if (selectedLinkType === "ILink") boxValue = "2";
    if (selectedLinkType === "WLink") boxValue = "3";

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("boxValue", boxValue);
      formData.append("channelValue", selectedChannelType);
      formData.append("portalId", portalId);
      formData.append("userId", Number(userId));
      formData.append("channel", selectedChannel);

      if (boxValue !== "3") {
        formData.append("linkUrl", notificationLink);
      }

      const response = await axiosInstance.post(
        endpoints.marketingModuleEndpoints.popupUpload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const data = response.data;

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: data.message,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: data.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.response?.data?.message || "Upload failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Popup Upload"
        description="Upload popup banner for Web/App"
      />

      <PageCard>
        <div className="flex flex-col items-center gap-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormRow label="Select Channel">
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="capsSelect w-80"
              >
                <option value="">Select</option>
                <option value="Retailer">Retailer</option>
                <option value="ds">Distributor</option>
                <option value="mds">Master Distributor</option>
              </select>
            </FormRow>

            {selectedChannel && (
              <FormRow label="Channel Type">
                <select
                  value={selectedChannelType}
                  onChange={(e) => setSelectedChannelType(e.target.value)}
                  className="capsSelect w-80"
                >
                  <option value="">Select</option>
                  <option value="Web">WEB</option>
                  <option value="App">APP</option>
                </select>
              </FormRow>
            )}

            {selectedChannelType && (
              <FormRow label="Link Type">
                <select
                  value={selectedLinkType}
                  onChange={(e) => setSelectedLinkType(e.target.value)}
                  className="capsSelect w-80"
                >
                  <option value="">Select</option>
                  <option value="ELink">External Link</option>
                  <option value="ILink">Internal Link</option>
                  <option value="WLink">Without Link</option>
                </select>
              </FormRow>
            )}

            {(selectedLinkType === "ELink" || selectedLinkType === "ILink") && (
              <FormRow label="Notification Link">
                <input
                  type="text"
                  value={notificationLink}
                  onChange={(e) => setNotificationLink(e.target.value)}
                  className="capsInput w-80"
                />
              </FormRow>
            )}

            {selectedChannelType === "Web" && (
              <FormRow label="Slider (1600 × 800 px)">
                <div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg"
                    multiple
                    onChange={handleFileChange}
                    disabled={loading}
                    className={`w-80 ${fileError ? "capsInputError" : "capsInput"}`}
                  />

                  <p className="text-xs text-gray-500 mt-1">.jpg format only</p>
                </div>
              </FormRow>
            )}

            {selectedChannelType && (
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="capsButton min-w-[140px]"
                >
                  {loading ? "Uploading..." : "Submit"}
                </button>
              </div>
            )}
          </form>
        </div>
      </PageCard>
    </div>
  );
};

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium whitespace-nowrap">{label}</div>
    <div className="text-center">:</div>
    <div>{children}</div>
  </div>
);

export default PopupUpload;
