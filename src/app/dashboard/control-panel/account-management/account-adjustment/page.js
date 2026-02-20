"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setUpdateForm({ ...updateForm, [name]: value.replace(/\D/g, "") });
    } else {
      setUpdateForm({ ...updateForm, [name]: value });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (formData.UserType === "select" || !formData.RequestUserId.trim()) {
      alert("Please fill all fields");
      return;
    }

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
    setLoading(false);
  };

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

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Account Updated Successfully");
    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[850px] bg-white rounded-xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#4c95b3] to-[#3d89a6] text-white text-center font-bold text-lg py-3">
          Account Management
        </div>

        <div className="p-6">
          
          {/* FORM */}
          <div className="flex justify-center">
            <table className="w-[70%] mt-4">
              <tbody className="text-sm">

                <tr className="h-10">
                  <td className="text-right font-semibold w-[35%]">
                    User Type
                  </td>
                  <td className="w-[5%] text-center">:</td>
                  <td className="w-[60%]">
                    <select
                      name="UserType"
                      value={formData.UserType}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                    >
                      <option value="select">Select</option>
                      <option>Agent</option>
                      <option>Distributor</option>
                      <option>Master Distributor</option>
                      <option>AES API Partner</option>
                      <option>Portal</option>
                    </select>
                  </td>
                </tr>

                <tr className="h-10">
                  <td className="text-right font-semibold">User ID</td>
                  <td className="text-center">:</td>
                  <td>
                    <input
                      type="text"
                      name="RequestUserId"
                      value={formData.RequestUserId}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                    />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* SEARCH BUTTON */}
          <div className="text-center mt-6 mb-6">
            <button
              onClick={handleSearch}
              className="bg-[#4FA2C2] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#3d8daa] transition"
            >
              {loading ? "Searching..." : "Submit"}
            </button>
          </div>

          {/* ACCOUNT DETAILS */}
          {accountData && (
            <>
              <div className="bg-[#4FA2C2] text-white text-center font-bold py-1.5 rounded-xl text-sm">
                Account Details
              </div>

              <div className="flex justify-center">
                <table className="w-[70%] mt-4">
                  <tbody className="text-sm">

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
                      <td className="text-right font-semibold">Status</td>
                      <td className="text-center">:</td>
                      <td className="text-green-600">
                        {accountData.Status}
                      </td>
                    </tr>

                    <tr className="h-9">
                      <td className="text-right font-semibold">Balance</td>
                      <td className="text-center">:</td>
                      <td className="text-blue-600">
                        {accountData.AvilableBalance}
                      </td>
                    </tr>

                    <tr className="h-10">
                      <td className="text-right font-semibold">Service</td>
                      <td className="text-center">:</td>
                      <td>
                        <select
                          name="service"
                          value={updateForm.service}
                          onChange={handleUpdateInputChange}
                          className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                        >
                          <option value="select">Select Service</option>
                          {serviceList.map((service, i) => (
                            <option key={i} value={service.Service_Name}>
                              {service.Service_Name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    <tr className="h-10">
                      <td className="text-right font-semibold">
                        Action Type
                      </td>
                      <td className="text-center">:</td>
                      <td>
                        <select
                          name="actionType"
                          value={updateForm.actionType}
                          onChange={handleUpdateInputChange}
                          className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                        >
                          <option value="select">Select</option>
                          <option value="credit">Credit</option>
                          <option value="debit">Debit</option>
                        </select>
                      </td>
                    </tr>

                    <tr className="h-10">
                      <td className="text-right font-semibold">Amount</td>
                      <td className="text-center">:</td>
                      <td>
                        <input
                          type="text"
                          name="amount"
                          value={updateForm.amount}
                          onChange={handleUpdateInputChange}
                          className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
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
                          className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
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
                          className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4FA2C2]"
                        />
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* UPDATE BUTTON */}
              <div className="text-center mt-5">
                <button
                  onClick={handleUpdateSubmit}
                  className="bg-[#4FA2C2] text-white text-sm px-6 py-1.5 rounded-md hover:bg-[#3d8daa] transition"
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

export default AccountManagement;
