"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const AgentCategorization = () => {
  const [userType, setUserType] = useState("select");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ["Bronze", "Silver", "Gold", "Platinum"];

  const [rows, setRows] = useState({
    Bronze: { checked: false, fromAmount: "", toAmount: "", file: null },
    Silver: { checked: false, fromAmount: "", toAmount: "", file: null },
    Gold: { checked: false, fromAmount: "", toAmount: "", file: null },
    Platinum: { checked: false, fromAmount: "", toAmount: "", file: null },
  });

  /* CHANNEL CHANGE */

  const handleChannelChange = (e) => {
    setUserType(e.target.value);
    setShowTable(false);
  };

  /* SEARCH API */

  const handleSearch = async () => {
    if (userType === "select") {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please Select Channel",
      });
      return;
    }

    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");

      const res = await axiosInstance.get(
        endpoints.marketingModuleEndpoints.getChannelCategorizeData,
        {
          params: {
            userType: userType,
            userId: userId,
          },
        },
      );

      console.log("API RESPONSE:", res);

      if (res?.data?.status === "0") {
        const apiData = res.data.data || [];

        const updatedRows = { ...rows };

        apiData.forEach((item) => {
          const cat = item.category;

          if (updatedRows[cat]) {
            updatedRows[cat] = {
              ...updatedRows[cat],
              checked: true,
              fromAmount: item.fromSlab || "",
              toAmount: item.toSlab || "",
            };
          }
        });

        setRows(updatedRows);
        setShowTable(true);
      }
    } catch (err) {
      console.log("API ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: "Error fetching data",
      });
    }

    setLoading(false);
  };
  /* ROW CHANGE */

  const handleRowChange = (category, field, value) => {
    setRows((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  /* SUBMIT API */

  const validateAndSubmit = async () => {
    const selected = categories.filter((cat) => rows[cat].checked);

    if (selected.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select at least one category",
      });
      return;
    }

    const checkbox = [];
    const amounts = [];
    const files = [];

    selected.forEach((cat) => {
      const row = rows[cat];

      checkbox.push(cat);

      amounts.push({
        category: cat,
        fromSlab: row.fromAmount,
        toSlab: row.toAmount,
      });

      if (row.file) {
        files.push(row.file);
      }
    });

    const payload = {
      index: "1",
      checkbox: checkbox,
      userType: userType,
      amounts: amounts,
    };

    const formData = new FormData();

    formData.append("payload", JSON.stringify(payload));
    formData.append("userId", localStorage.getItem("userId"));

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axiosInstance.post(
        endpoints.marketingModuleEndpoints.getCategorizeDetails,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.status === "0") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message || "Data submitted successfully",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Submit Failed",
        text: "Something went wrong while submitting",
      });
    }
  };

  /* CANCEL */

  const handleCancel = () => {
    setShowTable(false);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Agent Categorization"
        description="Manage agent slab categories and uploads"
      />

      <PageCard>
        {/* CHANNEL SELECT */}

        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-[200px_20px_250px] items-center gap-4">
            <label className="text-right font-medium">Select Channel</label>

            <div className="text-center">:</div>

            <select
              value={userType}
              onChange={handleChannelChange}
              className="capsSelect"
            >
              <option value="select">Select</option>
              <option value="agent">Retailer</option>
              <option value="ds">Distributor</option>
              <option value="mds">Master Distributor</option>
            </select>
          </div>
        </div>

        {/* SEARCH BUTTON */}

        {!showTable && (
          <div className="text-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="capsButton min-w-[120px]"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        )}

        {/* TABLE */}

        {showTable && (
          <>
            <div className="capsColor text-center py-2 font-semibold rounded-md mb-4">
              Category Slabs
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#226b88] text-sm text-center">
                <thead>
                  <tr className="capsColor">
                    <th className="p-2 border">Select</th>
                    <th className="p-2 border">From Slab</th>
                    <th className="p-2 border">To Slab</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Upload</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat}>
                      <td className="p-2 border">
                        <input
                          type="checkbox"
                          checked={rows[cat].checked}
                          onChange={(e) =>
                            handleRowChange(cat, "checked", e.target.checked)
                          }
                        />
                      </td>

                      <td className="p-2 border">
                        <input
                          type="number"
                          className="capsInput w-full"
                          value={rows[cat].fromAmount}
                          onChange={(e) =>
                            handleRowChange(cat, "fromAmount", e.target.value)
                          }
                        />
                      </td>

                      <td className="p-2 border">
                        <input
                          type="number"
                          className="capsInput w-full"
                          value={rows[cat].toAmount}
                          onChange={(e) =>
                            handleRowChange(cat, "toAmount", e.target.value)
                          }
                        />
                      </td>

                      <td className="p-2 border font-semibold">{cat}</td>

                      <td className="p-2 border">
                        <input
                          type="file"
                          className="capsInput w-full"
                          onChange={(e) =>
                            handleRowChange(cat, "file", e.target.files[0])
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-6 space-x-4">
              <button onClick={validateAndSubmit} className="capsButton">
                Submit
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </PageCard>
    </div>
  );
};

export default AgentCategorization;
