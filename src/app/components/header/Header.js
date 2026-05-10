"use client";

import { useRouter } from "next/navigation";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [userData, setUserData] = useState({
    name: "",
    id: "",
    balance: "",
  });
  useEffect(() => {
    const name = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");
    const balance = localStorage.getItem("balance");

    setUserData({
      name: name || "N/A",
      id: id || "N/A",
      balance: balance || "0",
    });
  }, []);
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
      localStorage.removeItem("adminServiceDetails");
      localStorage.removeItem("userId");
      localStorage.removeItem("adminUserType");
      localStorage.removeItem("portalId");
      localStorage.removeItem("userName");
      localStorage.removeItem("balance");

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if API fails → clear session
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("adminServiceDetails");
      localStorage.removeItem("userId");
      localStorage.removeItem("adminUserType");
      localStorage.removeItem("portalId");
      localStorage.removeItem("userName");
      localStorage.removeItem("balance");

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#2c5364] via-[#4fa2c2] to-[#4fa2c2] shadow-lg px-3 py-2 text-white backdrop-blur-md border-b border-white/10">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 w-full">
        {/* LEFT */}
        <div className="flex flex-wrap gap-2 items-center bg-white/5 px-2 py-2 rounded-lg backdrop-blur-sm">
          {/* HOME */}
          <button
            onClick={() => router.push("/dashboard")}
            className="px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium text-white bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:-translate-y-[1px]"
          >
            Home
          </button>

          {/* CHANGE PASSWORD */}
          <button className="px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium text-white bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:-translate-y-[1px]">
            Change Password
          </button>

          {/* BACK */}
          <button
            onClick={() => {
              if (pathname !== "/dashboard") router.back();
            }}
            className="px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium text-white bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:-translate-y-[1px]"
          >
            Back
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium text-white bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:-translate-y-[1px]"
          >
            {loading ? "Logging..." : "Logout"}
          </button>
        </div>

        
        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm tracking-wide bg-white/5 px-3 py-2 rounded-lg backdrop-blur-sm">
          <span>
            <span className="opacity-80">User:</span>{" "}
            <strong>{userData.name}</strong>
          </span>

          <span className="border-l border-white/20 pl-3">
            <span className="opacity-80">ID:</span>{" "}
            <strong>{userData.id}</strong>
          </span>

          <span className="border-l border-white/20 pl-3">
            <strong className="text-green-300">₹{userData.balance}</strong>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
