"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const PGUserLimit = () => {
  const [clientId, setClientId] = useState("");
  const [showForms, setShowForms] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitData, setLimitData] = useState([]);

  const [formData, setFormData] = useState({
    mdsId: "",
    category: "",
    mainService: "",
    subService: "",
    fullAgentId: "",
    agentId: "",
    file: null,
  });

  const handleGo = async () => {
    if (!clientId.trim()) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please enter Client Id", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), loginType: localStorage.getItem("adminUserType"), clientId: clientId.trim() };
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.getPGUserLimitData, new URLSearchParams({ jsonData: JSON.stringify(payload) }));
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        setShowForms(true);
        setLimitData(data.data || []);
      } else {
        Swal.fire({ icon: "info", title: "No Data", text: data.message || "No records found" });
      }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
    finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), clientId: clientId.trim(), ...formData };
      const response = await urlencodedInstance.post(endpoints.activityEndpoints.updatePGLimit, new URLSearchParams({ jsonData: JSON.stringify(payload) }));
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") { Swal.fire({ icon: "success", title: "Success", text: data.message || "Updated successfully" }); }
      else { Swal.fire({ icon: "error", title: "Failed", text: data.message || "Update failed" }); }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
    finally { setLoading(false); }
  };

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > PG User Limit"
        description="Configure PG limits for agents"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[620px] space-y-4">

            {/* Client ID */}
            <div className="grid grid-cols-[200px_10px_1fr_auto] items-center gap-2">
              <label className="text-sm font-semibold text-right">
                Client Id
              </label>
              <div className="text-center">:</div>

              <input
                value={clientId}
                onChange={(e) =>
                  setClientId(e.target.value)
                }
                className="capsInput"
                placeholder="Enter Client ID"
              />

              <button
                onClick={handleGo}
                className="capsButton px-5 py-2"
              >
                GO
              </button>
            </div>

            {/* Radio */}
            {showForms && (
              <div className="flex justify-center gap-10 pt-2 text-sm font-semibold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedForm === "single"}
                    onChange={() =>
                      setSelectedForm("single")
                    }
                  />
                  Single Agent
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedForm === "bulk"}
                    onChange={() =>
                      setSelectedForm("bulk")
                    }
                  />
                  Bulk Upload
                </label>
              </div>
            )}

            {/* ================= SINGLE AGENT ================= */}
            {selectedForm === "single" && (
              <div className="pt-3 space-y-3">

                {[
                  {
                    label: "MDS ID",
                    key: "mdsId",
                    options: ["RO ID-Wise"],
                  },
                  {
                    label: "Category",
                    key: "category",
                    options: ["Postpaid", "Prepaid"],
                  },
                  {
                    label: "Main Service",
                    key: "mainService",
                    options: ["Utility"],
                  },
                  {
                    label: "Sub Service",
                    key: "subService",
                    options: [
                      "Digital Mall Charges",
                      "PGTopUp",
                    ],
                  },
                ].map((field) => (
                  <div
                    key={field.key}
                    className="grid grid-cols-[200px_10px_1fr] items-center"
                  >
                    <label className="text-sm font-semibold text-right">
                      {field.label}
                    </label>
                    <div className="text-center">:</div>

                    <select
                      className="capsInput"
                      value={formData[field.key]}
                      onChange={(e) =>
                        updateField(
                          field.key,
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      {field.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* Full Agent ID */}
                <div className="grid grid-cols-[200px_10px_1fr] items-center">
                  <label className="text-sm font-semibold text-right">
                    Full Agent Id
                  </label>
                  <div className="text-center">:</div>

                  <input
                    className="capsInput"
                    value={formData.fullAgentId}
                    onChange={(e) =>
                      updateField(
                        "fullAgentId",
                        e.target.value
                      )
                    }
                    placeholder="Enter Full Agent ID"
                  />
                </div>

              </div>
            )}

            {/* ================= BULK UPLOAD ================= */}
            {selectedForm === "bulk" && (
              <div className="pt-3 space-y-3">

                {/* File */}
                <div className="grid grid-cols-[200px_10px_1fr] items-center">
                  <label className="text-sm font-semibold text-right">
                    Select File
                  </label>
                  <div className="text-center">:</div>

                  <input
                    type="file"
                    className="capsInput"
                    onChange={(e) =>
                      updateField(
                        "file",
                        e.target.files[0]
                      )
                    }
                  />
                </div>

                {/* Download */}
                <div className="text-center text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Click To Download Format
                  </a>
                </div>

                {/* Agent ID */}
                <div className="grid grid-cols-[200px_10px_1fr] items-center">
                  <label className="text-sm font-semibold text-right">
                    Agent Id
                  </label>
                  <div className="text-center">:</div>

                  <input
                    className="capsInput"
                    value={formData.agentId}
                    onChange={(e) =>
                      updateField(
                        "agentId",
                        e.target.value
                      )
                    }
                    placeholder="Enter Agent ID"
                  />
                </div>

              </div>
            )}

            {/* Submit */}
            {selectedForm && (
              <div className="text-center pt-4">
                <button
                  onClick={handleSubmit}
                  className="capsButton px-10"
                >
                  CONTINUE
                </button>
              </div>
            )}

          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default PGUserLimit;
