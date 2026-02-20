"use client";

import React, { useState } from "react";
import axios from "axios";

const CommissionTDSManagement = () => {
  const [formData, setFormData] = useState({
    UserType: "select",
    RequestUserId: "",
  });

  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [updateForm, setUpdateForm] = useState({
    actionOn: "select",
    amount: "",
    internalRemark: "",
    externalRemark: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const sanitizedValue = value.replace(/\D/g, "");
      setUpdateForm({ ...updateForm, [name]: sanitizedValue });
    } else {
      setUpdateForm({ ...updateForm, [name]: value });
    }
  };

  const validateSearchForm = () => {
    if (formData.UserType === "select") {
      alert("Please choose correct user type");
      return false;
    }

    if (!formData.RequestUserId.trim()) {
      alert("Please enter user ID");
      return false;
    }

    return true;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!validateSearchForm()) return;

    try {
      setLoading(true);
      setMessage("");
      setAccountData(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockAccountData = {
        agencyName: "XYZ Enterprises Ltd.",
        Name: "Michael Johnson",
        Status: "Active",
        AvilableBalance: "₹ 8,750.50",
        mobileNo: "9876543210",
        userId: "USER002",
      };

      setAccountData(mockAccountData);
      setMessage("Account details loaded successfully");

      setUpdateForm({
        actionOn: "select",
        amount: "",
        internalRemark: "",
        externalRemark: "",
      });
    } catch (error) {
      console.error("Error fetching account details:", error);
      setMessage("Error fetching account details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateUpdateForm = () => {
    const { actionOn, amount, internalRemark, externalRemark } = updateForm;

    if (actionOn === "select") {
      alert("Please choose any action");
      return false;
    }

    if (!internalRemark.trim()) {
      alert("Please insert Internal Remark");
      return false;
    }

    if (!externalRemark.trim()) {
      alert("Please insert External Remark");
      return false;
    }

    if (!amount.trim()) {
      alert("Please enter Amount");
      return false;
    }

    if (isNaN(amount) || parseFloat(amount) < 0) {
      alert("Please enter a valid positive number for amount");
      return false;
    }

    return true;
  };

  const handleUpdateSubmit = async () => {
    if (!validateUpdateForm()) return;

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Commission/TDS adjustment completed successfully!");
      setMessage("Commission/TDS adjustment completed successfully");

      await handleSearch({ preventDefault: () => {} });

      setUpdateForm({
        actionOn: "select",
        amount: "",
        internalRemark: "",
        externalRemark: "",
      });
    } catch (error) {
      console.error("Error updating commission/TDS:", error);
      alert("Error updating commission/TDS. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      UserType: "select",
      RequestUserId: "",
    });
    setAccountData(null);
    setMessage("");
    setUpdateForm({
      actionOn: "select",
      amount: "",
      internalRemark: "",
      externalRemark: "",
    });
  };

  const userTypeOptions = [
    { value: "select", label: "Select" },
    { value: "Agent", label: "Agent" },
    { value: "Distributor", label: "Distributor" },
    { value: "Master Distributor", label: "Master Distributor" },
    { value: "AES API Partner", label: "AES API Partner" },
    { value: "Portal", label: "Portal" },
  ];

  const actionOnOptions = [
    { value: "select", label: "Select Action Type" },
    { value: "Commision", label: "Commission" },
    { value: "TDS", label: "TDS" },
  ];

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[850px] bg-white rounded-xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#4c95b3] to-[#3d89a6] text-white text-center font-bold text-lg py-3">
          Commission / TDS Management
        </div>

        <div className="p-6">

          {/* MESSAGE */}
          {message && (
            <div className="bg-blue-100 text-blue-700 text-sm text-center px-3 py-2 rounded-md mb-4">
              {message}
            </div>
          )}

          {/* SEARCH FORM */}
          <div className="flex justify-center">
            <table className="w-[70%] mt-4 text-sm">
              <tbody>

                <tr className="h-10">
                  <td className="text-right font-semibold w-[35%]">
                    User Type
                  </td>
                  <td className="text-center w-[5%]">:</td>
                  <td className="w-[60%]">
                    <select
                      name="UserType"
                      value={formData.UserType}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                    >
                      {userTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr className="h-10">
                  <td className="text-right font-semibold">
                    User ID
                  </td>
                  <td className="text-center">:</td>
                  <td>
                    <input
                      type="text"
                      name="RequestUserId"
                      value={formData.RequestUserId}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                    />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* SEARCH BUTTONS */}
          <div className="text-center mt-5 mb-5">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#4FA2C2] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#3d8daa] transition disabled:opacity-50 mr-2"
            >
              {loading ? "Searching..." : "Submit"}
            </button>

            <button
              onClick={handleClear}
              disabled={loading}
              className="bg-gray-500 text-white text-sm px-5 py-1.5 rounded-md hover:bg-gray-600 transition disabled:opacity-50"
            >
              Clear
            </button>
          </div>

          {/* ACCOUNT DETAILS */}
          {accountData && (
            <>
              <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm">
                Account Details
              </div>

              <div className="flex justify-center">
                <table className="w-[70%] mt-4 text-sm">
                  <tbody>

                    <tr className="h-9">
                      <td className="text-right font-semibold w-[35%]">
                        Corporate Name
                      </td>
                      <td className="text-center w-[5%]">:</td>
                      <td>{accountData.agencyName}</td>
                    </tr>

                    <tr className="h-9">
                      <td className="text-right font-semibold">
                        Authorised Person
                      </td>
                      <td className="text-center">:</td>
                      <td>{accountData.Name}</td>
                    </tr>

                    <tr className="h-9">
                      <td className="text-right font-semibold">
                        Status
                      </td>
                      <td className="text-center">:</td>
                      <td className="text-green-600 font-medium">
                        {accountData.Status}
                      </td>
                    </tr>

                    <tr className="h-9">
                      <td className="text-right font-semibold">
                        Balance
                      </td>
                      <td className="text-center">:</td>
                      <td className="text-blue-600 font-medium">
                        {accountData.AvilableBalance}
                      </td>
                    </tr>

                    <tr className="h-9">
                      <td className="text-right font-semibold">
                        Registered Mobile
                      </td>
                      <td className="text-center">:</td>
                      <td>{accountData.mobileNo}</td>
                    </tr>

                    <tr className="h-10">
                      <td className="text-right font-semibold">
                        Action On
                      </td>
                      <td className="text-center">:</td>
                      <td>
                        <select
                          name="actionOn"
                          value={updateForm.actionOn}
                          onChange={handleUpdateInputChange}
                          className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                        >
                          {actionOnOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    <tr className="h-10">
                      <td className="text-right font-semibold">
                        Amount
                      </td>
                      <td className="text-center">:</td>
                      <td>
                        <input
                          type="text"
                          name="amount"
                          value={updateForm.amount}
                          onChange={handleUpdateInputChange}
                          className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                        />
                      </td>
                    </tr>

                    <tr className="h-10">
                      <td className="text-right font-semibold">
                        Internal Remark
                      </td>
                      <td className="text-center">:</td>
                      <td>
                        <input
                          type="text"
                          name="internalRemark"
                          value={updateForm.internalRemark}
                          onChange={handleUpdateInputChange}
                          className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                        />
                      </td>
                    </tr>

                    <tr className="h-10">
                      <td className="text-right font-semibold">
                        External Remark
                      </td>
                      <td className="text-center">:</td>
                      <td>
                        <input
                          type="text"
                          name="externalRemark"
                          value={updateForm.externalRemark}
                          onChange={handleUpdateInputChange}
                          className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                        />
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* UPDATE BUTTON */}
              <div className="text-center mt-4">
                <button
                  onClick={handleUpdateSubmit}
                  disabled={loading}
                  className="bg-[#4FA2C2] text-white text-sm px-6 py-1.5 rounded-md hover:bg-[#3d8daa] transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommissionTDSManagement;
