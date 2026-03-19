"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const EnableDisablePGForm = () => {
  const [action, setAction] = useState("0");
  const [roIds, setRoIds] = useState("");

  const handleActionChange = (value) => {
    setAction(value);
    setRoIds("");
  };

  const updateStatus = () => {
    if (!roIds.trim()) {
      alert("Please Enter RO ID.");
      return;
    }

    alert(`Action: ${action}\nRO IDs: ${roIds}`);
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > Enable / Disable PG Form"
        description="Enable or disable PG access using RO ID"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            {/* Select Action */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Select Action
              </label>
              <div className="text-center">:</div>

              <select
                value={action}
                onChange={(e) =>
                  handleActionChange(e.target.value)
                }
                className="capsInput"
              >
                <option value="0">Select</option>
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </select>
            </div>

            {/* RO ID */}
            {action !== "0" && (
              <>
                <div className="grid grid-cols-[200px_10px_1fr] items-start">
                  <label className="text-sm font-semibold text-right pt-2">
                    Enter RO ID
                  </label>
                  <div className="text-center pt-2">:</div>

                  <textarea
                    value={roIds}
                    onChange={(e) =>
                      setRoIds(e.target.value)
                    }
                    placeholder="Full Agent ID (comma separated for multiple)"
                    className="capsInput h-[100px] resize-y"
                  />
                </div>

                {/* Button */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={updateStatus}
                    className="capsButton px-10"
                  >
                    SUBMIT
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default EnableDisablePGForm;
