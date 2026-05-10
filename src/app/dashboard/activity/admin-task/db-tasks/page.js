"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const DBTasks = () => {
  const [dbTasks, setDbTasks] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!dbTasks) {
      alert("Please select DB Task");
      return;
    }

    console.log("Selected Task:", dbTasks);

    // ✅ Next.js Navigation
    if (dbTasks === "BALANCE_INFO") {
      router.push("/db-task/balances");
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="DB Tasks"
        description="Execute database related tasks"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">

            <label className="text-right font-medium">
              Select
            </label>

            <div className="text-center">:</div>

            <select
              value={dbTasks}
              onChange={(e) => setDbTasks(e.target.value)}
              className="capsSelect"
            >
              <option value="">--select--</option>
              <option value="BALANCE_INFO">Balance Info</option>
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

export default DBTasks;
