"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function ROMapping() {
  const [formData, setFormData] = useState({
    distributorId: "",
    retailerId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.distributorId || !formData.retailerId) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please fill all fields", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType"),
        dsid: formData.distributorId.trim(),
        agid: formData.retailerId.trim(),
        portalId: localStorage.getItem("portalId") || "10002",
        transferType: "RO",
      };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.moveEntityRO,
        new URLSearchParams({ jsonData: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Entity moved successfully" });
        setFormData({ distributorId: "", retailerId: "" });
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Move entity failed" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Move Entity"
        description="Map retailer under selected distributor"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* DISTRIBUTOR ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">

              <label className="text-right font-medium">
                Distributor ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="distributorId"
                placeholder="Full Distributor Id"
                value={formData.distributorId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* RETAILER ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">

              <label className="text-right font-medium">
                Retailer ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="retailerId"
                placeholder="Full Retailer Id"
                value={formData.retailerId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* BUTTON */}
            <div className="text-center mt-4">
              <button
                onClick={handleSubmit}
                className="capsButton min-w-[120px]"
              >
                Continue
              </button>
            </div>

          </div>
        </div>

      </PageCard>
    </div>
  );
}

export default ROMapping;
