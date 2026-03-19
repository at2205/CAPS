"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const PGUserLimitAuth = () => {
  const [data] = useState({
    date: "2025-01-10",
    userId: "PG12345",
    limits: [
      { id: 1, channel: "UPI", amt: "5000", daily: "50000" },
      { id: 2, channel: "CARD", amt: "10000", daily: "100000" },
    ],
  });

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > PG User Limit Auth"
        description="Authorize PG transaction limits"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[620px] space-y-4">

            {/* INFO SECTION */}
            <div className="flex justify-center">
              <div className="text-sm space-y-1">
                <div className="flex">
                  <span className="w-24 text-right font-semibold">
                    Date
                  </span>
                  <span className="px-2">:</span>
                  <span>{data.date}</span>
                </div>

                <div className="flex">
                  <span className="w-24 text-right font-semibold">
                    User Id
                  </span>
                  <span className="px-2">:</span>
                  <span>{data.userId}</span>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="pt-3 overflow-x-auto">
              <table className="w-full border text-sm text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">
                      Channel Name
                    </th>
                    <th className="border px-3 py-2">
                      Amount / Transaction
                    </th>
                    <th className="border px-3 py-2">
                      Daily Limit
                    </th>
                    <th className="border px-3 py-2">
                      Authorize
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.limits.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="border py-2">
                        {row.channel}
                      </td>
                      <td className="border">
                        {row.amt}
                      </td>
                      <td className="border">
                        {row.daily}
                      </td>
                      <td className="border">
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-6 pt-4">
              <button className="capsButton px-8">
                SUBMIT
              </button>

              <button className="capsButtonSecondary px-6">
                CANCEL
              </button>
            </div>

          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default PGUserLimitAuth;
