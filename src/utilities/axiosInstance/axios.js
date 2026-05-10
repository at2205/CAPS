import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 300000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");

    const userId = localStorage.getItem("userId");

    // console.log("API Request →", config.url);
    // console.log("Token:", token);
    // console.log("UserId:", userId);

    // Send JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional (only if backend really needs it)
    if (userId) {
      config.headers["adminId"] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("API Response ←", response.config.url);
    return response;
  },
  (error) => {
    console.log("API Error ←", error.response?.status);

    if (error.response?.status === 401) {
      console.log("Unauthorized → Clearing session");

      // clear everything
      // localStorage.clear();

      // redirect to login
      // window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
