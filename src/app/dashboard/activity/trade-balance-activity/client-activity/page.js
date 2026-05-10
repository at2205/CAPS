"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ClientActivity = () => {
  const [clientActivity, setClientActivity] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientActivity === "My Deposit") {
      router.push("/my-deposit");
    } else if (clientActivity === "Trade Balance Request") {
      router.push("/client-activity/trade-balance-request");
    } else if (clientActivity === "Trade Balance Push") {
      router.push("/client-activity/trade-balance-push");
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Client Activity"
        description="Select client activity to continue"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">

              <label className="text-right font-medium">
                Select
              </label>

              <div className="text-center">:</div>

              <select
                value={clientActivity}
                onChange={(e) => setClientActivity(e.target.value)}
                required
                className="capsSelect"
              >
                <option value="">--select--</option>
                <option value="My Deposit">My Deposit</option>
                <option value="Trade Balance Request">
                  Trade Balance Request
                </option>
                <option value="Trade Balance Push">
                  Trade Balance Push
                </option>
              </select>

            </div>

            <div className="text-center">
              <button
                type="submit"
                className="capsButton min-w-[120px]"
              >
                Continue
              </button>
            </div>

          </form>
        </div>

      </PageCard>
    </div>
  );
};

export default ClientActivity;
