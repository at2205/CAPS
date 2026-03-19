"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const PGStatusChange = () => {
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transactionId.trim()) {
      alert("Please enter Transaction Id");
      return;
    }

    console.log("Transaction Id:", transactionId);
    alert("Status change submitted (frontend only)");
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
