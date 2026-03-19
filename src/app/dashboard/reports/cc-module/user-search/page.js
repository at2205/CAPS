"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function UserSearchs() {
  const [userType, setUserType] = useState("Select");
  const [mobileNo, setMobileNo] = useState("");
  const [emailID, setEmailID] = useState("");
  const [searchUserId, setSearchUserId] = useState("");

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateForm = () => {
    if (userType === "Select") {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select User Type",
      });
      return false;
    }

    if (!mobileNo && !emailID && !searchUserId) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter at least one value",
      });
      return false;
    }

    if (mobileNo && mobileNo.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please enter valid mobile number",
      });
      return false;
    }

    return true;
  };

  // ================= SEARCH USER =================

  const handleSearch = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams();

      const payload = {
        userType: userType,
        mobileNo: mobileNo,
        emailID: emailID,
        loginType: localStorage.getItem("adminUserType"),
        userId: localStorage.getItem("userId"),
        searchUserId: searchUserId,
      };

      params.append("adminUserFormBean", JSON.stringify(payload));

      const response = await urlencodedInstance.post(
        endpoints.reportsEndpoints.getUserData,
        params,
      );

      console.log("FULL RESPONSE :", response);
      const result = response.data;

      console.log("API DATA :", result);

      if (result?.accountStatement?.length > 0) {
        setUserData(result.accountStatement);

        Swal.fire({
          icon: "success",
          title: "User Found",
          text: "User Found Successfully",
          timer: 1200,
          showConfirmButton: false,
        });
      } else {
        setUserData([]);

        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: "No records available",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "API Error",
        text: "Something went wrong while fetching data",
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > User Search"
        description="Search user details"
      />

      <PageCard>
        {message && (
          <p className="text-center font-semibold mb-4 text-sm text-red-500">
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">
            {/* USER TYPE */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Select User
              </label>

              <div className="text-center">:</div>

              <select
                className="capsInput"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Select">Select User Type</option>
                <option value="admin">Admin User</option>
                <option value="mds">Master Distributor</option>
                <option value="ds">Distributor</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            {/* MOBILE */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Mobile Number
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                maxLength={10}
                className="capsInput"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>

            {/* EMAIL */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Email Id
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                className="capsInput"
                value={emailID}
                onChange={(e) => setEmailID(e.target.value)}
              />
            </div>

            {/* USER ID */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                User Id
              </label>

              <div className="text-center">:</div>

              <input
                type="text"
                className="capsInput"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
              />
            </div>

            {/* SEARCH BUTTON */}

            <div className="text-center pt-2">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="capsButton px-10"
              >
                {loading ? "Searching..." : "SEARCH"}
              </button>
            </div>

            {/* ================= TABLE ================= */}

            {userData.length > 0 && (
              <div className="pt-4 w-full">
                <table className="w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2">S.N.</th>
                      <th className="border px-3 py-2">Portal ID</th>
                      <th className="border px-3 py-2">Company Name</th>
                      <th className="border px-3 py-2">User Id</th>
                      <th className="border px-3 py-2">User Name</th>
                      <th className="border px-3 py-2">Current Status</th>
                      <th className="border px-3 py-2">Block Status</th>
                      <th className="border px-3 py-2">User Type</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userData.map((user, index) => (
                      <tr key={index}>
                        <td className="border">{index + 1}</td>
                        <td className="border">{user?.clientID}</td>
                        <td className="border">{user?.companyName}</td>
                        <td className="border">{user?.userID}</td>
                        <td className="border">{user?.userName}</td>
                        <td className="border">{user?.loginStatus}</td>
                        <td className="border">{user?.blockStatus}</td>
                        <td className="border">{user?.userType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default UserSearchs;
