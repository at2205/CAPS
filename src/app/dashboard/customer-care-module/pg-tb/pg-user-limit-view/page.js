"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const PGUserLimitView = () => {

  const [enterUserId, setEnterUserId] = useState("10002");
  const [mdsId, setMdsId] = useState("");
  const [mdsList, setMdsList] = useState([]);

  const [category, setCategory] = useState("");
  const [mainService, setMainService] = useState("");
  const [subService, setSubService] = useState("");
  const [agentId, setAgentId] = useState("");

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  /* ================= MDS LIST API ================= */

  const fetchMdsList = async () => {
    try {

      const response = await axiosInstance.post(
        endpoints.daModuleEndpoints.getMdsUserData,
        {
          userId: localStorage.getItem("userId"),
          loginType: localStorage.getItem("adminUserType")
        }
      );

      console.log("MDS API RESPONSE:", response.data);

      setMdsList(response.data || []);

    } catch (error) {
      console.log("MDS LIST ERROR", error);
    }
  };

  useEffect(() => {
    fetchMdsList();
  }, []);

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const jsonPayload = {

        userId: localStorage.getItem("userId"),
        enterUserId: enterUserId,
        loginType: localStorage.getItem("adminUserType"),

        MDSid: mdsId,
        category: category,
        mainService: mainService,
        subService: subService,
        fullAgentId: agentId

      };

      const formData = new FormData();
      formData.append("jsonData", JSON.stringify(jsonPayload));

      const response = await axiosInstance.post(
        endpoints.marketingModuleEndpoints.getPGUserLimitData,
        formData
      );

      const data = response.data;

      console.log("PG API RESPONSE:", data);

      if (data.code === 0 || data.code === "0") {

        Swal.fire("Success", "Data Loaded", "success");

        const formattedData = (data.SKUData || []).map((item,index)=>({
          id:index+1,
          mainService:item.mainService,
          subService:item.subService,
          category:item.category,
          skuName:item.skuName,
          status:item.status,
          dailyCount:item.dailyCount,
          minAmt:item.minSlab,
          maxAmt:item.maxSlab
        }));

        setTableData(formattedData);

      } else {

        Swal.fire("Info", data.message || "No Data Found", "info");

      }

    } catch(error) {

      console.log("API ERROR", error);

      Swal.fire(
        "Error",
        error?.response?.data?.message || "Server Error",
        "error"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 min-h-screen text-[#226b88]">

      <CapsCard
        title="PG User Limit"
        description="View and manage PG user transaction limits"
      />

      <PageCard>

        <div className="grid gap-4 w-full max-w-3xl mx-auto">

          {/* Enter User ID */}

          <FormRow label="Enter User ID">
            <input
              className="capsInput w-80"
              value={enterUserId}
              onChange={(e) => setEnterUserId(e.target.value)}
            />
          </FormRow>

          {/* MDS Dropdown */}

          <FormRow label="MDS ID">
            <select
              className="capsSelect w-80"
              value={mdsId}
              onChange={(e) => setMdsId(e.target.value)}
            >

              <option value="">Select MDS</option>

              {mdsList.map((item,index)=>(
                <option key={index} value={item.key}>
                  {item.value}
                </option>
              ))}

            </select>
          </FormRow>

          {/* Category */}

          <FormRow label="Category">
            <select
              className="capsSelect w-80"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Postpaid">Postpaid</option>
            </select>
          </FormRow>

          {/* Main Service */}

          <FormRow label="Main Service">
            <select
              className="capsSelect w-80"
              value={mainService}
              onChange={(e) => setMainService(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Utility">Utility</option>
            </select>
          </FormRow>

          {/* Sub Service */}

          <FormRow label="Sub Service">
            <select
              className="capsSelect w-80"
              value={subService}
              onChange={(e) => setSubService(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Digital Mall Charges">
                Digital Mall Charges
              </option>
            </select>
          </FormRow>

          {/* Agent ID */}

          <FormRow label="Agent ID">
            <input
              className="capsInput w-80"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            />
          </FormRow>

          {/* Submit Button */}

          <div className="flex justify-center mt-4">

            <button
              onClick={handleSubmit}
              className="capsButton"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>

          </div>

        </div>

        {/* TABLE */}

        {tableData.length > 0 && (

          <div className="mt-8 overflow-x-auto border rounded-lg bg-white">

            <table className="w-full text-sm text-center">

              <thead className="chcolor1 text-white">

                <tr>
                  <th>S.N.</th>
                  <th>Main Service</th>
                  <th>Sub Service</th>
                  <th>Category</th>
                  <th>SKU Name</th>
                  <th>Daily Count</th>
                  <th>Min Slab</th>
                  <th>Max Slab</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {tableData.map((row, i) => (

                  <tr key={row.id} className="border-t">

                    <td>{i + 1}</td>
                    <td>{row.mainService}</td>
                    <td>{row.subService}</td>
                    <td>{row.category}</td>
                    <td>{row.skuName}</td>

                    <td>{row.dailyCount}</td>
                    <td>{row.minAmt}</td>
                    <td>{row.maxAmt}</td>

                    <td className="text-red-600 font-semibold">
                      {row.status}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </PageCard>

    </div>

  );

};

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-3">
    <label className="text-right font-medium">{label}</label>
    <div>:</div>
    <div>{children}</div>
  </div>
);

export default PGUserLimitView;