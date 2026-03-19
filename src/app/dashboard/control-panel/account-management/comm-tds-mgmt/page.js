"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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

  const handleSearch = async (e) => {
    e.preventDefault();

    if (formData.UserType === "select") {
      alert("Please choose correct user type");
      return;
    }

    if (!formData.RequestUserId.trim()) {
      alert("Please enter user ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setAccountData(null);

    setTimeout(() => {
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
      setLoading(false);
    }, 1000);
  };

  const handleUpdateSubmit = () => {
    if (updateForm.actionOn === "select") {
      alert("Please choose any action");
      return;
    }

    if (!updateForm.amount) {
      alert("Please enter Amount");
      return;
    }

    if (!updateForm.internalRemark.trim()) {
      alert("Please insert Internal Remark");
      return;
    }

    if (!updateForm.externalRemark.trim()) {
      alert("Please insert External Remark");
      return;
    }

    alert("Commission/TDS adjustment completed successfully!");
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
    "Agent",
    "Distributor",
    "Master Distributor",
    "AES API Partner",
    "Portal",
  ];

  const actionOnOptions = ["Commission", "TDS"];

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > Commission / TDS Management"
        description="Adjust commission or TDS for users"
      />

      <PageCard>
        {message && (
          <p className="text-center text-sm font-semibold text-green-600 mb-3">
            {message}
          </p>
        )}

        <form onSubmit={handleSearch}>
          <div className="flex justify-center">
            <div className="w-[520px] space-y-4">

              {/* User Type */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  User Type
                </label>
                <div className="text-center">:</div>

                <select
                  name="UserType"
                  value={formData.UserType}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="select">Select</option>
                  {userTypeOptions.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* User ID */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  User ID
                </label>
                <div className="text-center">:</div>

                <input
                  type="text"
                  name="RequestUserId"
                  value={formData.RequestUserId}
                  onChange={handleInputChange}
                  className="capsInput"
                />
              </div>

              {/* Buttons */}
              <div className="text-center pt-2 space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="capsButton px-8"
                >
                  {loading ? "Searching..." : "SUBMIT"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={loading}
                  className="capsButtonSecondary px-6"
                >
                  CLEAR
                </button>
              </div>

            </div>
          </div>
        </form>

        {/* Account Details */}
        {accountData && (
          <div className="pt-6 flex justify-center">
            <div className="w-[620px] space-y-4">

              <div className="text-center font-semibold border-b pb-2">
                Account Details
              </div>

              {[
                ["Corporate Name", accountData.agencyName],
                ["Authorised Person", accountData.Name],
                ["Status", accountData.Status],
                ["Balance", accountData.AvilableBalance],
                ["Registered Mobile", accountData.mobileNo],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[200px_10px_1fr] items-center"
                >
                  <label className="text-sm font-semibold text-right">
                    {label}
                  </label>
                  <div className="text-center">:</div>
                  <div className="text-sm">{value}</div>
                </div>
              ))}

              {/* Action On */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Action On
                </label>
                <div className="text-center">:</div>

                <select
                  name="actionOn"
                  value={updateForm.actionOn}
                  onChange={handleUpdateInputChange}
                  className="capsInput"
                >
                  <option value="select">Select</option>
                  {actionOnOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Amount
                </label>
                <div className="text-center">:</div>

                <input
                  type="text"
                  name="amount"
                  value={updateForm.amount}
                  onChange={handleUpdateInputChange}
                  className="capsInput"
                />
              </div>

              {/* Internal Remark */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Internal Remark
                </label>
                <div className="text-center">:</div>

                <input
                  type="text"
                  name="internalRemark"
                  value={updateForm.internalRemark}
                  onChange={handleUpdateInputChange}
                  className="capsInput"
                />
              </div>

              {/* External Remark */}
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  External Remark
                </label>
                <div className="text-center">:</div>

                <input
                  type="text"
                  name="externalRemark"
                  value={updateForm.externalRemark}
                  onChange={handleUpdateInputChange}
                  className="capsInput"
                />
              </div>

              {/* Update Button */}
              <div className="text-center pt-3">
                <button
                  onClick={handleUpdateSubmit}
                  className="capsButton px-10"
                >
                  SUBMIT
                </button>
              </div>

            </div>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default CommissionTDSManagement;
