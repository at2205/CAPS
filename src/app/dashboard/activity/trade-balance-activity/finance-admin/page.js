"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const FinanceAdmin = () => {
  const [financeAdmin, setFinanceAdmin] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (financeAdmin === "Self-Fund Request") {
      router.push("/self-fund-request");
    } else if (financeAdmin === "Trade Balance Request") {
      router.push("/trade-balance-request");
    } else if (financeAdmin === "Trade Balance Push") {
      router.push("/trade-balance-push");
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Finance Admin"
        description="Select finance action to continue"
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
                value={financeAdmin}
                onChange={(e) => setFinanceAdmin(e.target.value)}
                required
                className="capsSelect"
              >
                <option value="">--select--</option>
                <option value="Self-Fund Request">
                  Self-Fund Request
                </option>
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
                disabled={!financeAdmin}
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

export default FinanceAdmin;
