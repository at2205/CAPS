"use client";

import React, { useState, useEffect, useRef } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const SPDUpload = () => {

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    setUserId(sessionStorage.getItem("login") || "");
    setUserType(localStorage.getItem("adminUserType") || "");
  }, []);

  /* FILE CHANGE */

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {

      Swal.fire({
        icon: "warning",
        title: "Invalid File",
        text: "Only PDF file allowed",
      });

      setFile(null);
      return;

    }

    setFile(selectedFile);
    setFileError("");

  };

  /* SUBMIT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) {

      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please select a PDF file",
      });

      return;

    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file1", file);
      formData.append("RequestUserId", userId);
      formData.append("UserType", userType);

      const response = await axiosInstance.post(
        endpoints.marketingModuleEndpoints.spdUpload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data.status === "success") {

        Swal.fire({
          icon: "success",
          title: "Upload Successful",
          text: data.message || "File uploaded successfully",
        });

        setFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

      } else {

        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: data.message || "Upload failed",
        });

      }

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text:
          err.response?.data?.data?.message ||
          err.response?.data?.message ||
          "Upload failed",
      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="SPD File Upload"
        description="Upload SPD PDF file to the system"
      />

      <PageCard>

        <form onSubmit={handleSubmit}>

          <div className="flex flex-col items-center gap-6">

            <div className="grid grid-cols-[auto_20px_auto] items-center gap-4">

              <label className="text-lg whitespace-nowrap">
                Select PDF File
              </label>

              <div className="text-center text-lg">:</div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={loading}
                className="capsInput w-96"
              />

            </div>

            <p className="text-sm text-gray-500">
              Only .pdf format allowed
            </p>

            <button
              type="submit"
              disabled={loading}
              className="capsButton min-w-[120px]"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>

          </div>

        </form>

      </PageCard>

    </div>

  );

};

export default SPDUpload;