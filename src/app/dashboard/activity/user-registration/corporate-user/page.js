"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

/* ================= WHITE LABEL COMPONENT ================= */
function WhiteLabelRegistration({ onBack }) {
  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="White Label Registration"
        description="Register new white label client"
      />

      <PageCard>
        <div className="text-center py-10 text-gray-500 text-sm">
          White Label Form Here
        </div>

        <div className="text-center">
          <button
            onClick={onBack}
            className="capsButton px-10"
          >
            BACK
          </button>
        </div>
      </PageCard>
    </div>
  );
}

/* ================= CORPORATE USER ================= */
function CorporateUser() {
  const [selectUser, setSelectUser] = useState("0");
  const [showWL, setShowWL] = useState(false);
  const [message, setMessage] = useState("");

  const handleContinue = () => {
    if (selectUser === "0") {
      alert("Please Select User.");
      return;
    }

    if (selectUser === "WL_CLIENT") {
      setShowWL(true);
    }
  };

  if (showWL) {
    return <WhiteLabelRegistration onBack={() => setShowWL(false)} />;
  }

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Corporate User"
        description="Select corporate user type"
      />

      <PageCard>
        {message && (
          <p className="text-center text-red-500 font-semibold mb-4 text-sm">
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            {/* Select Row */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Select
              </label>
              <div className="text-center">:</div>

              <select
                value={selectUser}
                onChange={(e) => setSelectUser(e.target.value)}
                className="capsInput"
              >
                <option value="0">-- Select User --</option>
                <option value="WL_CLIENT">WL Client</option>
              </select>
            </div>

            {/* Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleContinue}
                className="capsButton px-10"
              >
                CONTINUE
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default CorporateUser;
