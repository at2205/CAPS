"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      checked: false,
      offerName: "",
      cashbackAmount: "",
      activationDate: "",
      expirationDate: "",
      prefix: "",
      mainService: "",
      subService: "All",
      file: null,
      subServiceOptions: ["All"],
      maxExpirationDate: null,
    }))
  );

  const [mainServices, setMainServices] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchMainServices();
    const today = formatTodayDate();

    setCoupons((prev) =>
      prev.map((c) => ({
        ...c,
        activationDate: today,
      }))
    );
  }, []);

  const fetchMainServices = async () => {
    try {
      const res = await axios.get("/api/main-services");
      setMainServices(Array.isArray(res.data) ? res.data : []);
    } catch {
      setMainServices([]);
    }
  };

  const fetchSubServices = async (mainService, index) => {
    if (!mainService) return;

    try {
      const res = await axios.post("/api/sub-services", {
        service: mainService,
      });

      const list = Array.isArray(res.data) ? res.data : [];

      updateCoupon(index, {
        subServiceOptions: ["All", ...list],
        subService: "All",
      });
    } catch {
      updateCoupon(index, {
        subServiceOptions: ["All"],
        subService: "All",
      });
    }
  };

  const updateCoupon = (index, updates) => {
    setCoupons((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...updates } : c))
    );
  };

  const handleInputChange = (index, field, value) => {
    if (field === "prefix") value = value.toUpperCase();

    const updates = { [field]: value };

    if (field === "activationDate") {
      const max = new Date(value);
      max.setDate(max.getDate() + 30);
      updates.maxExpirationDate = max.toISOString().split("T")[0];
    }

    updateCoupon(index, updates);
  };

  const handleCheckboxChange = (index) => {
    updateCoupon(index, {
      checked: !coupons[index].checked,
    });
  };

  const handleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);

    setCoupons((prev) =>
      prev.map((c) => ({
        ...c,
        checked: newVal,
      }))
    );
  };

  const handleFileChange = (index, file) => {
    updateCoupon(index, { file });
  };

  const formatTodayDate = () =>
    new Date().toISOString().split("T")[0];

  const inputClass = "capsInput";

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Coupon Management"
        description="Create and manage promotional cashback coupons"
      />

      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-3 text-sm p-2 rounded-md text-center ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-[#e7f3f8]">
              <tr>
                <th className="p-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>S.N.</th>
                <th>Offer Name</th>
                <th>Cashback</th>
                <th>Activation</th>
                <th>Expiry</th>
                <th>Prefix</th>
                <th>Main Service</th>
                <th>Sub Service</th>
                <th>File</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={index} className="border-t">
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={coupon.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>

                  <td className="text-center">{index + 1}</td>

                  <td>
                    <input
                      className={inputClass}
                      value={coupon.offerName}
                      onChange={(e) =>
                        handleInputChange(index, "offerName", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className={inputClass}
                      value={coupon.cashbackAmount}
                      onChange={(e) =>
                        handleInputChange(index, "cashbackAmount", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="date"
                      className={inputClass}
                      value={coupon.activationDate}
                      min={formatTodayDate()}
                      onChange={(e) =>
                        handleInputChange(index, "activationDate", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="date"
                      className={inputClass}
                      value={coupon.expirationDate}
                      min={coupon.activationDate}
                      max={coupon.maxExpirationDate}
                      onChange={(e) =>
                        handleInputChange(index, "expirationDate", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      className={inputClass}
                      value={coupon.prefix}
                      onChange={(e) =>
                        handleInputChange(index, "prefix", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <select
                      className={inputClass}
                      value={coupon.mainService}
                      onChange={(e) => {
                        handleInputChange(index, "mainService", e.target.value);
                        fetchSubServices(e.target.value, index);
                      }}
                    >
                      <option value="">Select</option>
                      {mainServices.map((s, i) => (
                        <option key={i}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      className={inputClass}
                      value={coupon.subService}
                      onChange={(e) =>
                        handleInputChange(index, "subService", e.target.value)
                      }
                    >
                      {coupon.subServiceOptions.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      type="file"
                      className="text-xs"
                      onChange={(e) =>
                        handleFileChange(index, e.target.files[0])
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DOWNLOAD */}
        <div className="text-center mt-3">
          <a
            href="/templates/customerList.xlsx"
            className="text-blue-600 text-sm hover:underline"
          >
            Click To Download Excel Format
          </a>
        </div>

        {/* OTP SECTION */}
        <div className="flex justify-center gap-4 mt-5">
          <button className="capsButton min-w-[140px]">
            Send OTP
          </button>

          <button className="capsButtonSecondary min-w-[140px]">
            Reset
          </button>
        </div>

        {/* LOADER */}
        {loading && (
          <div className="text-center mt-3 text-sm text-gray-500 animate-pulse">
            Processing...
          </div>
        )}

      </PageCard>
    </div>
  );
};

export default CouponManagement;
