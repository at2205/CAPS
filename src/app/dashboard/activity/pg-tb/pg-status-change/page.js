"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const PGStatusChange = () => {
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      Swal.fire({ icon: "warning", title: "Validation", text: "Please enter Transaction Id", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      setLoading(true);
      const payload = {
        userId: localStorage.getItem("userId"),
        loginType: localStorage.getItem("adminUserType"),
        txnId: transactionId.trim(),
      };
      const response = await urlencodedInstance.post(
        endpoints.activityEndpoints.pgtbStatusChange,
        new URLSearchParams({ jsonData: JSON.stringify(payload) })
      );
      const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
      if (data.status === "0") {
        Swal.fire({ icon: "success", title: "Success", text: data.message || "Status updated successfully" });
        setTransactionId("");
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message || "Status update failed" });
      }
    } catch (error) {
      console.error("PG Status Change Error:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > PG Status Change"
        description="Update payment gateway transaction status"
      />

      <PageCard>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="w-[520px] space-y-4">

              {/* Transaction ID */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Transaction Id
                </label>
                <div className="text-center">:</div>

                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) =>
                    setTransactionId(e.target.value)
                  }
                  maxLength={40}
                  className="capsInput"
                  placeholder="Enter Transaction ID"
                />
              </div>

              {/* Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="capsButton px-10"
                >
                  SUBMIT
                </button>
              </div>

            </div>
          </div>
        </form>
      </PageCard>
    </div>
  );
};

export default PGStatusChange;
