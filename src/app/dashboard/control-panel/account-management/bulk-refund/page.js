"use client";

import React, { useState } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const BulkRefundTransaction = () => {
  const [formData, setFormData] = useState({
    service: "select",
    actionType: "SuccessRefund",
    Tran_id: "",
  });

  const [listofStatus, setListofStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [checkstatus, setCheckstatus] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("selected");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateSearchForm = () => {
    const { service, Tran_id } = formData;

    if (service === "select") {
      alert("Please select service");
      return false;
    }

    if (!Tran_id.trim()) {
      alert("Please enter the transaction Id");
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateSearchForm()) return;

    try {
      setLoading(true);
      setMessage("");

      const transactionIds = formData.Tran_id
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockResponse = {};
      transactionIds.forEach((id) => {
        mockResponse[id] = `Updated - ${formData.actionType}`;
      });

      setListofStatus(mockResponse);
      setMessage("Bulk update processed successfully!");
    } catch (error) {
      setMessage("Error processing bulk update.");
    } finally {
      setLoading(false);
    }
  };

  const validateUpdateForm = () => {
    if (!checkstatus) {
      alert("Please check checkbox for this action");
      return false;
    }

    if (updatedStatus === "selected") {
      alert("Please select Action to be taken");
      return false;
    }

    return true;
  };

  const updateTran = async (tran_Id, e) => {
    e.preventDefault();
    if (!validateUpdateForm()) return;

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setListofStatus((prev) => ({
        ...prev,
        [tran_Id]: updatedStatus,
      }));

      setCheckstatus(false);
      setUpdatedStatus("selected");
      setMessage(`Transaction ${tran_Id} updated to ${updatedStatus}`);
    } catch (error) {
      alert("Error updating transaction.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      service: "select",
      actionType: "SuccessRefund",
      Tran_id: "",
    });
    setListofStatus(null);
    setMessage("");
    setCheckstatus(false);
    setUpdatedStatus("selected");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-start justify-center mb-3">
      <label className="w-[220px] text-right text-sm font-semibold pt-1">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module > Bulk Refund Transaction Process"
        description="Bulk update refund / success transactions"
      />

      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm text-center px-3 py-2 rounded-md mb-4">
            {message}
          </div>
        )}

        <form onSubmit={submitForm}>

          <Row label="Service :">
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="select">----select services----</option>
              <option value="Channel-Refund">Channel Refund</option>
              <option value="DMR-MYRemit">DMR-MYRemit</option>
              <option value="DMR-ARemit">DMR-ARemit</option>
            </select>
          </Row>

          <Row label="Action :">
            <select
              name="actionType"
              value={formData.actionType}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="SuccessRefund">Success Refund</option>
              <option value="Refund">Refund</option>
              <option value="Success">Success</option>
            </select>
          </Row>

          <Row label="Transaction IDs :">
            <textarea
              name="Tran_id"
              value={formData.Tran_id}
              onChange={handleInputChange}
              rows="3"
              placeholder="Use comma separated transaction IDs"
              className={inputClass}
            />
          </Row>

          <div className="text-center mt-4 space-x-3">
            <button type="submit" disabled={loading} className="capsButton px-8">
              {loading ? "Processing..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="capsButtonSecondary px-8"
            >
              Clear
            </button>
          </div>

        </form>

        {/* RESULTS */}
        {listofStatus && (
          <>
            <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm mt-6">
              Transaction Results
            </div>

            <table className="w-full mt-3 border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Transaction Id</th>
                  <th className="border px-2 py-1">Updated Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(listofStatus).map(([id, status], index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{id}</td>
                    <td className="border px-2 py-1">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* INDIVIDUAL UPDATE */}
            <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm mt-6">
              Individual Update
            </div>

            <div className="text-center mt-4">

              <div className="flex justify-center items-center gap-2 mb-3 text-sm">
                <input
                  type="checkbox"
                  checked={checkstatus}
                  onChange={(e) => setCheckstatus(e.target.checked)}
                  disabled={loading}
                />
                <label>Check to enable update</label>
              </div>

              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                disabled={!checkstatus || loading}
                className="w-[260px] border border-gray-300 rounded-md px-3 py-1.5 text-sm mb-3 disabled:bg-gray-100"
              >
                <option value="selected">Select Action</option>
                <option value="Refund">Refund</option>
                <option value="Success">Success</option>
                <option value="SuccessRefund">Success Refund</option>
              </select>

              <div>
                <button
                  disabled={!checkstatus || loading}
                  onClick={(e) => {
                    const firstTranId = Object.keys(listofStatus)[0];
                    updateTran(firstTranId, e);
                  }}
                  className="capsButton px-8"
                >
                  {loading ? "Updating..." : "Update Transaction"}
                </button>
              </div>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default BulkRefundTransaction;
