"use client";

import { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

export default function UserForm() {

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientIds, setClientIds] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState({});
  const [messages, setMessages] = useState({});

  const today = new Date().toISOString().split("T")[0];
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  useEffect(() => {
    const fetchClientIds = async () => {
      try {
        const response = await fetch(
          "http://localhost:8281/noticeAlert/clientDetails"
        );
        const data = await response.json();
        if (data?.data) {
          const clientIdList = data.data.map((c) => c.clientId);
          setClientIds(clientIdList);
        }
      } catch (err) {
        setError("Error fetching client IDs");
        setVisible(true);
      }
    };
    fetchClientIds();
  }, []);

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!userId) {
      setError("Please select User Id.");
      setVisible(true);
      setLoading(false);
      return;
    }

    if (!userType) {
      setError("Please select User Type.");
      setVisible(true);
      setLoading(false);
      return;
    }

    try {
      const apiUrl = `http://localhost:8281/noticeAlert/message?id=${userId}&userType=${userType}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== "success") throw new Error();

      setMessages({
        1: data.data.ticker || "",
        3: data.data.deal || "",
      });

      setShowAdditionalFields(true);
    } catch {
      setError("Error fetching messages.");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLE UPDATE ================= */
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new URLSearchParams();
      formData.append("id", userId);
      formData.append("userType", userType);
      formData.append("tickerMessage", messages[2] || "");
      formData.append("dealMessage", messages[4] || "");

      const response = await fetch(
        "http://localhost:8281/noticeAlert/updateMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json();

      if (data.status !== "success") throw new Error();

      setSuccess(data.message || "Message updated successfully.");
    } catch {
      setError("Error updating message.");
    } finally {
      setVisible(true);
      setLoading(false);
    }
  };

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

      {/* 🔵 HEADER CARD */}
      <CapsCard
        title="Notice Alert Management"
        description="Manage ticker and today's deal messages"
      />

      {/* ⚪ FORM CARD */}
      <PageCard>

        <form onSubmit={handleSubmit}>

          {/* Top Section */}
          <div className="flex justify-center gap-5 items-center mb-8">

            <div className="flex items-center gap-4">
              <label>Select User Id</label>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="capsSelect w-50"
              >
                <option value="">Select</option>
                <option value="all">All</option>
                {clientIds.map((id) => (
                  <option key={id}>{id}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label>Select User Type</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="capsSelect w-60"
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

          {/* Date Section */}
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

          {/* Messages */}
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

          {/* Update Button */}
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

      {/* Modal */}
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              {error ? "Error" : "Success"}
            </h3>
            <p className={success ? "text-green-600" : "text-red-600"}>
              {success || error}
            </p>
            <div className="text-right mt-4">
              <button onClick={handleCloseModal} className="capsButton">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
