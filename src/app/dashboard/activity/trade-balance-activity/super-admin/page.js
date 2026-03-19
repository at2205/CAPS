"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const SuperAdmin = () => {
  const [superAdmin, setSuperAdmin] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (superAdmin === "Self-Action") {
      router.push("/self-Action");
    } else if (superAdmin === "Portal Admin Request") {
      router.push("/portal-admin-request");
    } else if (superAdmin === "Portal Admin Push") {
      router.push("/portal-admin-push");
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Super Admin"
        description="Select action to continue"
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
                value={superAdmin}
                onChange={(e) => setSuperAdmin(e.target.value)}
                required
                className="capsSelect"
              >
                <option value="">--select--</option>
                <option value="Self-Action">Self-Action</option>
                <option value="Portal Admin Request">
                  Portal Admin Request
                </option>
                <option value="Portal Admin Push">
                  Portal Admin Push
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

export default SuperAdmin;
