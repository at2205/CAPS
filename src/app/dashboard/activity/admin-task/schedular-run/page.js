"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const SchedulerRun = () => {
  const [schedulerType, setSchedulerType] = useState("select");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!schedulerType || schedulerType === "select") {
      alert("Please select Scheduler Name");
      return;
    }

    // frontend only
    alert(`Scheduler Run : ${schedulerType}`);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Scheduler Run"
        description="Manually trigger selected scheduler"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center mb-6">
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">

              <label className="text-right font-medium">
                Scheduler Name
              </label>

              <div className="text-center">:</div>

              <select
                value={schedulerType}
                onChange={(e) => setSchedulerType(e.target.value)}
                className="capsSelect"
              >
                <option value="select">Select</option>
                <option value="webSchedular">Web Scheduler</option>
                <option value="ApiSchedular">API Scheduler</option>
                <option value="MappSchedular">MAPP Scheduler</option>
              </select>

            </div>

            <div className="text-center">
              <button
                type="submit"
                className="capsButton min-w-[120px]"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </PageCard>
    </div>
  );
};

export default SchedulerRun;
