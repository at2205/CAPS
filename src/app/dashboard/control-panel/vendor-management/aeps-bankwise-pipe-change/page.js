"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

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

    loadApis();
  }, [baseUrl]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (apiId === "Select") {
      alert("Please select API");
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
        setShowTable(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error while fetching data");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHECKBOX ================= */
  const toggleCheck = (iin) => {
    setCheckedRows((prev) =>
      prev.includes(iin) ? prev.filter((x) => x !== iin) : [...prev, iin]
    );
  };

  const checkAll = (checked) => {
    setCheckedRows(checked ? bankList.map((b) => b.Iin_Number) : []);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (checkedRows.length === 0) {
      alert("Select at least one bank");
      return;
    }

    const list1 = checkedRows;
    const list2 = checkedRows.map((iin) => vendorMap[iin] || "");

    try {
      setLoading(true);

      await axios.get(
        `${baseUrl}/BankwisePipe.action?param=updateBankPipe&apiId=${apiId}&subs=${subService}&list1=${list1}&list2=${list2}`
      );

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
      width: 60,
    },
    { title: "S.N.", render: (_, __, i) => i + 1 },
    { title: "Bank Name", dataIndex: "BankName" },
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
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]"
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

  const inputClass =
    "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[180px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  /* ================= UI ================= */
  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          AEPS Bankwise Pipe Change
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          <div className="p-4">
            <Row label="API ID :">
              <select
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                className={inputClass}
              >
                <option>Select</option>
                {apiList.map((a, i) => (
                  <option key={i} value={a.aesApiId}>
                    {a.aesApiId} {a.companyName}
                  </option>
                ))}
              </select>
            </Row>

            <Row label="Sub Service :">
              <select
                value={subService}
                onChange={(e) => setSubService(e.target.value)}
                className={inputClass}
              >
                <option>All</option>
                <option>AEPS-CASH WITHDRAWL</option>
                <option>AEPS-BALANCE ENQUIRY</option>
                <option>AEPS-MINI STATEMENT</option>
                <option>AEPS-AADHAAR PAY</option>
              </select>
            </Row>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                Submit
              </button>
            </div>
          </div>

          {/* STATUS */}
          <div className="text-center mt-3 text-sm">
            {loading && (
              <p className="text-gray-500 animate-pulse">Loading...</p>
            )}
            {noData && <p className="text-red-500">{noData}</p>}
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
                  className="px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90"
                >
                  Update
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default AEPSBankWisePipeChange;
