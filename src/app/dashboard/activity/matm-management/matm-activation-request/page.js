"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const MATMActivationRequest = () => {
  const [channel, setChannel] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ channel, fromDate, toDate });
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="MATM Activation Request"
        description="Filter and download MATM activation requests"
      />

      {/* MAIN CARD */}
      <PageCard>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>

            {/* CHANNEL */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                Channel
              </label>
              <div className="text-center">:</div>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="capsInput"
              >
                <option value="">Select Channel</option>
                <option value="AG">Retailer</option>
                <option value="DS">Distributor</option>
              </select>
            </div>

            {/* FROM DATE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-4">
              <label className="text-right font-medium">
                From Date
              </label>
              <div className="text-center">:</div>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* TO DATE */}
            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-6">
              <label className="text-right font-medium">
                To Date
              </label>
              <div className="text-center">:</div>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="capsInput"
              />
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 space-x-4">
              <button type="submit" className="capsButton min-w-[120px]">
                Submit
              </button>

              <button type="button" className="capsButton min-w-[120px]">
                Download
              </button>
            </div>

          </form>
        </div>

      </PageCard>
    </div>
  );
};

export default MATMActivationRequest;
