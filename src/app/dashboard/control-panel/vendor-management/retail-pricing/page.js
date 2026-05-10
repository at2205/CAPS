"use client";
import React, { useState, useRef, useEffect } from "react";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function RetailPricing() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const clientIdRef = useRef(null);
  const [mdsList, setMdsList] = useState([]);

  const [formValues, setFormValues] = useState({
    clientId: "",
    mdsId: "",
    category: "Postpaid",
    mainService: "",
    pipe: "",
  });

  // 🔥 FIXED API CALL
  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append("jsonData", JSON.stringify({}));

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoints.marketingModuleEndpoints.getPGUserLimitData}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data);

        const list =
          data?.data?.userList ||
          data?.data ||
          data?.responseData ||
          data?.userList ||
          [];

        setMdsList(list);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "clientId") {
      const numericValue = value.replace(/[^0-9]/g, "");

      setFormValues((prev) => ({
        ...prev,
        clientId: numericValue,
      }));

      setTimeout(() => {
        clientIdRef.current?.focus();
      }, 0);

      return;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formValues.clientId ||
      !formValues.mdsId ||
      !formValues.mainService ||
      !formValues.pipe
    ) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    setTimeout(() => {
      setLoading(false);
      setSuccess("Retail pricing details submitted successfully");
    }, 1000);
  };

  const handleClear = () => {
    setFormValues({
      clientId: "",
      mdsId: "",
      category: "Postpaid",
      mainService: "",
      pipe: "",
    });
    setSuccess("");
    setError("");
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
        title="Retail Pricing"
        description="Configure retail pricing details"
      />

      <PageCard>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-center">
            <div className="w-[520px]">
              <FieldRow label="Client ID">
                <input
                  ref={clientIdRef}
                  type="text"
                  inputMode="numeric"
                  name="clientId"
                  value={formValues.clientId}
                  onChange={handleInputChange}
                  className="capsInput"
                />
              </FieldRow>

              {/* 🔥 MDS FIXED */}
              <FieldRow label="MDS ID">
                <select
                  name="mdsId"
                  value={formValues.mdsId}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">--Select--</option>

                  {mdsList.map((item, index) => (
                    <option key={index} value={item.userId || item.mdsId}>
                      {item.userName || item.mdsId || item.userId}
                    </option>
                  ))}
                </select>
              </FieldRow>

              {/* बाकी same */}
              <FieldRow label="Category">
                <select
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="Postpaid">Postpaid</option>
                </select>
              </FieldRow>

              <FieldRow label="Main Service">
                <select
                  name="mainService"
                  value={formValues.mainService}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">--Select--</option>
                  <option value="AEPS">AEPS</option>
                  <option value="Micro ATM">Micro ATM</option>
                </select>
              </FieldRow>

              <FieldRow label="Pipe">
                <select
                  name="pipe"
                  value={formValues.pipe}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">--Select--</option>
                  <option value="FINO">Fino Bank</option>
                  <option value="Fino Smart">FinoSmart Bank</option>
                  <option value="Fingpay">Fingpay</option>
                  <option value="Yes Bank">Yes Bank</option>
                  <option value="Airtel Bank">Airtel Bank</option>
                  <option value="IserveU">IserveU</option>
                </select>
              </FieldRow>

              <div className="text-center mt-4 flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="capsButton"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="capsButtonSecondary"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </PageCard>
    </div>
  );
}

export default RetailPricing;
