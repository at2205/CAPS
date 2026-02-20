"use client";
import React, { useState } from "react";

const SetCutOffManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.name.endsWith(".xls") || file.name.endsWith(".xlsx"))) {
      setSelectedFile(file);
      setMessage("");
    } else {
      setSelectedFile(null);
      setMessage("Please select a valid .xls or .xlsx file");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-white">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl bg-white">
        
        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Set Cut-Off Management
        </div>

        {/* BODY */}
        <div className="px-10 py-6">
          
          <div className="p-6 mb-4">
            <form>
              
              {/* FILE ROW */}
              <div className="mb-4 flex items-center justify-center">
                
                <label className="w-[200px] text-right font-semibold text-sm whitespace-nowrap">
                  Please Upload File :
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mx-3 w-[220px] border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
                />

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  .xls / .xlsx format only
                </span>
              </div>

              {/* MESSAGE */}
              {message && (
                <div className="text-red-500 text-center text-sm mb-3">
                  {message}
                </div>
              )}

              {/* DOWNLOAD */}
              <div className="text-center mb-4 text-sm">
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Click here for excel format
                </a>
              </div>

              {/* BUTTON */}
              <div className="text-center">
                <button
                  type="button"
                  className="px-8 py-1.5 text-white text-sm rounded-md bg-[#4fa2c2] hover:opacity-90 shadow-md"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SetCutOffManagement;
