"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const Row = React.memo(({ label, children }) => (
  <div className="flex items-center mb-3">
    <label className="w-[260px] text-right pr-4 text-sm font-semibold text-orange-700">
      {label} :
    </label>
    <div className="w-[300px]">{children}</div>
  </div>
));

const SalesProfiling = () => {
  const [activeTab, setActiveTab] = useState("add");

  const [formData, setFormData] = useState({
    name: "",
    aesId: "",
    agentId: "",
    mobileNo: "",
    emailId: "",
    distributorId: "",
    fulldistributorId: "",
  });

  const [disableData, setDisableData] = useState({
    person: "-1",
  });

  const [salesPersonList, setSalesPersonList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSalesList();
  }, []);

  const fetchSalesList = async () => {
    try {
      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.viewSalesPersonList,
        {
          userId: localStorage.getItem("userId"),
        },
      );

      const data =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      let list = [];

      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data.salesPersonList)) list = data.salesPersonList;

      setSalesPersonList(list);
    } catch (err) {
      Swal.fire("Error", "Failed to load list", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDigitOnly = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (activeTab === "add") {
        const res = await axiosInstance.post(
          endpoints.controlPEndpoints.addSalesPerson,
          {
            ...formData,
            name: formData.name.toUpperCase(),
            userId: localStorage.getItem("userId"),
          },
        );

        const result =
          typeof res.data === "string" ? JSON.parse(res.data) : res.data;

        const msg = result.message || result.errorMessage || "";

        const isSuccess =
          result.status === "0" ||
          result.status === "00" ||
          result.success === true ||
          msg.toLowerCase().includes("success");

        if (isSuccess) {
          Swal.fire("Success", msg || "Added Successfully", "success");
          resetForm();
          fetchSalesList();
        } else {
          Swal.fire("Error", msg || "Failed", "error");
        }
      }

      if (activeTab === "disable") {
        if (disableData.person === "-1") {
          Swal.fire("Error", "Select Sales Person", "error");
          return;
        }

        const res = await axiosInstance.post(
          endpoints.controlPEndpoints.disableSalesPerson,
          {
            person: disableData.person,
          },
        );

        const result =
          typeof res.data === "string" ? JSON.parse(res.data) : res.data;

        if (result.status === "0" || result.status === "00") {
          Swal.fire("Success", "Disabled Successfully", "success");
          resetForm();
          fetchSalesList();
        } else {
          Swal.fire("Error", result.message || "Failed", "error");
        }
      }
    } catch (err) {
      Swal.fire("Error", "Server Error", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      aesId: "",
      agentId: "",
      mobileNo: "",
      emailId: "",
      distributorId: "",
      fulldistributorId: "",
    });

    setDisableData({ person: "-1" });
  };

  const inputClass = "w-full border border-gray-400 rounded px-2 py-1 text-sm";

  return (
    <div className="p-6 bg-[#d8c78f] min-h-screen">
      <CapsCard title="Sales Profiling" />

      <PageCard>
        <div className="flex justify-center gap-6 mb-6">
          <label>
            <input
              type="radio"
              checked={activeTab === "add"}
              onChange={() => setActiveTab("add")}
            />{" "}
            Add New
          </label>

          <label>
            <input
              type="radio"
              checked={activeTab === "disable"}
              onChange={() => setActiveTab("disable")}
            />{" "}
            Disable
          </label>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {activeTab === "add" ? (
            <>
              <Row label="Sales Person Name">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Row>

              <Row label="Employee BS ID">
                <input
                  name="aesId"
                  value={formData.aesId}
                  onChange={handleDigitOnly}
                  className={inputClass}
                />
              </Row>

              <Row label="Employee Agent ID">
                <input
                  name="agentId"
                  value={formData.agentId}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Row>

              <Row label="Mobile Number">
                <input
                  name="mobileNo"
                  maxLength={10}
                  value={formData.mobileNo}
                  onChange={handleDigitOnly}
                  className={inputClass}
                />
              </Row>

              <Row label="Email ID">
                <input
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Row>

              <Row label="Distributor ID">
                <input
                  name="distributorId"
                  value={formData.distributorId}
                  onChange={handleDigitOnly}
                  className={inputClass}
                />
              </Row>

              <Row label="Full Distributor ID">
                <input
                  name="fulldistributorId"
                  value={formData.fulldistributorId}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Row>
            </>
          ) : (
            <Row label="Select Sales Person">
              <select
                value={disableData.person}
                onChange={(e) => setDisableData({ person: e.target.value })}
                className={inputClass}
              >
                <option value="-1">Select</option>

                {salesPersonList.map((item, i) => {
                  const [name, id] = item.split("|");
                  return (
                    <option key={i} value={item}>
                      {name} ({id})
                    </option>
                  );
                })}
              </select>
            </Row>
          )}

          <div className="flex gap-5 mt-4">
            <button type="submit" className="capsButton">
              {loading
                ? "Processing..."
                : activeTab === "add"
                  ? "ADD"
                  : "DISABLE"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="capsButtonSecondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </PageCard>
    </div>
  );
};

export default SalesProfiling;
