"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const ActivityAssignment = () => {
  const [portalUserId, setPortalUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [serviceAuth, setServiceAuth] = useState(null);
  const [foundUser, setFoundUser] = useState(false);

  const submitForm = async () => {
    if (!portalUserId.trim()) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please enter portal user id.", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      setServiceAuth(null);
      setFoundUser(false);
      const payload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType"),
        portalUserId: portalUserId.trim(),
      };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.assignActivitySearch,
        new URLSearchParams({ jsonData: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setFoundUser(true);
        setMessage("User found. Loading service assignments...");
        // Now fetch service auth details
        const authResponse = await urlencodedInstance.post(
          endpoints.activityEndpoints.assignActivity,
          new URLSearchParams({ jsonData: JSON.stringify({ userId: localStorage.getItem("userId"), portalUserId: portalUserId.trim() }) })
        );
        const authData = typeof authResponse.data === "string" ? JSON.parse(authResponse.data) : authResponse.data;
        if (authData.status === "0" && authData.serviceAuth) {
          setServiceAuth(typeof authData.serviceAuth === "string" ? JSON.parse(authData.serviceAuth) : authData.serviceAuth);
          setMessage("");
        } else {
          setMessage(authData.message || "No service details found.");
        }
      } else {
        Swal.fire({ icon: "error", title: "Not Found", text: data.message || "User not found" });
      }
    } catch (error) {
      console.error("Activity Assignment Error:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key) => {
    setServiceAuth((prev) => ({ ...prev, [key]: prev[key] === "Y" ? "N" : "Y" }));
  };

  const handleSave = async () => {
    if (!serviceAuth) return;
    try {
      setLoading(true);
      const payload = {
        userId: localStorage.getItem("userId"),
        portalUserId: portalUserId.trim(),
        services: serviceAuth,
      };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.updateActivity,
        new URLSearchParams({ jsonData: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Activity assignment updated.", timer: 1500, showConfirmButton: false });
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
      <CapsCard title="Activity Assignment" description="Search and manage activities assigned to portal users" />
      <PageCard>
        {message && <div className="text-center mb-4 font-medium">{message}</div>}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">
            <label className="text-right font-medium">User ID</label>
            <div className="text-center">:</div>
            <input type="text" value={portalUserId} onChange={(e) => setPortalUserId(e.target.value)} className="capsInput" />
          </div>
        </div>
        <div className="text-center">
          <button onClick={submitForm} disabled={loading} className="capsButton min-w-[120px]">
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {serviceAuth && (
          <div className="mt-8">
            <h3 className="font-bold mb-3 text-center">Service Permissions for: {portalUserId}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">
                <thead>
                  <tr className="capsColor">
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">Service</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Toggle</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(serviceAuth).map(([key, value], i) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2 text-left">{key}</td>
                      <td className={`border p-2 font-semibold ${value === "Y" ? "text-green-600" : "text-red-500"}`}>{value === "Y" ? "Enabled" : "Disabled"}</td>
                      <td className="border p-2">
                        <button className={`px-3 py-1 rounded text-xs ${value === "Y" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`} onClick={() => handleToggle(key)}>
                          {value === "Y" ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
              <button className="capsButton min-w-[150px]" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default ActivityAssignment;
