"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import Swal from "sweetalert2";

const PendingTransaction = () => {
  const [formData, setFormData] = useState({
    service: "DMR-ARemit",
    tranId: "",
    fromDate: "",
    toDate: "",
  });

  const [tranList, setTranList] = useState([]);
  const [loading, setLoading] = useState(false);

  // INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // SEARCH
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post("/controlP/statusChangeByRange", {
        ...formData,
        userId: localStorage.getItem("userId"),
      });

      const data =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      const rawList =
        data["tranPending List"] ||
        data.tranPendingList ||
        data.tranList ||
        data;

      let list = [];

      // ✅ HANDLE ARRAY + OBJECT
      if (Array.isArray(rawList)) {
        list = rawList;
      } else if (typeof rawList === "object" && rawList !== null) {
        list = [rawList];
      }

      // ✅ MAPPING
      list = list.map((item) => ({
        agentId: item.agent_id,
        txnId: item.Transaction_Id,
        service: item.Service,
        date: item.Date_of_Transaction,
        time: item.Time_of_Transaction,
        amount: item.ReqAmount,
        fee: item.Service_charge1,
        status: item.Tran_status,
        clientId: "-",
        checked: false,
      }));

      setTranList(list);

      if (list.length === 0) {
        Swal.fire("Info", "No Data Found", "info");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  // CHECKBOX
  const handleCheck = (index) => {
    const updated = [...tranList];
    updated[index].checked = !updated[index].checked;
    setTranList(updated);
  };

  // UPDATE
  const handleUpdate = async () => {
    const selected = tranList.filter((t) => t.checked);

    if (selected.length === 0) {
      Swal.fire("Error", "Select at least one transaction", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm",
      text: "Do you want to update?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const res = await axiosInstance.post("/controlP/updatestatusDetails", {
        checkstatus: selected.map((t) => t.txnId),
        userId: localStorage.getItem("userId"),
      });

      const result =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      const msg = result.message || result.errorMessage || "";

      if (msg) {
        Swal.fire("Success", msg, "success");
        handleSearch(new Event("submit"));
      } else {
        Swal.fire("Error", "Update Failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Update Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-400 rounded px-2 py-1 text-sm";

  return (
    <div className="p-6 bg-[#d8c78f] min-h-screen">
      <CapsCard title="Pending Transaction Process" />

      <PageCard>
        {/* FORM */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mt-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-right font-semibold text-orange-700">
              Services :
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="DMR-ARemit">DMR-ARemit</option>
              <option value="AccountVerification-AREMIT">
                AccountVerification-AREMIT
              </option>
              <option value="DMR-MyRemit">DMR-MyRemit</option>
              <option value="AccountVerification-MyRemit">
                AccountVerification-MyRemit
              </option>
            </select>

            <label className="text-right font-semibold text-orange-700">
              Txn No / Txn Id :
            </label>
            <input
              name="tranId"
              value={formData.tranId}
              onChange={handleChange}
              className={inputClass}
            />

            <label className="text-right font-semibold text-orange-700">
              From Date :
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className={inputClass}
            />

            <label className="text-right font-semibold text-orange-700">
              To Date :
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="capsButton px-6">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>

        {/* TABLE */}
        {tranList.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border border-[#1f4e5f] text-sm table-fixed">
              <thead>
                <tr className="h-12">
                  {[
                    "Tick",
                    "Agent ID",
                    "Client ID",
                    "Transaction ID",
                    "Service",
                    "Txn Date",
                    "Txn Time",
                    "Txn Amount",
                    "Bankit Fee",
                    "Txn Status",
                  ].map((head, i) => (
                    <th
                      key={i}
                      style={{
                        backgroundColor: "#5fa0b5", 
                        color: "#ffffff", 
                        border: "1px solid #1f4e5f",
                        padding: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* BODY */}
              <tbody>
                {tranList.map((item, i) => (
                  <tr
                    key={i}
                    className={`text-center ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleCheck(i)}
                      />
                    </td>

                    <td className="border px-2 py-1">{item.agentId}</td>
                    <td className="border px-2 py-1">{item.clientId}</td>
                    <td className="border px-2 py-1 whitespace-nowrap">
                      {item.txnId}
                    </td>
                    <td className="border px-2 py-1">{item.service}</td>
                    <td className="border px-2 py-1">{item.date}</td>
                    <td className="border px-2 py-1">{item.time}</td>
                    <td className="border px-2 py-1">{item.amount}</td>
                    <td className="border px-2 py-1">{item.fee}</td>
                    <td className="border px-2 py-1 text-orange-600 font-semibold">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* UPDATE BUTTON */}
            <div className="flex justify-end mt-4">
              <button className="capsButton" onClick={handleUpdate}>
                {loading ? "Processing..." : "Update"}
              </button>
            </div>
          </div>
        )}
      </PageCard>
    </div>
  );
};

export default PendingTransaction;
