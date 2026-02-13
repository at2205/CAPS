"use client";
import Image from "next/image";
import { use, useState } from "react";
import PopUpMessage from "./components/PopUpMessage";
import Spinner from "./components/Spinner";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    status: "error",
    message: "You have successfully logged in!",
  });

  const authenticateUser = async (credentials) => {
    // Simulate an API call to authenticate the user
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    }
  }


  const handleLogin = async () => {
    setLoading(true);
    try {
      const credentials = {
        email: "user@example.com",
        password: "password123",
        otp: "123456"
      };
      const result = await authenticateUser(credentials);
      setLoading(false);
      setStatusMessage({
        status: "success",
        message: "You have successfully logged in!",
      });
      setOpenModal(true);
      route.push('/dashboard');

    } catch (error) {
      setLoading(false);
      setStatusMessage({
        status: "error",
        message: "Login failed. Please try again.",
      });
      setOpenModal(true);
    }
  };

  return (
    <div className=" flex justify-center text-[#226b88]">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#def6ff] w-[500px] p-8 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Login
          </h1>

          <form className="space-y-2">
            <div>
              <label className="block font-medium mb-1">
                Username
              </label>
              <input
                type="email"
                className="w-full capsInput"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full  capsInput"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                OTP
              </label>
              <input
                type="otp"
                className="w-full  capsInput"
                placeholder="Enter your OTP"
                maxLength={6}
              />
            </div>

            <div className=" flex justify-center text-sm mb-4">
              <h5>Forgot Password? <span className="text-[#226b88] underline cursor-pointer">click here </span>to Reset.</h5>
            </div>

            <div className="grid justify-center">
              <button
                type="button"
                className="capsButton"
                disabled={loading}
                onClick={handleLogin}
              >
                {
                  loading === true ? <Spinner /> : "Login"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* model */}
      <div>
        <PopUpMessage statusMessage={statusMessage} />
      </div>
    </div>
  );
}
