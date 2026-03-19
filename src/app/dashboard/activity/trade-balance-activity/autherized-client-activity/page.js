"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const AuthorizedClientActivity = () => {
  const [authorizedClientActivity, setAuthorizedClientActivity] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authorizedClientActivity === "myDeposit") {
      router.push("/authorized-client-activity/my-deposit");
    } 
    else if (authorizedClientActivity === "tradeBalanceRequest") {
      router.push("/authorized-client-activity/trade-balance-request");
    } 
    else if (authorizedClientActivity === "tradeBalancePush") {
      router.push("/authorized-client-activity/trade-balance-push");
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Authorized Client Activity"
        description="Select authorized client action"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">

              <label className="text-right font-medium">
                Select
              </label>

              <div className="text-center">:</div>

              <select
                value={authorizedClientActivity}
                onChange={(e) =>
                  setAuthorizedClientActivity(e.target.value)
                }
                required
                className="capsSelect"
              >
                <option value="">--select--</option>
                <option value="myDeposit">My Deposit</option>
                <option value="tradeBalanceRequest">
                  Trade Balance Request
                </option>
                <option value="tradeBalancePush">
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

export default AuthorizedClientActivity;
