"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const AccountManagement = () => {
  const [formData, setFormData] = useState({
    UserType: "select",
    RequestUserId: "",
  });

  const [accountData, setAccountData] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [updateForm, setUpdateForm] = useState({
    service: "select",
    actionType: "select",
    amount: "",
    internalRemark: "",
    externalRemark: "",
  });

  /* ================= MOCK SERVICES ================= */
  useEffect(() => {
    const mockServices = [
      { Service_Name: "Mobile Recharge" },
      { Service_Name: "DTH Recharge" },
      { Service_Name: "Electricity Bill" },
      { Service_Name: "Water Bill" },
      { Service_Name: "Gas Bill" },
    ];
    setServiceList(mockServices);
  }, []);

  /* ================= INPUT HANDLERS ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      setUpdateForm((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ""),
      }));
    } else {
      setUpdateForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ================= SEARCH ================= */
  const handleSearch = async (e) => {
    e.preventDefault();

    if (formData.UserType === "select" || !formData.RequestUserId.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockAccountData = {
        agencyName: "ABC Corporation Pvt. Ltd.",
        Name: "John Smith",
        Status: "Active",
        AvilableBalance: "₹ 15,250.00",
        mobileNo: "9876543210",
        userId: "USER001",
      };

      setAccountData(mockAccountData);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdateSubmit = async () => {
    if (
      updateForm.service === "select" ||
      updateForm.actionType === "select" ||
      !updateForm.amount ||
      !updateForm.internalRemark ||
      !updateForm.externalRemark
    ) {
      alert("Please fill all update fields");
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      alert("Account Updated Successfully");

      setUpdateForm({
        service: "select",
        actionType: "select",
        amount: "",
        internalRemark: "",
        externalRemark: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#4fa2c2] outline-none";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[220px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="Customer Care Module > Account Management"
        description="Search and manage user account balance"
      />

      <PageCard>

        {/* ================= SEARCH FORM ================= */}
        <form onSubmit={handleSearch}>

          <Row label="User Type :">
            <select
              name="UserType"
              value={formData.UserType}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="select">Select</option>
              <option>Agent</option>
              <option>Distributor</option>
              <option>Master Distributor</option>
              <option>AES API Partner</option>
              <option>Portal</option>
            </select>
          </Row>

          <Row label="User ID :">
            <input
              name="RequestUserId"
              value={formData.RequestUserId}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Enter User ID"
            />
          </Row>

          <div className="text-center mt-4">
            <button type="submit" className="capsButton px-8">
              {loading ? "Searching..." : "Submit"}
            </button>
          </div>

        </form>

        {/* ================= ACCOUNT DETAILS ================= */}
        {accountData && (
          <>
            <div className="bg-[#4fa2c2] text-white font-semibold px-3 py-1.5 rounded-md mt-6 mb-4 text-sm">
              Account Details
            </div>

            <Row label="Corporate Name :">
              <div className="text-sm">{accountData.agencyName}</div>
            </Row>

            <Row label="Authorised Person :">
              <div className="text-sm">{accountData.Name}</div>
            </Row>

            <Row label="Status :">
              <div className="text-green-600 font-semibold">
                {accountData.Status}
              </div>
            </Row>

            <Row label="Balance :">
              <div className="text-blue-600 font-semibold">
                {accountData.AvilableBalance}
              </div>
            </Row>

            <Row label="Service :">
              <select
                name="service"
                value={updateForm.service}
                onChange={handleUpdateInputChange}
                className={inputClass}
              >
                <option value="select">Select Service</option>
                {serviceList.map((service, i) => (
                  <option key={i} value={service.Service_Name}>
                    {service.Service_Name}
                  </option>
                ))}
              </select>
            </Row>

            <Row label="Action Type :">
              <select
                name="actionType"
                value={updateForm.actionType}
                onChange={handleUpdateInputChange}
                className={inputClass}
              >
                <option value="select">Select</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </Row>

            <Row label="Amount :">
              <input
                name="amount"
                value={updateForm.amount}
                onChange={handleUpdateInputChange}
                className={inputClass}
                placeholder="Enter Amount"
              />
            </Row>

            <Row label="Internal Remark :">
              <input
                name="internalRemark"
                value={updateForm.internalRemark}
                onChange={handleUpdateInputChange}
                className={inputClass}
              />
            </Row>

            <Row label="External Remark :">
              <input
                name="externalRemark"
                value={updateForm.externalRemark}
                onChange={handleUpdateInputChange}
                className={inputClass}
              />
            </Row>

            <div className="text-center mt-4">
              <button
                onClick={handleUpdateSubmit}
                type="button"
                className="capsButtonSuccess px-8"
              >
                {loading ? "Updating..." : "Submit"}
              </button>
            </div>
          </>
        )}

      </PageCard>
    </div>
  );
};

export default AccountManagement;
