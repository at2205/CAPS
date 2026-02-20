"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AddSKU() {
  const [skuName, setSkuName] = useState("");
  const [commType, setCommType] = useState("P");
  const [commission, setCommission] = useState("0");
  const [chargeType, setChargeType] = useState("P");
  const [charge, setCharge] = useState("0");

  const [categoryList, setCategoryList] = useState([]);
  const [mainServiceList, setMainServiceList] = useState([]);
  const [subServiceList, setSubServiceList] = useState([]);

  const [category, setCategory] = useState("");
  const [mainService, setMainService] = useState("");
  const [subService, setSubService] = useState("");

  const [skuInputList, setSkuInputList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = skuInputList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(skuInputList.length / rowsPerPage);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const res = await axios.get("/SKUaction.action?param=getDropdowns");
      setCategoryList(res.data.categoryList || []);
      setMainServiceList(res.data.mainServiceList || []);
      setSubServiceList(res.data.subServiceList || []);
    } catch {
      console.log("Dropdown fetch failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skuName) {
      alert("SKU Name required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/SKUaction.action?param=addSKU", {
        skuName,
        commType,
        commission,
        chargeType,
        charge,
        category,
        mainService,
        subService,
      });

      setMessage(res.data.message || "SKU Added Successfully");
      setSkuInputList(res.data.skuInputList || []);
      setCurrentPage(1);
    } catch {
      alert("Error adding SKU");
    } finally {
      setLoading(false);
    }
  };

  const toggleAll = () => {
    if (!selectAll) {
      setChecked(currentRows.map((_, i) => indexOfFirst + i));
    } else {
      setChecked([]);
    }
    setSelectAll(!selectAll);
  };

  const toggleOne = (i) => {
    const realIndex = indexOfFirst + i;
    setChecked((prev) =>
      prev.includes(realIndex)
        ? prev.filter((x) => x !== realIndex)
        : [...prev, realIndex]
    );
  };

  const onlyNumber = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  };

  const updateMargin = async () => {
    if (checked.length === 0) {
      alert("Select checkbox first");
      return;
    }

    try {
      setLoading(true);
      const selected = checked.map((i) => skuInputList[i]);

      await axios.post("/SKUaction.action?param=updateSKUData", {
        list: selected,
      });

      alert("Updated Successfully");
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4fa2c2]";

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-center mb-3">
      <label className="w-[170px] text-right text-sm font-semibold">
        {label}
      </label>
      <div className="w-[260px] ml-3">{children}</div>
    </div>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-[900px] mt-10 rounded-xl border-[3px] border-[#b7dbe8] shadow-xl">

        {/* HEADER */}
        <div className="text-white font-bold text-center py-3 text-[18px] rounded-t-xl bg-gradient-to-r from-[#4c95b3] to-[#3d89a6]">
          Add SKU
        </div>

        {/* BODY */}
        <div className="px-10 py-6">

          {message && (
            <p className="text-green-600 text-sm text-center mb-2">
              {message}
            </p>
          )}

          {loading && (
            <div className="flex justify-center mb-3">
              <div className="h-5 w-5 border-2 border-[#4fa2c2] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <Row label="SKU Name :">
              <input
                value={skuName}
                onChange={(e) => setSkuName(e.target.value)}
                className={inputClass}
              />
            </Row>

            <Row label="Commission Type :">
              <select
                value={commType}
                onChange={(e) => setCommType(e.target.value)}
                className={inputClass}
              >
                <option value="P">P</option>
                <option value="R">R</option>
              </select>
            </Row>

            <Row label="Commission :">
              <input
                value={commission}
                maxLength={2}
                onKeyPress={onlyNumber}
                onChange={(e) => setCommission(e.target.value)}
                className={inputClass}
              />
            </Row>

            <Row label="Charge Type :">
              <select
                value={chargeType}
                onChange={(e) => setChargeType(e.target.value)}
                className={inputClass}
              >
                <option value="P">P</option>
                <option value="R">R</option>
              </select>
            </Row>

            <Row label="Charge :">
              <input
                value={charge}
                maxLength={2}
                onKeyPress={onlyNumber}
                onChange={(e) => setCharge(e.target.value)}
                className={inputClass}
              />
            </Row>

            <Row label="Category :">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                {categoryList.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </select>
            </Row>

            <Row label="Main Service :">
              <select
                value={mainService}
                onChange={(e) => setMainService(e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                {mainServiceList.map((m, i) => (
                  <option key={i}>{m}</option>
                ))}
              </select>
            </Row>

            <Row label="Sub Service :">
              <select
                value={subService}
                onChange={(e) => setSubService(e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                {subServiceList.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </select>
            </Row>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="px-6 py-1.5 text-white text-sm rounded-md shadow-md bg-[#4fa2c2] hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </form>

          {/* TABLE */}
          {currentRows.length > 0 && (
            <>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-[#4fa2c2] text-white">
                    <tr>
                      <th className="p-2 border">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleAll}
                        />
                      </th>
                      <th className="p-2 border">S.N</th>
                      <th className="p-2 border">Main</th>
                      <th className="p-2 border">Sub</th>
                      <th className="p-2 border">SKU</th>
                      <th className="p-2 border">Commission</th>
                      <th className="p-2 border">Type</th>
                      <th className="p-2 border">Charge</th>
                      <th className="p-2 border">Type</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentRows.map((row, i) => (
                      <tr key={i} className="text-center">
                        <td className="border p-2">
                          <input
                            type="checkbox"
                            checked={checked.includes(indexOfFirst + i)}
                            onChange={() => toggleOne(i)}
                          />
                        </td>
                        <td className="border">{indexOfFirst + i + 1}</td>
                        <td className="border">{row.mainService}</td>
                        <td className="border">{row.subService}</td>
                        <td className="border">{row.skuName}</td>

                        <td className="border">
                          <input
                            defaultValue={row.skuComm}
                            onKeyPress={onlyNumber}
                            className="w-16 border rounded px-1"
                          />
                        </td>

                        <td className="border">
                          <select
                            defaultValue={row.skuCommType}
                            className="border rounded px-1"
                          >
                            <option>P</option>
                            <option>R</option>
                          </select>
                        </td>

                        <td className="border">
                          <input
                            defaultValue={row.skuCharge}
                            onKeyPress={onlyNumber}
                            className="w-16 border rounded px-1"
                          />
                        </td>

                        <td className="border">
                          <select
                            defaultValue={row.skuChargeType}
                            className="border rounded px-1"
                          >
                            <option>P</option>
                            <option>R</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div className="text-center mt-4 text-sm">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 border rounded mr-2 disabled:opacity-40"
                >
                  Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 border rounded ml-2 disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              {/* ACTION BUTTONS */}
              <div className="text-center mt-4 space-x-3">
                <button
                  onClick={updateMargin}
                  className="px-4 py-1.5 text-white text-sm rounded bg-[#4fa2c2]"
                >
                  Update
                </button>

                <button
                  className="px-4 py-1.5 text-sm rounded border"
                  onClick={() => setChecked([])}
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddSKU;
