"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

const CouponStatus = () => {
  const [couponData, setCouponData] = useState([]);
  const [message, setMessage] = useState("");
  const [headerName, setHeaderName] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= HEADER NAME ================= */
  useEffect(() => {
    setHeaderName(
      sessionStorage.getItem("headerName") || "Coupon Status"
    );
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchCouponStatus();
  }, []);

  const fetchCouponStatus = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/api/coupon-status"
      );

      if (res.data?.length > 0) {
        setCouponData(res.data);
        setMessage("");
      } else {
        setCouponData([]);
        setMessage("No Records Found");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DOWNLOAD PDF ================= */
  const downloadFile = (batchNo) => {
    window.open(
      `http://localhost:8080/LoyaltyCashback.action?param=downloadStatusPdf&batchNo=${batchNo}`,
      "_blank"
    );
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "S.N.",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    { title: "Batch No", dataIndex: "batchNo" },
    { title: "Offer Name", dataIndex: "offer_name" },
    { title: "Cashback Amount", dataIndex: "amount" },
    { title: "Duration", dataIndex: "duration" },
    { title: "Coupon Activation Date", dataIndex: "activationDate" },
    { title: "Coupon Expiry Date", dataIndex: "expirationDate" },
    { title: "Main Service", dataIndex: "mainService" },
    { title: "Sub Service", dataIndex: "subService" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Download",
      align: "center",
      render: (_, record) => (
        <button
          onClick={() => downloadFile(record.batchNo)}
          className="px-3 py-1 text-sm rounded-md text-white bg-[#4fa2c2] hover:opacity-90"
        >
          Download
        </button>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-start">
      <div className="w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-lg rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          {headerName}
        </div>

        {/* BODY */}
        <div className="px-6 py-5">

          {/* MESSAGE / LOADER */}
          <div className="text-center mb-3 min-h-[24px]">
            {loading && (
              <div className="text-sm text-gray-500 animate-pulse">
                Loading...
              </div>
            )}

            {message && (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          </div>

          {/* TABLE */}
          <Table
            dataSource={couponData}
            columns={columns}
            bordered
            size="small"
            pagination={false}
            rowKey={(record, index) => index}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CouponStatus;
