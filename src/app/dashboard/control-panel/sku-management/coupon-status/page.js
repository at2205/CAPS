"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

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
          className="capsButton text-xs px-3 py-1"
        >
          Download
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title={headerName}
        description="View coupon batches and download status reports"
      />

      <PageCard>

        {/* STATUS / LOADER */}
        <div className="text-center mb-3 min-h-[24px]">
          {loading && (
            <p className="text-sm text-gray-500 animate-pulse">
              Loading...
            </p>
          )}

          {message && (
            <p className="text-sm text-red-500">
              {message}
            </p>
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

      </PageCard>
    </div>
  );
};

export default CouponStatus;
