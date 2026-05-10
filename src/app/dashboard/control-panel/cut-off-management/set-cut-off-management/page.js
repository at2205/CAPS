"use client";
import React, { useState, useRef } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const SetCutOffManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]); // ✅ NEW

  const fileInputRef = useRef(null);

  const isExcelFile = (file) =>
    file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && isExcelFile(file)) {
      setSelectedFile(file);
      setMessage("");
    } else {
      setSelectedFile(null);
      setMessage("Please select a valid .xls or .xlsx file");
    }
  };

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setSelectedFile(null);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        text: "Please select a file",
        confirmButtonColor: "#5fa0b5",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "adminUserFormBean",
        JSON.stringify({
          userId: localStorage.getItem("userId"),
          portalId: localStorage.getItem("portalId"),
        }),
      );

      formData.append("ExcelFile", selectedFile);

      const response = await axiosInstance.post(
        endpoints.controlPEndpoints.setCutOffMgt,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setLoading(false);

      let data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      console.log("API RESPONSE 👉", data);

      const msg =
        data?.message ||
        data?.msg ||
        data?.response ||
        data?.statusDesc ||
        "Upload completed";

      if (data.status === "0") {
        setTableData(data.cutoffamount || []);

        Swal.fire({
          icon: "success",
          text: msg,
          confirmButtonColor: "#5fa0b5",
        });

        clearFile();
      } else {
        Swal.fire({
          icon: "error",
          text: msg || "Something went wrong",
          confirmButtonColor: "#5fa0b5",
        });
      }
    } catch (error) {
      setLoading(false);

      console.log("ERROR 👉", error);

      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.response?.data ||
        "API Error";

      Swal.fire({
        icon: "error",
        text: typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg),
        confirmButtonColor: "#5fa0b5",
      });
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Set Cut-Off Management"
        description="Upload cut-off configuration Excel file"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">
            {/* FILE INPUT */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-1">
              <label className="text-right font-medium">
                Please Upload File
              </label>
              <div className="text-center">:</div>

              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="capsInput"
              />
            </div>

            <div className="text-center text-gray-500 text-sm mb-3">
              (.xls / .xlsx format only)
            </div>

            {/* MESSAGE */}
            {message && (
              <p className="text-red-500 text-center text-sm mb-2">{message}</p>
            )}

            {/* DOWNLOAD */}
            <div className="text-center mb-3 text-sm">
              <a
                href="/SetCutOffManagement.xlsx"
                download
                className="text-blue-600 hover:underline"
              >
                Click here
              </a>{" "}
              to download excel format
            </div>

            {/* LOADING */}
            {loading && (
              <p className="text-center text-sm text-gray-500 mb-2">
                Uploading...
              </p>
            )}

            {/* BUTTON (CLEAR REMOVED) */}
            <div className="text-center mt-4">
              <button
                onClick={handleSubmit}
                className="capsButton min-w-[140px]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        {tableData.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border border-[#1f4e5f] text-sm">
              {/* HEADER */}
              <thead>
                <tr>
                  <th
                    className="border px-4 py-2"
                    style={{ backgroundColor: "#5fa0b5", color: "#fff" }}
                  >
                    Portal Id
                  </th>

                  <th
                    className="border px-4 py-2"
                    style={{ backgroundColor: "#5fa0b5", color: "#fff" }}
                  >
                    Agent Id
                  </th>

                  <th
                    className="border px-4 py-2"
                    style={{ backgroundColor: "#5fa0b5", color: "#fff" }}
                  >
                    CutOff Amount
                  </th>

                  <th
                    className="border px-4 py-2"
                    style={{ backgroundColor: "#5fa0b5", color: "#fff" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index} className="text-center bg-white">
                    <td className="border px-4 py-2">
                      {item.portalId || item.portal_id}
                    </td>
                    <td className="border px-4 py-2">
                      {item.agentId || item.agent_id}
                    </td>
                    <td className="border px-4 py-2">
                      {item.cutOffAmount || item.cut_off_amount}
                    </td>
                    <td
                      className={`border px-4 py-2 font-medium ${
                        (item.status || "").toLowerCase().includes("success")
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default SetCutOffManagement;
