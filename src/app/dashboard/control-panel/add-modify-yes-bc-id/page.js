"use client";
import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const YesBcId = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      checked: false,
      agentId: "",
      agentName: "",
      yesBCId: "",
    })),
  );

  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= INPUT =================
  const handleInputChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleCheckboxChange = (index) => {
    const updated = [...rows];
    updated[index].checked = !updated[index].checked;
    setRows(updated);
    setSelectAll(updated.every((r) => r.checked));
  };

  const handleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setRows(rows.map((r) => ({ ...r, checked: newVal })));
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    const selected = rows.filter((r) => r.checked);

    if (!selected.length) {
      Swal.fire("Error", "Please select at least one row", "error");
      return false;
    }

    for (const r of selected) {
      if (!r.agentId.trim()) {
        Swal.fire("Error", `Enter Agent ID for row ${r.id}`, "error");
        return false;
      }
      if (!r.agentName.trim()) {
        Swal.fire("Error", `Enter Agent Name for row ${r.id}`, "error");
        return false;
      }
      if (!r.yesBCId.trim()) {
        Swal.fire("Error", `Enter Yes BC ID for row ${r.id}`, "error");
        return false;
      }
    }

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = rows
        .filter((r) => r.checked)
        .map((r) => ({
          agentId: r.agentId,
          agentName: r.agentName,
          yesBCId: r.yesBCId,
        }));

      console.log("Payload →", payload);

      const response = await axiosInstance.post(
        endpoints.controlPEndpoints.yesBcId,
        payload,
      );

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (data.status === "00") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message || "Records inserted successfully",
        });
        handleClear();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server Error", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================
  const handleClear = () => {
    setRows(
      Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        checked: false,
        agentId: "",
        agentName: "",
        yesBCId: "",
      })),
    );
    setSelectAll(false);
  };

  const inputClass = "capsInput";
  const thClass = "py-2";

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Control Panel > Add / Modify Yes BC ID"
        description="Manage Yes Bank BC mapping"
      />

      <PageCard>
        <form onSubmit={handleSubmit}>
          <div className="border rounded overflow-hidden">
            <table className="w-full text-sm text-center">
              <thead className="bg-[#5a97b5] text-white">
                <tr>
                  <th className={thClass}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Agent Id</th>
                  <th>Agent Name</th>
                  <th>Yes BC Id</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className="border-t">
                    <td>
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => handleCheckboxChange(index)}
                        disabled={loading}
                      />
                    </td>

                    <td>
                      <input
                        value={row.agentId}
                        onChange={(e) =>
                          handleInputChange(index, "agentId", e.target.value)
                        }
                        className={`${inputClass} w-[180px]`}
                      />
                    </td>

                    <td>
                      <input
                        value={row.agentName}
                        onChange={(e) =>
                          handleInputChange(index, "agentName", e.target.value)
                        }
                        className={`${inputClass} w-[200px]`}
                      />
                    </td>

                    <td>
                      <input
                        value={row.yesBCId}
                        onChange={(e) =>
                          handleInputChange(index, "yesBCId", e.target.value)
                        }
                        className={`${inputClass} w-[180px]`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-5 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="capsButton px-10"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="capsButtonSecondary px-10"
            >
              Clear
            </button>
          </div>
        </form>
      </PageCard>
    </div>
  );
};

export default YesBcId;
