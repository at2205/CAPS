"use client";

import { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

export default function UserForm() {
  const [clientIds, setClientIds] = useState([]);
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");

  const [messages, setMessages] = useState({});
  const [selectedMessages, setSelectedMessages] = useState({});
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  /* ================= CLIENT IDS ================= */

  useEffect(() => {
    const fetchClientIds = async () => {
      try {
        const res = await axiosInstance.get(
          endpoints.marketingModuleEndpoints.getClientDetails,
        );

        console.log("CLIENT API RESPONSE:", res.data);

        if (res.data?.data) {
          const ids = res.data.data.map((item) => item.clientId);

          setClientIds(ids);
        }
      } catch (error) {
        console.log("CLIENT API ERROR:", error);
      }
    };

    fetchClientIds();
  }, []);

  /* ================= FETCH MESSAGE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please select User Id",
      });
      return;
    }

    if (!userType) {
      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please select User Type",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.get(
        `${endpoints.marketingModuleEndpoints.getMessage}?id=${userId}&userType=${userType}`,
      );

      console.log("MESSAGE RESPONSE:", res.data);

      if (res.data.status === "success") {
        setMessages({
          1: res.data.data.ticker || "",
          3: res.data.data.deal || "",
        });

        setShowAdditionalFields(true);
      }
    } catch (err) {
      console.log("MESSAGE ERROR:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching message",
      });
    }

    setLoading(false);
  };

  /* ================= UPDATE MESSAGE ================= */

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = new URLSearchParams();

      payload.append("id", userId);
      payload.append("userType", userType);

      payload.append("tickerMessage", messages[2] || "");
      payload.append("dealMessage", messages[4] || "");

      payload.append("portalUserType", localStorage.getItem("adminUserType"));
      payload.append("userId", localStorage.getItem("userId"));

      const res = await axiosInstance.post(
        endpoints.marketingModuleEndpoints.updateMessage,
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      console.log("UPDATE RESPONSE:", res.data);

      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: res.data.message,
        });
      }
    } catch (err) {
      console.log("UPDATE ERROR:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating message",
      });
    }

    setVisible(true);
    setLoading(false);
  };

  /* ================= CHECKBOX ================= */

  const handleCheckboxChange = (id) => {
    setSelectedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMessageChange = (id, value) => {
    setMessages((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCloseModal = () => {
    setVisible(false);

    if (success) window.location.reload();
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Notice Alert Management"
        description="Manage ticker and today's deal messages"
      />

      <PageCard>
        <form onSubmit={handleSubmit}>
          {/* USER SELECT */}

          <div className="flex justify-center gap-5 items-center mb-8">
            {/* CLIENT ID */}

            <div className="flex items-center gap-4">
              <label>Select User Id</label>

              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="capsSelect w-50 text-black"
              >
                <option value="">Select</option>

                {clientIds.map((id, index) => (
                  <option key={index} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>

            {/* USER TYPE */}

            <div className="flex items-center gap-4">
              <label>Select User Type</label>

              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="capsSelect w-60 text-black"
              >
                <option value="">Select</option>
                <option value="MD">Master Distributor</option>
                <option value="DS">Distributor</option>
                <option value="Agent">Agent</option>
              </select>
            </div>

            <button type="submit" className="capsButton">
              {loading ? "Loading..." : "Go"}
            </button>
          </div>

          {/* DATE */}

          {showAdditionalFields && (
            <div className="flex justify-center gap-10 mb-8">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="capsInput"
              />

              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="capsInput"
              />
            </div>
          )}

          {/* MESSAGE BLOCKS */}

          {showAdditionalFields &&
            [
              { id: 1, title: "Default Message", check: false },
              { id: 2, title: "Write New Message", check: true },
              { id: 3, title: "Today's Deal", check: false },
              { id: 4, title: "Write New Today's Deal", check: true },
            ].map(({ id, title, check }) => (
              <div key={id} className="mb-6 border rounded-lg overflow-hidden">
                <div className="capsColor relative text-center py-3 font-semibold">
                  {check && (
                    <input
                      type="checkbox"
                      className="absolute left-4 top-3"
                      checked={selectedMessages[id] || false}
                      onChange={() => handleCheckboxChange(id)}
                    />
                  )}

                  {title}
                </div>

                <div className="p-4 bg-gray-100">
                  <textarea
                    rows={3}
                    value={messages[id] || ""}
                    readOnly={!check}
                    onChange={(e) =>
                      check && handleMessageChange(id, e.target.value)
                    }
                    className="capsInput w-full"
                  />
                </div>
              </div>
            ))}

          {showAdditionalFields && (
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={handleUpdate}
                className="capsButton"
              >
                Update
              </button>
            </div>
          )}
        </form>
      </PageCard>

      
      
    </div>
  );
}
