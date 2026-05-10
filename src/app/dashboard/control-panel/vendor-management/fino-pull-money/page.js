"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function FinoPullMoney() {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("0");
  const [formValues, setFormValues] = useState({});

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  // 🔥 GET BALANCE (PAGE LOAD)
  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    try {
      const payload = {
        userId: localStorage.getItem("userId"),
      };

      const res = await axiosInstance.post("/controlP/getFinoBalance", null, {
        params: {
          adminUserFormBean: JSON.stringify(payload),
        },
      });

      console.log("BALANCE RESPONSE =>", res.data);

      let data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      setBalance(data?.balance || data?.availableBalance || "0");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to fetch balance", "error");
    }
  };

  // INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 SUBMIT (PULL MONEY)
  const handleSubmit = async () => {
    if (!formValues?.amountToPull) {
      Swal.fire("Error", "Please enter amount", "error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        userId: localStorage.getItem("userId"),
        amount: formValues.amountToPull,
      };

      const res = await axiosInstance.post("/controlP/pullFinoBalance", null, {
        params: {
          adminUserFormBean: JSON.stringify(payload),
        },
      });

      console.log("SUBMIT RESPONSE =>", res.data);

      let data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      if (data?.status === "0") {
        Swal.fire({
          icon: "success",
          title: data?.message || "Success",
          confirmButtonColor: "#5fa0b5",
        });

        setFormValues({});
        getBalance();
      } else {
        Swal.fire("Error", data?.message || "Failed", "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "API failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormValues({});
  };

  const FieldRow = ({ label, children }) => (
    <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-3">
      <label className="text-right font-medium">{label}</label>
      <div className="text-center">:</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Fino Pull Money"
        description="Submit pull money request"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">
            {/* BALANCE */}
            <FieldRow label="Available Balance">
              <span className="font-semibold text-sm">₹ {balance}</span>
            </FieldRow>

            {/* AMOUNT */}
            <FieldRow label="Enter Amount To Pull">
              <input
                type="number"
                name="amountToPull"
                value={formValues?.amountToPull || ""}
                onChange={handleInputChange}
                className="capsInput"
                placeholder="Enter amount"
              />
            </FieldRow>

            {/* BUTTONS */}
            <div className="text-center mt-4 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                onClick={handleClear}
                className="capsButtonSecondary min-w-[140px]"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default FinoPullMoney;
