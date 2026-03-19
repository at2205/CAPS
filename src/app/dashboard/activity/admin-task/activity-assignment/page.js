"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const ActivityAssignment = () => {
  const [portalUserId, setPortalUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitForm = () => {
    if (!portalUserId.trim()) {
      alert("Please enter portal user id.");
      return;
    }

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      setLoading(false);
      setMessage(`Search submitted for User ID: ${portalUserId}`);
    }, 1000);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Activity Assignment"
        description="Search activities assigned to portal users"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="text-center mb-4 font-medium">
            {message}
          </div>
        )}

        {/* FORM */}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">

            <label className="text-right font-medium">
              User ID
            </label>

            <div className="text-center">:</div>

            <input
              type="text"
              value={portalUserId}
              onChange={(e) => setPortalUserId(e.target.value)}
              className="capsInput"
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className="text-center">
          <button
            onClick={submitForm}
            disabled={loading}
            className="capsButton min-w-[120px]"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

      </PageCard>
    </div>
  );
};

export default ActivityAssignment;
