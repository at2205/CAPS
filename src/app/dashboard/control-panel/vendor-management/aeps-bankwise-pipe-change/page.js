"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

function AEPSBankWisePipeChange() {
  const [apiId, setApiId] = useState("Select");
  const [subService, setSubService] = useState("All");

  const [apiList, setApiList] = useState([]);
  const [bankList, setBankList] = useState([]);

  const [checkedRows, setCheckedRows] = useState([]);
  const [vendorMap, setVendorMap] = useState({});

  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState("");
  const [showTable, setShowTable] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /* ================= LOAD API LIST ================= */
  useEffect(() => {
    const loadApis = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getApiList`);

        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setApiList(list);
      } catch (err) {
        console.error("API list error", err);
        setApiList([]);
      }
    };

    if (baseUrl) loadApis();
  }, [baseUrl]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (apiId === "Select") {
      setNoData("Please select API");
      return;
    }

    try {
      setLoading(true);
      setShowTable(false);
      setNoData("");

      const res = await axios.get(
        `${baseUrl}/BankwisePipe.action?param=bankPipeByApiId&apiId=${apiId}&subs=${subService}`
      );

      if (Array.isArray(res.data?.BankList) && res.data.BankList.length > 0) {
        setBankList(res.data.BankList);
        setShowTable(true);
      } else {
        setBankList([]);
        setNoData("No Data Found");
      }
    } catch (err) {
      console.error(err);
      setNoData("Error while fetching data");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHECKBOX ================= */
  const toggleCheck = (iin) => {
    setCheckedRows((prev) =>
      prev.includes(iin)
        ? prev.filter((x) => x !== iin)
        : [...prev, iin]
    );
  };

  const checkAll = (checked) => {
    setCheckedRows(checked ? bankList.map((b) => b.Iin_Number) : []);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!checkedRows.length) {
      setNoData("Select at least one bank");
      return;
    }

    const list1 = checkedRows;
    const list2 = checkedRows.map((iin) => vendorMap[iin] || "");

    try {
      setLoading(true);

      await axios.get(
        `${baseUrl}/BankwisePipe.action?param=updateBankPipe&apiId=${apiId}&subs=${subService}&list1=${list1}&list2=${list2}`
      );

      setNoData("");
      alert("Updated Successfully");
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      title: (
        <input
          type="checkbox"
          onChange={(e) => checkAll(e.target.checked)}
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={checkedRows.includes(row.Iin_Number)}
          onChange={() => toggleCheck(row.Iin_Number)}
        />
      ),
      width: 50,
    },
    {
      title: "S.N.",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Bank Name",
      dataIndex: "BankName",
    },
    {
      title: "Vendor",
      render: (row) => (
        <select
          value={vendorMap[row.Iin_Number] ?? row.CurrentPipe ?? ""}
          onChange={(e) =>
            setVendorMap((prev) => ({
              ...prev,
              [row.Iin_Number]: e.target.value,
            }))
          }
          className="capsInput"
        >
          <option value="">--Select--</option>
          <option>Airtel Bank</option>
          <option>Fino Smart</option>
          <option>Fino Bank</option>
          <option>Fingpay</option>
          <option>Yes Bank</option>
        </select>
      ),
    },
  ];

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
        title="AEPS Bankwise Pipe Change"
        description="Manage AEPS vendor pipe mapping by bank"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">

            <FieldRow label="API ID">
              <select
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                className="capsInput"
              >
                <option>Select</option>
                {apiList.map((a, i) => (
                  <option key={i} value={a.aesApiId}>
                    {a.aesApiId} — {a.companyName}
                  </option>
                ))}
              </select>
            </FieldRow>

            <FieldRow label="Sub Service">
              <select
                value={subService}
                onChange={(e) => setSubService(e.target.value)}
                className="capsInput"
              >
                <option>All</option>
                <option>AEPS-CASH WITHDRAWL</option>
                <option>AEPS-BALANCE ENQUIRY</option>
                <option>AEPS-MINI STATEMENT</option>
                <option>AEPS-AADHAAR PAY</option>
              </select>
            </FieldRow>

            {/* STATUS */}
            <div className="text-center text-sm mb-2">
              {loading && <p className="text-gray-500">Loading...</p>}
              {noData && <p className="text-red-500">{noData}</p>}
            </div>

            {/* BUTTONS */}
            <div className="text-center mt-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                Submit
              </button>
            </div>

            {/* TABLE */}
            {showTable && (
              <>
                <div className="mt-6">
                  <Table
                    columns={columns}
                    dataSource={bankList}
                    rowKey="Iin_Number"
                    pagination={false}
                    bordered
                    size="small"
                  />
                </div>

                <div className="text-center mt-4">
                  <button
                    onClick={handleUpdate}
                    className="capsButtonSecondary min-w-[140px]"
                  >
                    Update
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default AEPSBankWisePipeChange;
