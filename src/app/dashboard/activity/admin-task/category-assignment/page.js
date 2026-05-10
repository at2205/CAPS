"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const CategoryAssignment = () => {
  const [assignCategory, setAssignCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!assignCategory) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please Select Category.", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = { userId: localStorage.getItem("userId"), categoryName: assignCategory };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.adminCategoryAssi,
        new URLSearchParams({ data: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Category assigned successfully" });
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Operation failed" });
      }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Category Assignment"
        description="Assign category to selected users"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">

            <label className="text-right font-medium">
              Assign Category
            </label>

            <div className="text-center">:</div>

            <select
              value={assignCategory}
              onChange={(e) => setAssignCategory(e.target.value)}
              className="capsSelect"
            >
              <option value="">Select</option>
              <option value="Category-D">Category-D</option>
              <option value="Category-Demo">Category-Demo</option>
              <option value="Category-Free">Category-Free</option>
              <option value="Category-Kalpna">Category-Kalpna</option>
              <option value="Category-MDMH10428">Category-MDMH10428</option>
              <option value="Category-MDPB10401">Category-MDPB10401</option>
              <option value="Category-POP-Premium">Category-POP-Premium</option>
              <option value="Category-Postpaid">Category-Postpaid</option>
              <option value="Category-Prepaid">Category-Prepaid</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="capsButton min-w-[120px]"
          >
            Update
          </button>
        </div>

      </PageCard>
    </div>
  );
};

export default CategoryAssignment;
