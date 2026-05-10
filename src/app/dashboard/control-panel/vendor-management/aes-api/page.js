"use client";
import React, { useState } from "react";
import { Table } from "antd";
import Swal from "sweetalert2";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function AESAPI() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const columns = [
    { title: "S.N.", dataIndex: "sn", width: 70 },
    { title: "Service Type", dataIndex: "serviceType" },
    { title: "Service", dataIndex: "service" },
    { title: "Action", dataIndex: "action" },
    { title: "Pipe Status", dataIndex: "pipeStatus" },
    { title: "Vendor", dataIndex: "vendor" },
    { title: "Status", dataIndex: "status" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // MAIN SUBMIT (GET DATA)
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        userId: localStorage.getItem("userId"),
        apiId: formValues.apiId,
        service: formValues.service,
      };

      console.log("PAYLOAD:", payload);

      const body = `adminUserFormBean=${encodeURIComponent(JSON.stringify(payload))}`;

      const [res1, res2] = await Promise.all([
        axiosInstance.post(
          endpoints.controlPEndpoints.getAesAPICustomerDetails,
          body,
        ),
        axiosInstance.post(
          endpoints.controlPEndpoints.getAPIVendorDetails,
          body,
        ),
      ]);

      const parse = (res) =>
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      const data2 = parse(res2);

      const vendorList = data2?.vendorList || data2?.data?.vendorList || [];

      const finalData = vendorList.map((item, index) => ({
        key: index,
        sn: index + 1,
        serviceType: formValues.mainService,
        service: item.operatorId || "-",
        action: item.vendorStatus === "Y" ? "Enabled" : "Disabled",
        pipeStatus: item.pipeStatus || "-",
        vendor: item.vendor || "-",
        status: item.vendorStatus === "Y" ? "Active" : "Inactive",
      }));

      setTableData(finalData);
      setShowTable(true);
    } catch (err) {
      console.error("ERROR:", err.response?.data);

      Swal.fire("Error", "API Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 UPDATE API
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const updateList = tableData.map((item) => ({
        operatorId: item.service,
        vendorStatus: item.action === "Enabled" ? "Y" : "N",
        pipeStatus: item.pipeStatus,
        vendor: item.vendor,
      }));

      const payload = {
        userId: localStorage.getItem("userId") || "5155",
        apiId: formValues.apiId,
        service: formValues.mainService,
        updateList: updateList,
      };

      // ✅ create body (missing in your code)
      const body = `adminUserFormBean=${encodeURIComponent(JSON.stringify(payload))}`;

      // ✅ correct endpoint
      await axiosInstance.post(
        endpoints.controlPEndpoints.apiUpdateDetails,
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      Swal.fire("Success", "Updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
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
        title="API Vendor Management"
        description="Manage API vendor & service control"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px]">
            <FieldRow label="API ID">
              <select
                name="apiId"
                value={formValues?.apiId || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="10003">API 10003</option>
              </select>
            </FieldRow>

            <FieldRow label="Main Service">
              <select
                name="mainService"
                value={formValues?.mainService || ""}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>
                <option value="Recharge">Recharge</option>
                <option value="Utility">Utility</option>
                <option value="Money Transfer">Money Transfer</option>
                <option value="AEPS">AEPS</option>
                <option value="BBPS">BBPS</option>
                <option value="Settlement">Settlement</option>
              </select>
            </FieldRow>

            <div className="text-center mt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton min-w-[140px]"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>

            {/* TABLE */}
            {showTable && (
              <div className="mt-6">
                <div className="font-semibold mb-2 text-center">
                  Service Control
                </div>

                <Table
                  dataSource={tableData}
                  columns={columns}
                  bordered
                  pagination={false}
                  size="small"
                />

                {/* UPDATE BUTTON */}
                <div className="text-center mt-4">
                  <button
                    onClick={handleUpdate}
                    className="capsButton min-w-[140px]"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageCard>
    </div>
  );
}

export default AESAPI;
