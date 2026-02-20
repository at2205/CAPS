"use client";

import React, { useState } from "react";

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

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "file:mr-3 file:px-3 file:py-1.5 file:rounded-md " +
    "file:border-0 file:text-sm file:font-medium " +
    "file:bg-[#4c95b3] file:text-white hover:file:opacity-90 " +
    "focus:outline-none focus:ring-2 focus:ring-[#4c95b3]";

  const buttonStyle =
    "px-6 py-2 text-white rounded-xl shadow-md text-sm font-medium " +
    "bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6] hover:opacity-90";

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 bg-white rounded-xl shadow-lg border-[3px] border-[#b7dbe8]">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px]
                        rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Bank Excel Upload
        </div>

        {/* ===== BODY ===== */}
        <div className="px-10 py-6 flex justify-center">
          <form className="w-[520px]" onSubmit={handleSubmit}>

            {/* FILE UPLOAD */}
            <div className="mb-4 flex items-center">
              <label className="w-1/2 text-right pr-4 font-semibold text-sm">
                Upload Excel
              </label>

              <input
                type="file"
                name="uploadExcel"
                className={inputStyle}
                onChange={handleChange}
                required
              />
            </div>

            {/* DOWNLOAD LINK */}
            <div className="text-center mb-4">
              <a
                href="/path/to/format"
                className="text-sm font-semibold text-[#3b7d9a] hover:underline"
              >
                Click To Download Format
              </a>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button type="submit" className={buttonStyle}>
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BankExcelUploads;
