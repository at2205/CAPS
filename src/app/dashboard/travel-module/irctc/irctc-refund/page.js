"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axios from "axios";
import Swal from "sweetalert2";

function IrctcRefundRequest() {
  const [agentId, setAgentId] = useState("");
  const [cancelId, setCancelId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SEARCH =================
  const handleSubmit = async () => {
    if (!agentId) {
      Swal.fire("Error", "Agent ID required", "error");
      return;
    }

    if (!cancelId) {
      Swal.fire("Error", "Cancellation ID required", "error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        agentId,
        cancellationId: cancelId,
      };

      const res = await axios.post("/api/refund/search", payload);

      const data = res.data;

      if (data.status === "00") {
        setTableData(data.list || []);
        setMessage("");
      } else {
        setTableData([]);
        setMessage(data.message || "No data found");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= REFUND =================
  const handleRefund = async (item) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to refund?",
        icon: "warning",
        showCancelButton: true,
      });

      if (!confirm.isConfirmed) return;

      const payload = {
        agentId: item.agentId,
        cancellationId: item.cancellationId,
      };

      const res = await axios.post("/api/refund/process", payload);

      if (res.data.status === "00") {
        Swal.fire("Success", res.data.message, "success");
        handleSubmit(); // reload
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Refund failed", "error");
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard title="IRCTC Refund Request" />

      <PageCard>
        {/* ================= FORM ================= */}
        <div className="flex justify-center">
          <div className="w-[500px] space-y-4">
            {/* AGENT ID */}
            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">Agent ID</label>
              <span>:</span>
              <input
                className="capsInput"
                placeholder="Enter agent id / name"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />
            </div>

            {/* CANCEL ID */}
            <div className="grid grid-cols-[200px_10px_1fr]">
              <label className="text-right">Cancellation ID</label>
              <span>:</span>
              <input
                className="capsInput"
                placeholder="Cancellation ID"
                value={cancelId}
                onChange={(e) => setCancelId(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button onClick={handleSubmit} className="capsButton px-10">
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= MESSAGE ================= */}
        {message && (
          <div className="mt-4 text-center font-semibold text-red-500">
            {message}
          </div>
        )}

        {/* ================= TABLE ================= */}
        {tableData.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border border-[#226b88] text-sm text-center">
              <thead className="bg-[#226b88] text-white">
                <tr>
                  <th className="border p-2">S.NO</th>
                  <th className="border p-2">Agent ID</th>
                  <th className="border p-2">Mobile</th>
                  <th className="border p-2">Transaction ID</th>
                  <th className="border p-2">PNR</th>
                  <th className="border p-2">Cancellation ID</th>
                  <th className="border p-2">Collected</th>
                  <th className="border p-2">Deducted</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Passenger</th>
                  <th className="border p-2">No. Pax</th>
                  <th className="border p-2">Refund</th>
                  <th className="border p-2">Cancel Date</th>
                  <th className="border p-2">OTP</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, i) => (
                  <tr key={i} className="hover:bg-[#f5fbfd]">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{item.agentId}</td>
                    <td className="border p-2">{item.mobileNo}</td>
                    <td className="border p-2">{item.transactionId}</td>
                    <td className="border p-2">{item.pnrNo}</td>
                    <td className="border p-2">{item.cancellationId}</td>
                    <td className="border p-2">{item.amountCollected}</td>
                    <td className="border p-2">{item.amountDeducted}</td>
                    <td className="border p-2 font-semibold">{item.status1}</td>
                    <td className="border p-2">{item.passengerName}</td>
                    <td className="border p-2">{item.noOfPassenger}</td>
                    <td className="border p-2">{item.refundAmount}</td>
                    <td className="border p-2">{item.cancelDate}</td>
                    <td className="border p-2">{item.otpVerified}</td>

                    {/* ACTION */}
                    <td className="border p-2">
                      {item.status1?.toLowerCase() === "cancel" &&
                        item.otpVerified?.toLowerCase() === "true" && (
                          <button
                            onClick={() => handleRefund(item)}
                            className="px-3 py-1 border border-[#226b88] text-[#226b88] rounded hover:bg-[#226b88] hover:text-white"
                          >
                            Refund
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageCard>
    </div>
  );
}

export default IrctcRefundRequest;
