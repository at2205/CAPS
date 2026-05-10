"use client";

import React, { useState, useEffect, useId } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import Swal from "sweetalert2";

const { daModuleEndpoints } = endpoints;

function SalesProfiling() {
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [salesList, setSalesList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    aesId: "",
    agentId: "",
    mobileNo: "",
    emailId: "",
    distributorId: "",
    fulldistributorId: "",
    personName: "",
  });

  /* ================= INPUT HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const digitOnly = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      aesId: "",
      agentId: "",
      mobileNo: "",
      emailId: "",
      distributorId: "",
      fulldistributorId: "",
      personName: "",
    });
  };

  /* ================= API CALLS ================= */

  const handleAdd = async () => {
    if (!formData.name) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please Enter Sales Person Name.",
        timer: 1500,
        showConfirmButton: false,

      });
      return;
    }
    if (!formData.aesId) return alert("Please Enter Employee BS ID.");
    if (!formData.agentId) return alert("Please Enter Full Agent ID.");
    if (!/^[6-9][0-9]{9}$/.test(formData.mobileNo))
      if (!/^[6-9][0-9]{9}$/.test(formData.mobileNo)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Mobile Number",
          text: "Please Enter Valid Mobile Number.",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
    if (!formData.emailId) return alert("Please Enter Email ID.");
    if (!formData.distributorId) return alert("Please Enter Distributor ID.");
    if (!formData.fulldistributorId)
      return alert("Please Enter Full Distributor ID.");

    try {
      setLoading(true);
      setMessage("");
      const payload = {
        userId: localStorage.getItem("userId"),
        name: formData.name,
        aesId: formData.aesId,
        agentId: formData.agentId,
        mobileNo: formData.mobileNo,
        emailId: formData.emailId,
        distributorId: formData.distributorId,
        fulldistributorId: formData.fulldistributorId,
      };

      const response = await urlencodedInstance.post(
        daModuleEndpoints.addSalesPerson,
        new URLSearchParams({
          adminUserFormBean: JSON.stringify(payload),
        }),
      );

      const data = response.data;

      if (data.status === "0") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Sales Person Added Successfully.",
          timer: 2000,
          showConfirmButton: false,

        });
        resetForm();
        fetchSalesList();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message || "Failed to add Sales Person",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Add SalesPerson Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Server Error while adding Sales Person",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    if (!formData.personName) {
      Swal.fire({
        icon: "warning",
        title: "Select Sales Person",
        text: "Please Select Sales Person.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    try {
      setLoading(true);
      setMessage("");

      const payload = {
        userId: localStorage.getItem("userId"),
        person: formData.personName,
      };

      const response = await urlencodedInstance.post(
        daModuleEndpoints.disableSalesPerson,
        new URLSearchParams({
          adminUserFormBean: JSON.stringify(payload),
        }),
      );

      const data = response.data;

      if (data.status === "0") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Sales Person Disabled Successfully.",
        });
        resetForm();
        fetchSalesList();
      } else {
        alert(data.message || "Disable Failed");
      }
    } catch (error) {
      console.error("Disable SalesPerson Error:", error);
      alert("Server Error while disabling");
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesList = async () => {
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : "";
    const payload = {
      userId: userId,
    };

    try {
      const response = await urlencodedInstance.post(
        daModuleEndpoints.getSalesPersonList,
        new URLSearchParams({
          adminUserFormBean: JSON.stringify(payload),
        }),
      );

      console.log("bhoope", response.data);
      // const data = response.data ? JSON.parse(response.data) : {};

      if (response?.data?.status === "0") {
        setSalesList(response.data.accountStatement || []);
      } else {
        console.log("something went wrong while fetching sales list");
      }
    } catch (err) {
      console.error("Sales List Error:", err);
    }
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (mode === "disable") {
      fetchSalesList();
    }
  }, [mode]);

  /* ================= UI HELPERS ================= */

  const renderRow = (label, name, placeholder, isDigit = false) => (
    <div className="grid grid-cols-[200px_10px_1fr] items-center">
      <label className="text-sm font-semibold text-right">{label}</label>
      <div className="text-center">:</div>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onKeyDown={isDigit ? digitOnly : undefined}
        onChange={handleChange}
        disabled={loading}
        placeholder={placeholder}
        className="capsInput"
      />
    </div>
  );

  /* ================= RENDER ================= */

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Sales Profiling"
        description="Add or disable sales person"
      />

      <PageCard>
        {message && (
          <p className="text-center text-green-600 font-semibold mb-4 text-sm">
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">
            {/* Mode Switch */}
            <div className="text-center pb-2 space-x-10">
              <label className="text-sm font-semibold cursor-pointer">
                <input
                  type="radio"
                  className="mr-2"
                  checked={mode === "add"}
                  onChange={() => {
                    setMode("add");
                    setMessage("");
                  }}
                />
                Add New
              </label>

              <label className="text-sm font-semibold cursor-pointer">
                <input
                  type="radio"
                  className="mr-2"
                  checked={mode === "disable"}
                  onChange={() => {
                    setMode("disable");
                    setMessage("");
                  }}
                />
                Disable
              </label>
            </div>

            {/* ================= ADD MODE ================= */}
            {mode === "add" && (
              <>
                {renderRow("Sales Person Name", "name", "Enter Name")}
                {renderRow("Employee BS ID", "aesId", "Enter BS ID")}
                {renderRow("Employee Agent ID", "agentId", "Enter Agent ID")}
                {renderRow("Mobile Number", "mobileNo", "Enter Mobile", true)}
                {renderRow("Email ID", "emailId", "Enter Email")}
                {renderRow(
                  "Distributor ID",
                  "distributorId",
                  "Enter Distributor ID",
                  true,
                )}
                {renderRow(
                  "Full Distributor ID",
                  "fulldistributorId",
                  "Enter Full Distributor ID",
                )}

                <div className="text-center pt-2 space-x-4">
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={loading}
                    className="capsButton px-10"
                  >
                    {loading ? "ADDING..." : "ADD"}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="capsButton px-6 bg-gray-500 hover:bg-gray-600"
                  >
                    CANCEL
                  </button>
                </div>
              </>
            )}

            {/* ================= DISABLE MODE ================= */}
            {mode === "disable" && (
              <>
                <div className="grid grid-cols-[200px_10px_1fr] items-center">
                  <label className="text-sm font-semibold text-right">
                    Select Sales Person
                  </label>
                  <div className="text-center">:</div>
                  <select
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                    disabled={loading}
                    className="capsInput"
                  >
                    <option value="">Select Sales Person</option>
                    {salesList.map((person, index) => (
                      <option key={index} value={person.sales_code_name}>
                        {person.sales_code_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-center pt-2 space-x-4">
                  <button
                    type="button"
                    onClick={handleDisable}
                    disabled={loading}
                    className="capsButton px-10 bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "DISABLING..." : "DISABLE"}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="capsButton px-6 bg-gray-500 hover:bg-gray-600"
                  >
                    CANCEL
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default SalesProfiling;
