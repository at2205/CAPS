"use client";
import React, { useEffect, useState } from "react";

function ServiceManage() {
  const [message, setMessage] = useState("");
  const [egenList, setEgenList] = useState([]);

  const [service, setService] = useState("select");
  const [subService, setSubService] = useState("select");

  useEffect(() => {
    fetch("/api/getEgenIdDetails")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEgenList(data);
        }
      });
  }, []);

  const GO = () => {
    alert("Go Clicked");
  };

  const selectClass =
    "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const primaryBtn =
    "px-5 py-1.5 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90";

  const Row = ({ label, children }) => (
    <div className="flex items-center mb-3">
      <label className="w-[180px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[280px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-[900px] rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-lg rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Control Panel &gt; Service Manage
        </div>

        {/* BODY */}
        <div className="px-6 py-5">

          {/* MESSAGE */}
          {message && (
            <div className="text-center mb-3 text-green-600 font-semibold">
              {message}
            </div>
          )}

          <div className="flex flex-col items-center">

            {/* USER */}
            <Row label="Select User :">
              <select className={selectClass}>
                <option value="select">Select</option>
                <option value="All">All</option>

                {egenList.map((item, i) => (
                  <option key={i} value={item.corporateAgentId}>
                    API{item.corporateAgentId} -- {item.companyName}
                  </option>
                ))}
              </select>
            </Row>

            {/* SERVICE */}
            <Row label="Select Service :">
              <select
                className={selectClass}
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setSubService("select");
                }}
              >
                <option value="select">Select</option>
                <option value="rechargeService">
                  Recharge Service
                </option>
                <option value="otherService">
                  Others Service
                </option>
              </select>
            </Row>

            {/* SUB SERVICE */}
            {service === "rechargeService" && (
              <Row label="Select SubService :">
                <select
                  className={selectClass}
                  value={subService}
                  onChange={(e) => setSubService(e.target.value)}
                >
                  <option value="select">Select</option>
                  <option value="mobile">Mobile Recharge</option>
                  <option value="dth">DTH Recharge</option>
                  <option value="datacard">Data Card Recharge</option>
                  <option value="AllRechargeService">All</option>
                </select>
              </Row>
            )}

            {service === "otherService" && (
              <Row label="Select SubService :">
                <select
                  className={selectClass}
                  value={subService}
                  onChange={(e) => setSubService(e.target.value)}
                >
                  <option value="select">Select</option>
                  <option value="billpay">Bill Payment</option>
                </select>
              </Row>
            )}

            {/* OPERATOR */}
            {subService !== "select" && (
              <Row label="Select Operator :">
                <select className={selectClass}>
                  <option>Select Operator</option>
                </select>
              </Row>
            )}

            {/* BUTTON */}
            <div className="mt-2">
              <button className={primaryBtn} onClick={GO}>
                Submit
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceManage;
