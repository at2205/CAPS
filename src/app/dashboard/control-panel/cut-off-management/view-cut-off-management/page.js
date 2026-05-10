"use client";
import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function ViewCutOffManagement() {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formValues, setFormValues] = useState({ fullId: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleSubmit = async () => {
    if (!formValues.fullId) {
      Swal.fire({
        icon: "warning",
        text: "Please enter full id",
        confirmButtonColor: "#5fa0b5",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        userId: localStorage.getItem("userId"),
        agentId: formValues.fullId.trim(),
        portalId: localStorage.getItem("portalId"),
      };

      const response = await axiosInstance.post(
        endpoints.controlPEndpoints.viewCutOffamount,
        payload,
      );

      let data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      console.log("API RESPONSE 👉", data);

      const list = data?.cutoffAmountList || [];

      setTableData(list);

      if (list.length === 0) {
        Swal.fire({
          icon: "warning",
          text: data?.message || "No data found",
          confirmButtonColor: "#5fa0b5",
        });
      }
    } catch (error) {
      console.log("ERROR 👉", error);

      const data = error.response?.data;

      if (data?.cutoffAmountList) {
        setTableData(data.cutoffAmountList);
        return;
      }

      if (
        data?.message?.toLowerCase().includes("technical") &&
        !data?.cutoffAmountList
      ) {
        Swal.fire({
          icon: "warning",
          text: "Invalid ID or no data found",
          confirmButtonColor: "#5fa0b5",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: data?.message || "Something went wrong",
          confirmButtonColor: "#5fa0b5",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="View Cut-Off Management"
        description="View cut-off configuration by Full ID"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">
            {/* INPUT */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
              <label className="text-right font-medium">Enter Full Id</label>
              <div className="text-center">:</div>

              <input
                type="text"
                name="fullId"
                value={formValues.fullId}
                placeholder="Enter full id"
                onChange={handleInputChange}
                className="capsInput"
              />
            </div>

            {/* LOADING */}
            {loading && (
              <p className="text-center text-gray-500 mb-2">Loading...</p>
            )}

            {/* BUTTON */}
            <div className="text-center mt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Fetching..." : "Update"}
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        {tableData.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border border-[#1f4e5f] text-sm">
              <thead>
                <tr>
                  <th
                    style={{ background: "#5fa0b5", color: "#fff" }}
                    className="border px-4 py-2"
                  >
                    Portal Id
                  </th>
                  <th
                    style={{ background: "#5fa0b5", color: "#fff" }}
                    className="border px-4 py-2"
                  >
                    Agent Id
                  </th>
                  <th
                    style={{ background: "#5fa0b5", color: "#fff" }}
                    className="border px-4 py-2"
                  >
                    CutOff Amount
                  </th>
                  <th
                    style={{ background: "#5fa0b5", color: "#fff" }}
                    className="border px-4 py-2"
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index} className="text-center bg-white">
                    <td className="border px-4 py-2">{item.PortalId}</td>
                    <td className="border px-4 py-2">{item.AgentId}</td>
                    <td className="border px-4 py-2">{item.CutOffAmount}</td>
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
}

export default ViewCutOffManagement;
