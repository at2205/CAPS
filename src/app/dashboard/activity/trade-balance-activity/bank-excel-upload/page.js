"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const BankExcelUploads = () => {
  const [formData, setFormData] = useState({ uploadExcel: null });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.uploadExcel) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select an Excel file", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("ExcelFile", formData.uploadExcel);
      fd.append("jsonObject", JSON.stringify({ userId: localStorage.getItem("userId") }));
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.bankExcelUpload, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "File uploaded successfully" });
        setFormData({ uploadExcel: null });
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Upload failed" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong during upload" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Bank Excel Upload"
        description="Upload bank transaction Excel file"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>

            {/* FILE UPLOAD */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">

              <label className="text-right font-medium">
                Upload Excel
              </label>

              <div className="text-center">:</div>

              <input
                type="file"
                name="uploadExcel"
                className="capsInput"
                onChange={handleChange}
                required
              />
            </div>

            {/* DOWNLOAD LINK */}
            <div className="text-center mb-4">
              <a
                href="/path/to/format"
                className="text-sm font-semibold text-[#226b88] hover:underline"
              >
                Click To Download Format
              </a>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                type="submit"
                className="capsButton min-w-[120px]"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </PageCard>
    </div>
  );
};

export default BankExcelUploads;
