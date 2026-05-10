"use client";
import React, { useState } from "react";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

export default function EditSlabPage() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  // 🔍 SEARCH API
  const handleSearch = async () => {
    const payload = {
      userId: localStorage.getItem("userId"),
      userType: "agent",
      searchBy: "id",
      searchValue: "1002", // dynamic karo
    };

    const params = new URLSearchParams();
    params.append("adminUserFormBean", JSON.stringify(payload));

    const res = await axiosInstance.post(
      endpoints.reportsEndpoints.getEditSlabData,
      params
    );

    const result =
      typeof res.data === "string" ? JSON.parse(res.data) : res.data;

    if (result.status === "0") {
      setData(result.data);
    } else {
      alert(result.message);
    }
  };

  // ✅ UPDATE API
  const handleSave = async () => {
    for (let i of selected) {
      const row = data[i];

      const payload = {
        userId: row.userID,
        deposit1: row.deposit1,
        rate1: row.rate1,
        deposit2: row.deposit2,
        rate2: row.rate2,
        deposit3: row.deposit3,
        rate3: row.rate3,
      };

      const params = new URLSearchParams();
      params.append("adminUserFormBean", JSON.stringify(payload));

      await axiosInstance.post(
        endpoints.reportsEndpoints.updateSlabInfo,
        params
      );
    }

    alert("Updated Successfully");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Slab</h2>

      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
        Load Data
      </button>

      <table className="w-full mt-4 border">
        <thead className="bg-gray-200">
          <tr>
            <th>Select</th>
            <th>User ID</th>
            <th>Deposit1</th>
            <th>Rate1</th>
            <th>Deposit2</th>
            <th>Rate2</th>
            <th>Deposit3</th>
            <th>Rate3</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => {
                    setSelected((prev) =>
                      prev.includes(i)
                        ? prev.filter((x) => x !== i)
                        : [...prev, i]
                    );
                  }}
                />
              </td>

              <td>{row.userID}</td>

              <td>
                <input
                  value={row.deposit1 || ""}
                  onChange={(e) => {
                    const updated = [...data];
                    updated[i].deposit1 = e.target.value;
                    setData(updated);
                  }}
                />
              </td>

              <td>
                <input
                  value={row.rate1 || ""}
                  onChange={(e) => {
                    const updated = [...data];
                    updated[i].rate1 = e.target.value;
                    setData(updated);
                  }}
                />
              </td>

              <td>
                <input
                  value={row.deposit2 || ""}
                  onChange={(e) => {
                    const updated = [...data];
                    updated[i].deposit2 = e.target.value;
                    setData(updated);
                  }}
                />
              </td>

              <td>
                <input
                  value={row.rate2 || ""}
                  onChange={(e) => {
                    const updated = [...data];
                    updated[i].rate2 = e.target.value;
                    setData(updated);
                  }}
                />
              </td>

              <td>
                <input
                  value={row.deposit3 || ""}
                  onChange={(e) => {
                    const updated = [...data];
                    updated[i].deposit3 = e.target.value;
                    setData(updated);
                  }}
                />
              </td>

              <td>
                <input
                  value={row.rate3 || ""}
                  onChange={(e) => {
                    const updated = [...data];
                    updated[i].rate3 = e.target.value;
                    setData(updated);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Save
      </button>
    </div>
  );
}