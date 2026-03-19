"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const BankExcelUploads = () => {
  const [formData, setFormData] = useState({
    uploadExcel: null,
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
