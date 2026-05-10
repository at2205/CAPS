"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function MarkupHistory() {
  const [formData, setFormData] = useState({
    userId: "",
    fromDate: "",
    toDate: "",
  });

  const [data, setData] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "userId") {
      const clean = value.replace(/[^A-Za-z0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: clean }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ================= VALIDATION =================
  const validate = () => {
    if (!formData.userId.trim()) {
      Swal.fire("Error", "Please Enter Agent Id", "error");
      return false;
    }
    return true;
  };

  // ================= API =================
  const fetchData = async (pageNo = 1) => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(
        endpoints.reportsEndpoints.markupHistory,
        {
          userId: formData.userId,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          page: pageNo,
        }
      );

      const response =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      if (!response || !response.list || response.list.length === 0) {
        Swal.fire("Info", "No Data Found", "info");
        setData([]);
      } else {
        setData(response.list);
        setHasNext(response.hasNext || false);
        setPage(pageNo);
        setShowResult(true);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "API Error", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = () => {
    if (!validate()) return;
    fetchData(1);
  };

  // ================= PAGINATION =================
  const loadPage = (newPage) => {
    if (newPage < 1) return;
    fetchData(newPage);
  };

  return (
    <div className="p-6 text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="Reports > Markup History"
        description="View markup history using Agent Id"
      />

      <PageCard>

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            {/* Agent ID */}
            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Agent Id <span className="text-red-500">*</span>
              </label>
              <div className="text-center">:</div>
              <input
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="capsInput"
                placeholder="Enter Agent Id"
              />
            </div>

            {/* From Date */}
            {showResult && (
              <>
                <div className="grid grid-cols-[200px_10px_1fr] items-center">
                  <label className="text-sm font-semibold text-right">
                    From Date
                  </label>
                  <div className="text-center">:</div>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    className="capsInput"
                  />
                </div>
 

                    {/* To Date */}
                <div className="grid grid-cols-[200px_10px_1fr] items-center">
                  <label className="text-sm font-semibold text-right">
                    To Date
                  </label>
                  <div className="text-center">:</div>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    className="capsInput"
                  />
                </div>
              </>
            )}

            {/* BUTTON */}
            <div className="text-center pt-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="capsButton px-10"
              >
                {loading ? "Loading..." : "SUBMIT"}
              </button>
            </div>

            {/* ================= TABLE ================= */}
            {data.length > 0 && (
              <div className="pt-4">
                <table className="w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-2">S.No</th>
                      <th className="border px-2 py-2">Flight Type</th>
                      <th className="border px-2 py-2">Markup Type</th>
                      <th className="border px-2 py-2">Value</th>
                      <th className="border px-2 py-2">Applied Date</th>
                      <th className="border px-2 py-2">Updated Date</th>
                      <th className="border px-2 py-2">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-2 py-2">
                          {(page - 1) * 20 + index + 1}
                        </td>
                        <td className="border">{item.flightType}</td>
                        <td className="border">{item.markupType}</td>
                        <td className="border">{item.markupValue}</td>
                        <td className="border">
                          {item.appliedDate?.slice(0, 19)}
                        </td>
                        <td className="border">
                          {item.updatedDate?.slice(0, 19)}
                        </td>
                        <td
                          className={`border font-bold ${
                            item.status === "Applied"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* PAGINATION */}
                <div className="text-center mt-3">
                  <button
                    onClick={() => loadPage(page - 1)}
                    disabled={page === 1}
                    className="mx-2 text-blue-600 disabled:text-gray-400"
                  >
                    Prev
                  </button>

                  |

                  <button
                    onClick={() => loadPage(page + 1)}
                    disabled={!hasNext}
                    className="mx-2 text-blue-600 disabled:text-gray-400"
                  >
                    Next
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

export default MarkupHistory;