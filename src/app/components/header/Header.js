"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout_url = endpoints.loginEndpoints.logout;

  const handleLogout = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("No active session found.");
        router.push("/");
        return;
      }

      await axiosInstance.post(
        logout_url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Clear storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if API fails → clear session
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-14 bg-[#226b88] shadow px-4 text-white flex items-center">
      <div className="flex justify-between items-center w-full">
        {/* Left */}
        <div className="flex gap-4">
          <button className="font-semibold hover:bg-[#4fa2c2] px-3 py-1 rounded transition">
            Home
          </button>
          <button className="font-semibold hover:bg-[#4fa2c2] px-3 py-1 rounded transition">
            Change Password
          </button>
          <button className="font-semibold hover:bg-[#4fa2c2] px-3 py-1 rounded transition">
            Back
          </button>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="font-semibold hover:bg-red-500 px-3 py-1 rounded transition"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6 text-sm">
          <span>
            <span className="opacity-80">User:</span>{" "}
            <strong>Anuj Kumar Singh</strong>
          </span>

          <span className="border-l border-white/30 pl-4">
            <span className="opacity-80">ID:</span> <strong>1010</strong>
          </span>

          <span className="border-l border-white/30 pl-4">
            <span className="opacity-80">Balance:</span> <strong>₹1,000</strong>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
