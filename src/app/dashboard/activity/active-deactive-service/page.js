"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const ActivateDeactivateService = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ service: "", action: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const payload = { userId: localStorage.getItem("userId") };
        const response = await urlencodedInstance.post(
          endpoints.activityEndpoints.getServices,
          new URLSearchParams({ jsonData: JSON.stringify(payload) })
        );
        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
        if (data.status === "0" && data.data) { setServices(data.data); }
      } catch { /* ignore */ }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.service) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select Service", timer: 1500, showConfirmButton: false });
      return;
    }
    if (!formData.action) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select Action", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), serviceId: formData.service, action: formData.action };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.activeDeactiveService,
        new URLSearchParams({ jsonData: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Service updated successfully" });
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Update failed" });
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
        title="Activate / Deactivate Service"
        description="Manage service activation status"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* SERVICE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                Select Service
              </label>

              <div className="text-center">:</div>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="capsSelect"
              >
                <option value="">-- Select --</option>
                {services.map((svc, i) => (
                  <option key={i} value={svc.serviceId || svc.id}>{svc.serviceName || svc.name || svc}</option>
                ))}
              </select>
            </div>

            {/* ACTION */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                Select Action
              </label>

              <div className="text-center">:</div>

              <select
                name="action"
                value={formData.action}
                onChange={handleChange}
                className="capsSelect"
              >
                <option value="">-- Select --</option>
                <option value="Activate">Activate</option>
                <option value="Deactivate">Deactivate</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                type="button"
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
};

export default ActivateDeactivateService;
