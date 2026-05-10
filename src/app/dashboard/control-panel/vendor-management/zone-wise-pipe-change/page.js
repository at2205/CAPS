"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function ZoneWisePipeChange() {
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    retailId: "",
    zone: "",
    service: "AEPS",
  });

  const [retailList, setRetailList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  // =========================
  // COMMON RESPONSE PARSER
  // =========================
  const parseResponse = (res) => {
    const response =
      typeof res.data === "string" ? JSON.parse(res.data) : res.data;

    return (
      response?.list ||
      response?.data ||
      response?.vendorList ||
      response?.retailList ||
      response?.apiList ||
      response ||
      []
    );
  };

  // =========================
  // GET PAGE DETAILS
  // =========================
  const getPageDetails = async () => {
    try {
      const payload = new URLSearchParams();
      payload.append(
        "adminUserFormBean",
        JSON.stringify({
          userId: localStorage.getItem("userId")
        })
      );

      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.getPageDetailZWPC,
        payload,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const list = parseResponse(res);

      setRetailList(Array.isArray(list) ? list : []);
      setZoneList(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("PAGE ERROR:", err);
    }
  };

  useEffect(() => {
    getPageDetails();
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);

    if (!newValues.retailId || !newValues.zone) return;

    try {
      const payload = new URLSearchParams();
      payload.append(
        "adminUserFormBean",
        JSON.stringify({
          userId: localStorage.getItem("userId") || "",
          apId: newValues.retailId,
          zone: newValues.zone,
          service: newValues.service || "AEPS",
        })
      );

      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.getZoneVendorDetails,
        payload,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const list = parseResponse(res);

      setVendorList(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("VENDOR ERROR:", err);
    }
  };

  // =========================
  // TOGGLE
  // =========================
  const handleToggle = (index, field) => {
    const updated = [...vendorList];
    updated[index][field] =
      updated[index][field] === "Y" ? "N" : "Y";
    setVendorList(updated);
  };

  // =========================
  // SUBMIT (NO PAGE RELOAD)
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const updateList = vendorList.map((item) => ({
        id: item.id || item.vendorId,
        action: item.action || "N",
        pipeStatus: item.pipeStatus || "N",
        vendor: item.vendor,
      }));

      const payload = new URLSearchParams();
      payload.append(
        "adminUserFormBean",
        JSON.stringify({
          userId: localStorage.getItem("userId") || "",
          updateList,
        })
      );

      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.updateZoneVendorDetails,
        payload,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const response =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      if (response.status === "0") {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          confirmButtonColor: "#5fa0b5",
        });
      } else {
        Swal.fire("Error", response.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error("SUBMIT ERROR:", err);

      if (err.response?.status === 401) {
        Swal.fire("Session Expired", "Login again", "error");
        localStorage.clear();
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI COMPONENT
  // =========================
  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Zone Wise Pipe Change"
        description="Update retailer pipe configuration based on zone"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            {/* ❌ FORM REMOVED (IMPORTANT FIX) */}

            {/* RETAIL */}
            <FieldRow label="Retail ID">
              <select
                name="retailId"
                value={formValues.retailId}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                {retailList.map((item, i) => (
                  <option key={i} value={item.id || item.apId}>
                    {item.name || item.displayName}
                  </option>
                ))}
              </select>
            </FieldRow>

            {/* ZONE */}
            <FieldRow label="Zone">
              <select
                name="zone"
                value={formValues.zone}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                {zoneList.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.displayName || item.name}
                  </option>
                ))}
              </select>
            </FieldRow>

            {/* SERVICE */}
            <FieldRow label="Service">
              <input
                type="text"
                name="service"
                value={formValues.service}
                onChange={handleInputChange}
                className="capsInput"
              />
            </FieldRow>

            {/* VENDOR LIST */}
            {vendorList.length > 0 && (
              <div className="mt-4 border p-3 rounded">
                {vendorList.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{item.vendor}</span>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggle(index, "action")}
                        className="capsButtonSmall"
                      >
                        Action: {item.action}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggle(index, "pipeStatus")}
                        className="capsButtonSmall"
                      >
                        Pipe: {item.pipeStatus}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="capsButton"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default ZoneWisePipeChange;