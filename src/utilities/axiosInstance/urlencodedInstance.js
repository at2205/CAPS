import axios from "axios";

const urlencodedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 100000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

urlencodedInstance.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  const userId = localStorage.getItem("userId");
  const adminUserType = localStorage.getItem("adminUserType");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    document.cookie = `authToken=${token}; path=/`;
  }

  if (userId) {
    config.headers["adminId"] = userId;
    config.headers["portalId"] = "10002";
    config.headers["loginType"] = "ADMIN";
  }

  return config;

});

export default urlencodedInstance; 