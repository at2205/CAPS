"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function DSMapping() {
  const [formData, setFormData] = useState({
    masterDistributorId: "",
    distributorId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.masterDistributorId || !formData.distributorId) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please fill all fields", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType"),
        dsid: formData.masterDistributorId.trim(),
        agid: formData.distributorId.trim(),
        portalId: localStorage.getItem("portalId") || "10002",
        transferType: "DS",
      };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.moveEntityDS,
        new URLSearchParams({ jsonData: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Entity moved successfully" });
        setFormData({ masterDistributorId: "", distributorId: "" });
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
        description="Map distributor under selected master distributor"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* MASTER DISTRIBUTOR ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">

              <label className="text-right font-medium">
                Master Distributor ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                name="masterDistributorId"
                placeholder="Full MDS Id"
                value={formData.masterDistributorId}
                onChange={handleChange}
                className="capsInput"
              />
            </div>

            {/* DISTRIBUTOR ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-start gap-4 mb-6">

              <label className="text-right font-medium pt-2">
                Distributor ID
              </label>

              <div className="text-center pt-2">:</div>

              <textarea
                name="distributorId"
                rows={4}
                placeholder="Full DS Id (Use comma for separating multiple ids)"
                value={formData.distributorId}
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
                Submit
              </button>
            </div>

          </div>
        </div>

      </PageCard>
    </div>
  );
}

export default DSMapping;
