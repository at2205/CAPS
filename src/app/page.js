"use client";
import Image from "next/image";
import { useState } from "react";
import PopUpMessage from "./components/PopUpMessage";
import Spinner from "./components/Spinner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

export default function Home() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

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
        setOpenModal(true);
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

          // Optional success popup
          setStatusMessage({
            status: "success",
            message: data?.message || "Login successful!",
          });
          setOpenModal(true);

          //route.push("/dashboard");
          setTimeout(() => {
            route.push("/dashboard");
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
    <div className=" flex justify-center text-[#226b88]">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#def6ff] w-[500px] p-8 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

          <form className="space-y-2">
            <div>
              <label className="block font-medium mb-1">Username</label>
              <input
                type="email"
                id="email"
                value={formData?.email || ""}
                className="w-full capsInput"
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
              </div>
            )}

            <div className=" flex justify-center text-sm mb-4">
              <h5>
                Forgot Password?{" "}
                <span className="text-[#226b88] underline cursor-pointer">
                  click here{" "}
                </span>
                to Reset.
              </h5>
            </div>

            <div className="grid justify-center">
              <button
                type="button"
                className="capsButton"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading === true ? <Spinner /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {openModal && (
        <div>
          <PopUpMessage statusMessage={statusMessage} />
        </div>
      )}
    </div>
  );
}
