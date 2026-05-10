"use client";
import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const ParkingTransaction = () => {
  const [transactionType, setTransactionType] = useState("neft");
  const [parkTransactions, setParkTransactions] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    fetchData();
  }, [transactionType]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.getTransaction,
        {
          agentIdList: [],
          transactionType,
        },
      );

      const data =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      console.log("GET RESPONSE →", data);

      let list = [];
      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data.data)) list = data.data;
      else if (Array.isArray(data.list)) list = data.list;

      setParkTransactions(list);
    } catch (err) {
      Swal.fire("Error", "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= CHECKBOX =================
  const handleCheckbox = (id, checked) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList((prev) => prev.filter((x) => x !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setCheckedList(parkTransactions.map((i) => i.aesApiId));
    } else {
      setCheckedList([]);
    }
  };

  // ================= ACTION =================
  const handleAction = async (type) => {
    console.log("Clicked:", type);

    if (checkedList.length === 0) {
      return Swal.fire("Error", "Select at least one row", "error");
    }

    try {
      const payload = {
        agentIdList: checkedList,
        transactionType,
        userId: localStorage.getItem("userId"),
      };

      console.log("PAYLOAD →", payload);

      const api =
        type === "PARK"
          ? "/controlP/parkTransaction"
          : "/controlP/releaseTransactions"; // 🔥 hardcode for test

      const res = await axiosInstance.post(api, payload);

      console.log("RAW RESPONSE →", res);

      const result =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      console.log("FINAL RESPONSE →", result);

      if (
        result.status === "00" ||
        result.status === "0" ||
        result.status === 0
      ) {
        Swal.fire("Success", result.message || "Success", "success");
        fetchData();
        setCheckedList([]);
      } else {
        Swal.fire("Error", result.message || "Failed", "error");
      }
    } catch (err) {
      console.error("ERROR →", err);

      Swal.fire("Error", err?.response?.data || "Server Error", "error");
    }
  };
  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard title="Parking Transaction" />

      <PageCard>
        {/* RADIO */}
        <div className="text-center mb-4">
          {["neft", "imps", "both"].map((t) => (
            <label key={t} className="mx-3">
              <input
                type="radio"
                checked={transactionType === t}
                onChange={() => setTransactionType(t)}
              />{" "}
              {t.toUpperCase()}
            </label>
          ))}
        </div>

        {/* TABLE */}
        <table className="w-full border text-sm text-center">
          <thead className="bg-[#4fa2c2] text-white">
            {" "}
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>Sr. No.</th>
              <th>API ID</th>
              <th>Name</th>
              <th>Transaction Count</th>
              <th>Action</th>
              <th>Transaction Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : parkTransactions.length === 0 ? (
              <tr>
                <td colSpan="7">No Data Found</td>
              </tr>
            ) : (
              parkTransactions.map((item, index) => (
                <tr key={item.aesApiId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedList.includes(item.aesApiId)}
                      onChange={(e) =>
                        handleCheckbox(item.aesApiId, e.target.checked)
                      }
                    />
                  </td>

                  <td>{index + 1}</td>

                  <td>{item.aesApiId}</td>

                  <td>{item.companyName}</td>

                  <td>{item.transactionCount}</td>

                  <td>{item.status === true ? "Parking On" : "Parking Off"}</td>

                  <td>{item.transactionStatus}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* BUTTONS (JSP SAME LOGIC) */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => handleAction("PARK")}
            disabled={checkedList.length === 0}
            className="capsButton px-6"
          >
            PARK
          </button>

          <button
            onClick={() => handleAction("RELEASE")}
            disabled={checkedList.length === 0}
            className="capsButtonSecondary px-6"
          >
            RELEASE
          </button>
        </div>
      </PageCard>
    </div>
  );
};

export default ParkingTransaction;
