"use client";

import React, { useState } from "react";

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

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[850px] bg-white rounded-xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#4c95b3] to-[#3d89a6] text-white text-center font-bold text-lg py-3">
          Bulk Refund Transaction Process
        </div>

        <div className="p-6">

          {/* MESSAGE */}
          {message && (
            <div className="bg-blue-100 text-blue-700 text-sm text-center px-3 py-2 rounded-md mb-4">
              {message}
            </div>
          )}

          <form onSubmit={submitForm}>
            <div className="flex justify-center">
              <table className="w-[70%] mt-4 text-sm">
                <tbody>

                  <tr className="h-10">
                    <td className="text-right font-semibold w-[35%]">
                      Service
                    </td>
                    <td className="text-center w-[5%]">:</td>
                    <td className="w-[60%]">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                      >
                        <option value="select">----select services----</option>
                        <option value="Channel-Refund">Channel Refund</option>
                        <option value="DMR-MYRemit">DMR-MYRemit</option>
                        <option value="DMR-ARemit">DMR-ARemit</option>
                      </select>
                    </td>
                  </tr>

                  <tr className="h-10">
                    <td className="text-right font-semibold">
                      Action
                    </td>
                    <td className="text-center">:</td>
                    <td>
                      <select
                        name="actionType"
                        value={formData.actionType}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                      >
                        <option value="SuccessRefund">Success Refund</option>
                        <option value="Refund">Refund</option>
                        <option value="Success">Success</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-right font-semibold align-top pt-2">
                      Transaction IDs
                    </td>
                    <td className="text-center align-top pt-2">:</td>
                    <td>
                      <textarea
                        name="Tran_id"
                        value={formData.Tran_id}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Use comma separated transaction IDs"
                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                      />
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-4 mb-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4FA2C2] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#3d8daa] transition disabled:opacity-50 mr-2"
              >
                {loading ? "Processing..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="bg-gray-500 text-white text-sm px-5 py-1.5 rounded-md hover:bg-gray-600 transition disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>

          {/* RESULTS */}
          {listofStatus && (
            <>
              <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm">
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
              <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm mt-5">
                Individual Update
              </div>

              <div className="text-center mt-4">

                <div className="flex justify-center items-center gap-2 mb-3 text-sm">
                  <input
                    type="checkbox"
                    checked={checkstatus}
                    onChange={(e) => setCheckstatus(e.target.checked)}
                    disabled={loading}
                    className="accent-[#4FA2C2]"
                  />
                  <label>Check to enable update</label>
                </div>

                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  disabled={!checkstatus || loading}
                  className="w-1/2 border rounded-md px-2 py-1 text-sm mb-3 disabled:bg-gray-100"
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
                    className="bg-green-600 text-white text-sm px-5 py-1.5 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Transaction"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkRefundTransaction;
