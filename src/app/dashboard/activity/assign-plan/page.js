"use client";
import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const AssignPlan = () => {
  const [agentId, setAgentId] = useState("");
  const [plan, setPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");

  /* ===== ON LOAD ===== */
  useEffect(() => {
    getAllPlans();
  }, []);

  const getAllPlans = () => {
    setPlans([
      { value: "", label: "-- Select Plan --" },
      { value: "Basic", label: "Basic" },
      { value: "Silver", label: "Silver" },
      { value: "Gold", label: "Gold" },
    ]);
  };

  const submitForm = async () => {
    if (!agentId) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please enter Agent ID.", timer: 1500, showConfirmButton: false });
      return;
    }

    if (!plan) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please select Plan.", timer: 1500, showConfirmButton: false });
      return;
    }

    try {
      const payload = { userId: localStorage.getItem("userId"), agentId, plan };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.assignPlan || "/controlP/assignPlan",
        new URLSearchParams({ adminUserFormBean: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Plan assigned successfully.", timer: 1500, showConfirmButton: false });
        setAgentId("");
        setPlan("");
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Assignment failed" });
      }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }

    setStatusMsg("");
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Assign Plan"
        description="Assign pricing plan to agent"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <div>

            {/* AGENT ID */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">
              <label className="text-right font-medium">
                Agent ID
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* PLAN */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                Assign Plan
              </label>

              <div className="text-center">:</div>

              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="capsSelect"
              >
                {plans.map((p, i) => (
                  <option key={i} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button
                onClick={submitForm}
                className="capsButton min-w-[120px]"
              >
                Submit
              </button>
            </div>

            {/* STATUS MESSAGE */}
            {statusMsg && (
              <div className="text-center mt-4 font-semibold text-green-600">
                {statusMsg}
              </div>
            )}

          </div>
        </div>

      </PageCard>
    </div>
  );
};

export default AssignPlan;
