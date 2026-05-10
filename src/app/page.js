"use client";
import Image from "next/image";
import { useState } from "react";
import PopUpMessage from "./components/PopUpMessage";
import Spinner from "./components/Spinner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import React, { useEffect } from "react";
export default function Home() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    let interval;

    if (isOtpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [isOtpSent, resendTimer]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const [statusMessage, setStatusMessage] = useState({
    status: "error",
    message: "You have successfully logged in!",
  });

  // API endpoints
  const sendOTP_url = endpoints.loginEndpoints.login;
  const verifyOTP_url = endpoints.loginEndpoints.verifyOTP;

  console.log("API Endpoints:", { sendOTP_url, verifyOTP_url });

  /* ================= SEND OTP ================= */
  const sendotp = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(sendOTP_url, {
        User_name: formData?.email,
        Password: formData?.password,
        ip: "122.160.71.115",
      });

      const { data } = response;

      if (data?.status !== "0") {
        setStatusMessage({
          status: "error",
          message: data?.message || "Failed to send OTP. Please try again.",
        });
        setOpenModal(true);
      } else {
        setStatusMessage({
          status: "success",
          message: data?.message || "OTP sent successfully!",
        });
        // setOpenModal(true);
        setIsOtpSent(true);
      }
    } catch (error) {
      setStatusMessage({
        status: "error",
        message: "Something went wrong while sending OTP. Please try again.",
      });
      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendTimer(60);
    setCanResend(false);
    await sendotp();
  };
  /* ================= VERIFY OTP ================= */
  const verifyOTP = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(verifyOTP_url, {
        User_name: formData?.email,
        Password: formData?.password,
        ip: "122.160.71.115",
        OTP: formData?.otp,
      });

      const { data } = response;

      if (data?.status !== "0" || data?.otpstatus !== "0") {
        setStatusMessage({
          status: "error",
          message: data?.message || "Failed to verify OTP. Please try again.",
        });
        setOpenModal(true);
      } else {
        try {
          const accessToken = data?.accessToken;
          const refreshToken = data?.refreshToken;

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            document.cookie = `authToken=${accessToken}; path=/`;
          }

          // AFTER LOGIN SUCCESS - STORE USER DETAILS
          if (data?.userDetails) {
            const user = data.userDetails;

            localStorage.setItem("userId", user.userId || "");
            localStorage.setItem("userName", user.userName || user.name || "");
            localStorage.setItem(
              "balance",
              user.balance || user.walletBalance || "0",
            );

            localStorage.setItem("adminUserType", user.adminUserType || "");
            localStorage.setItem("portalId", user.adminUserPortalId || "");
          }

          if (data?.userDetails?.adminUserType) {
            localStorage.setItem(
              "adminUserType",
              data.userDetails.adminUserType,
            );
            console.log("Stored User Type:", data.userDetails.adminUserType);
          } else {
            console.warn("userType missing from response");
          }

          if (data?.userDetails?.userId) {
            localStorage.setItem("userId", data.userDetails.userId);
            console.log("Stored User ID:", data.userDetails.userId);
          }

          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
          localStorage.setItem("userId", data?.userDetails?.userId);
          localStorage.setItem(
            "portalId",
            data?.userDetails?.adminUserPortalId,
          );

          // Store permission details for RBAC menu visibility
          if (data?.adminServiceDetails) {
            localStorage.setItem(
              "adminServiceDetails",
              JSON.stringify(data.adminServiceDetails),
            );
          }

          // Optional success popup
          setStatusMessage({
            status: "success",
            message: data?.message || "Login successful!",
          });
          //setOpenModal(true);

          //route.push("/dashboard");
          setTimeout(() => {
            route.replace("/dashboard");
          }, 300);
        } catch (error) {
          console.error("Token storage failed:", error);

          setStatusMessage({
            status: "error",
            message: "Login succeeded but session setup failed.",
          });
          setOpenModal(true);
        }
      }
    } catch (error) {
      setStatusMessage({
        status: "error",
        message: "Something went wrong while verifying OTP. Please try again.",
      });
      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGIN HANDLER ================= */
  const handleLogin = async () => {
    console.log("Form Data:", formData);

    if (!formData.email || !formData.password) {
      setStatusMessage({
        status: "error",
        message: "Please enter email and password.",
      });
      setOpenModal(true);
      return;
    }

    if (!isOtpSent) {
      sendotp();
    } else {
      if (!formData.otp) {
        setStatusMessage({
          status: "error",
          message: "Please enter OTP.",
        });
        setOpenModal(true);
        return;
      }
      verifyOTP();
    }
  };

  /* ================= INPUT HANDLER ================= */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="relative min-h-screen bg-[url('/screen.png')] bg-cover bg-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
      {/* <div className="w-full text-center pt-6 pb-0">
        <h1 className="text-white text-8xl md:text-[90px] font-serif tracking-widest drop-shadow-[0_5px_25px_rgba(0,0,0,0.6)]">
          SUPER ADMIN
        </h1>
      </div> */}
      <div className="flex min-h-screen items-center justify-center px-4">
        {" "}
        <div className="relative bg-white backdrop-blur-md w-[420px] p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-gray-200 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)]">
          {/*BACKGROUND LOGO */}
          <div className="absolute inset-0 flex items-center justify-start pl-28 opacity-25 pointer-events-none">
            {" "}
            <img
              src="/lock_icon_transparent.png"
              alt="logo"
              className="w-40 h-80 object-contain"
            />
          </div>      

          {/* LOGO TOP */}
          <div className="flex justify-center mb-3">
            <img
              src="/CardLogo.png"
              alt="logo"
              className="w-14 md:w-16 object-contain"
            />
          </div>
          {/*HEADING */}
          <h1
            className="relative z-10 text-3xl font-serif font-bold mb-6 text-center 
bg-gradient-to-r from-[#1e3c72] via-[#2c5364] to-[#4fa2c2] 
bg-clip-text text-transparent tracking-[3px] 
drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            ADMIN LOGIN
          </h1>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Username</label>
              <input
                type="email"
                id="email"
                value={formData?.email || ""}
                className="w-full  capsInput"
                placeholder="Enter your email"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={formData?.password || ""}
                className="w-full  capsInput"
                placeholder="Enter your password"
                onChange={handleInputChange}
              />
            </div>

            {isOtpSent && (
              <div>
                <label className="block font-medium mb-1">OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={formData?.otp || ""}
                  className="w-full  capsInput"
                  placeholder="Enter your OTP"
                  maxLength={6}
                  onChange={handleInputChange}
                />
                {/* RESEND OTP */}
                <div className="flex justify-between items-center text-sm mt-1">
                  {!canResend ? (
                    <span className="text-gray-500">
                      Resend OTP in {resendTimer}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-[#226b88] font-semibold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className=" flex justify-center text-sm mb-4">
              <h5 className="text-gray-500">
                Forgot Password?{" "}
                <span className="text-[#226b88] underline cursor-pointer">
                  click here{" "}
                </span>
                to Reset.
              </h5>
            </div>

            <div>
              <button
                type="button"
                disabled={loading}
                onClick={handleLogin}
                className="w-full py-2 rounded-lg text-white font-semibold tracking-wide

  bg-gradient-to-r from-[#1e3c72] via-[#2c5364] to-[#4fa2c2]

  shadow-[0_4px_15px_rgba(0,0,0,0.4)]
  hover:shadow-[0_6px_25px_rgba(0,0,0,0.6)]

  hover:from-[#2c5364] hover:to-[#6dd5fa]

  transition-all duration-300"
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </div>
          </form>
          <p className="text-center text-xs text-gray-500 mt-4 tracking-wide">
            © {new Date().getFullYear()} Bankit • Secure Login
          </p>
        </div>
      </div>
      {openModal && (
        <div>
          <PopUpMessage statusMessage={statusMessage} />
        </div>
      )}
      {/*  FOOTER */}
      <footer className="w-full text-center py-3 text-sm text-white fixed bottom-0 left-0 bg-black/40 backdrop-blur-md">
        Call Us: 📞
        <a
          href="tel:+918142600000"
          className="text-yellow-300 ml-1 font-medium hover:underline"
        >
          8142600000
        </a>
        {" | "}
        Write Us: ✍️
        <a
          href="mailto:support@bankit.in"
          className="text-yellow-300 ml-1 font-medium hover:underline"
        >
          support@bankit.in
        </a>
        {" | "}
        <span className="opacity-80">
          © {new Date().getFullYear()} FINDIBANKIT
        </span>
      </footer>
      {openModal && (
        <div>{/* <PopUpMessage statusMessage={statusMessage} /> */}</div>
      )}
    </div>
  );
}
