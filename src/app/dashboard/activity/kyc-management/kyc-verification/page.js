"use client";

import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const KYCVerification = () => {
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load categories and zone list from backend
    const fetchData = async () => {
      try {
        const response = await urlencodedInstance.get(endpoints.activityEndpoints.kycZones);
        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
        if (data.status === "0" && data.zoneList) {
          setCategories(data.zoneList);
        }
      } catch { /* use empty */ }
    };
    fetchData();
  }, []);

  const toggleClient = (id) => {
    setSelectedClients((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelectedClients(clients.map((c) => c.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleUpdate = () => {
    if (!selectedCategory) {
      alert("Please select category");
      return;
    }

    if (selectedClients.length === 0) {
      alert("Please select at least one client");
      return;
    }

    if (!window.confirm("Are you sure you want to continue ?")) return;

    console.log({
      category: selectedCategory,
      clients: selectedClients,
    });

    setMessage("Category updated successfully");
  };

  const isAllSelected =
    clients.length > 0 &&
    selectedClients.length === clients.length;

  return (
    <div className="p-6 min-h-screen text-[#226b88]">

      {/* HEADER */}
      <CapsCard
        title="KYC Verification"
        description="Assign and update client categories"
      />

      {/* MAIN CARD */}
      <PageCard>

        {/* MESSAGE */}
        {message && (
          <div className="mb-5 text-center py-2 rounded-md bg-green-100 text-green-700 font-medium">
            {message}
          </div>
        )}

        {/* ASSIGN CATEGORY */}
        <div className="flex justify-center mb-6">
          <div>

            <div className="grid grid-cols-[200px_20px_250px] items-center gap-4 mb-5">

              <label className="text-right font-medium">
                Assign Category
              </label>

              <div className="text-center">:</div>

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="capsSelect"
              >
                <option value="">Select</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    Category-{cat}
                  </option>
                ))}
              </select>

            </div>

            <div className="text-center">
              <button
                onClick={handleUpdate}
                className="capsButton min-w-[120px]"
              >
                Update
              </button>
            </div>

          </div>
        </div>

        {/* CLIENT TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#226b88] text-sm text-center">

            <thead>
              <tr className="capsColor">
                <th className="border p-2">S.No</th>
                <th className="border p-2">
                  <input
                    type="checkbox"
                    onChange={toggleAll}
                    checked={isAllSelected}
                  />
                </th>
                <th className="border p-2">Client Id</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Client Name</th>
                <th className="border p-2">Client Type</th>
                <th className="border p-2">Client Domain</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((c, i) => (
                <tr key={c.id}>
                  <td className="border p-2">{i + 1}</td>

                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(c.id)}
                      onChange={() => toggleClient(c.id)}
                    />
                  </td>

                  <td className="border p-2">{c.id}</td>

                  <td className="border p-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      {c.category}
                    </span>
                  </td>

                  <td className="border p-2">{c.name}</td>

                  <td className="border p-2 uppercase">
                    {c.type}
                  </td>

                  <td className="border p-2">{c.domain}</td>
                </tr>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td colSpan="7" className="border p-3 text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </PageCard>
    </div>
  );
};

export default KYCVerification;
