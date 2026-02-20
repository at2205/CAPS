"use client";

import React, { useEffect, useState } from "react";

const KYCVerification = () => {
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Mock API data
  useEffect(() => {
    setCategories(["D", "Demo", "Free", "Premium", "Postpaid", "Prepaid"]);

    setClients([
      {
        id: "C101",
        category: "Free",
        name: "Rahul Sharma",
        type: "Rep",
        domain: "example.com",
      },
      {
        id: "C102",
        category: "Demo",
        name: "Amit Verma",
        type: "Tep",
        domain: "demo.com",
      },
    ]);
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
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[850px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-lg bg-white">

        {/* ===== HEADER ===== */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          KYC Verification
        </div>

        {/* ===== BODY ===== */}
        <div className="px-5 py-5">

          {/* ===== MESSAGE ===== */}
          {message && (
            <div className="mb-5 text-center py-2 rounded-md bg-green-100 text-green-700 font-medium">
              {message}
            </div>
          )}

          {/* ===== ASSIGN CATEGORY ===== */}
          <div className="flex justify-center mb-6">
            <div className="w-[520px]">

              <div className="mb-5 flex items-center">
                <label className="font-semibold w-1/2 text-right mr-3">
                  Assign Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c95b3]"
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
                  className="px-6 py-2 text-white rounded-2xl shadow
                             bg-gradient-to-b from-[#5fa9c7] to-[#3d89a6]
                             hover:opacity-90 transition"
                >
                  Update
                </button>
              </div>

            </div>
          </div>

          {/* ===== CLIENT TABLE ===== */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-center text-sm">

              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">
                    <input
                      type="checkbox"
                      onChange={toggleAll}
                      checked={isAllSelected}
                      className="w-4 h-4"
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
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="border p-2">{i + 1}</td>

                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(c.id)}
                        onChange={() => toggleClient(c.id)}
                        className="w-4 h-4"
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
                    <td
                      colSpan="7"
                      className="border p-3 text-gray-500"
                    >
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
