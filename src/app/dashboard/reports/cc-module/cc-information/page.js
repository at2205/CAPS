"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function UserInformationMaster() {
  const [userType, setUserType] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [userId, setUserId] = useState("");

  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= SEARCH ================= */

  const handleSearch = async () => {
    if (!userType) return alert("Please select User Type");
    if (!searchBy) return alert("Please select Search By");
    if (searchBy === "id" && !userId) return alert("Enter User ID");

    try {
      setLoading(true);

      const payload = {
        userId: localStorage.getItem("userId"),
        userType: "activityadmin", 
        searchBy: "searchBy",
      };

      const formData = new URLSearchParams();
      formData.append("adminUserFormBean", JSON.stringify(payload));

      const res = await axiosInstance.post(
        endpoints.reportsEndpoints.getCCData,
        formData,
      );

      const data = JSON.parse(res.data);

      if (data.status === "SUCCESS") {
        setTableData(data.data || []);
        setShowTable(true);
        setSelectedRows([]);
      } else {
        alert(data.message || "No Data Found");
        setShowTable(false);
      }
    } catch (err) {
      console.error(err);
      alert("Search API Error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHECKBOX ================= */

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(tableData.map((_, i) => i));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  /* ================= FIELD CHANGE ================= */

  const handleFieldChange = (index, field, value) => {
    const updated = [...tableData];
    updated[index][field] = value;
    setTableData(updated);
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    if (selectedRows.length === 0) {
      return alert("Select at least one row");
    }

    try {
      setLoading(true);

      for (let i of selectedRows) {
        const row = tableData[i];

        if (!row.userRemark) {
          alert(`Enter remark for User ${row.userID}`);
          return;
        }

        const payload = {
          userId: row.userID,
          userMinDeposite: row.userMinDeposite,
          userMinDepositeRate: row.userMinRate,
          AVIDBlock: row.userAVIDBlock,
          userAVIDUndertaking: row.userAVIDUndertaking,
          verifyPan: row.userVerifyPan,
          verifyAgreement: row.userVerifyAgreement,
          remark: row.userRemark,
          user: userType,
        };

        const formData = new URLSearchParams();
        formData.append("adminUserFormBean", JSON.stringify(payload));

        const res = await axiosInstance.post(
          endpoints.reportsEndpoints.updateCCInfo,
          formData,
        );

        const data = JSON.parse(res.data);

        if (data.status !== "SUCCESS") {
          alert(`Update failed for User ${row.userID}`);
          return;
        }
      }

      alert("All Selected Users Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Update API Error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="User Information Master (UIM)"
        description="Manage User Information"
      />

      {/* SEARCH */}
      <PageCard>
        <div className="max-w-2xl mx-auto space-y-5">
          <FormRow label="Select User Type">
            <select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                setSearchBy("");
              }}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              <option value="adminUser">Portal Admin</option>
              <option value="mds">Master Distributor</option>
              <option value="egen">E-Gen API</option>
            </select>
          </FormRow>

          {userType && (
            <FormRow label="Search By">
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="capsSelect w-80"
              >
                <option value="">Select</option>
                <option value="all">All</option>
                <option value="id">User ID</option>
              </select>
            </FormRow>
          )}

          {searchBy === "id" && (
            <FormRow label="Enter User ID">
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="capsInput w-80"
              />
            </FormRow>
          )}

          <div className="text-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="capsButton min-w-[200px]"
            >
              {loading ? "Loading..." : "SEARCH"}
            </button>
          </div>
        </div>
      </PageCard>

      {/* TABLE */}
      {showTable && (
        <PageCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border text-center">
              <thead className="bg-[#a74312] text-white">
                <tr>
                  <th rowSpan="2">S.N.</th>
                  <th rowSpan="2">
                    <input type="checkbox" onChange={toggleSelectAll} />
                  </th>
                  <th rowSpan="2">User ID</th>
                  <th rowSpan="2">Category</th>
                  <th colSpan="3">Prepaid Commission</th>
                  <th colSpan="2">AVID Status</th>
                  <th colSpan="2">Legal Verification</th>
                  <th rowSpan="2">Remark</th>
                </tr>

                <tr>
                  <th>Min Deposit</th>
                  <th>Min Rate</th>
                  <th>Slab</th>
                  <th>Block</th>
                  <th>Undertaking</th>
                  <th>PAN</th>
                  <th>Agreement</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border">
                    <td>{index + 1}</td>

                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => toggleRow(index)}
                      />
                    </td>

                    <td>{row.userID}</td>
                    <td>{row.userCategory}</td>

                    <td>
                      <input
                        value={row.userMinDeposite || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "userMinDeposite",
                            e.target.value,
                          )
                        }
                        className="capsInput w-24"
                      />
                    </td>

                    <td>
                      <input
                        value={row.userMinRate || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "userMinRate",
                            e.target.value,
                          )
                        }
                        className="capsInput w-24"
                      />
                    </td>

                    <td>-</td>

                    <td>
                      <select
                        value={row.userAVIDBlock || "N"}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "userAVIDBlock",
                            e.target.value,
                          )
                        }
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </td>

                    <td>
                      <select
                        value={row.userAVIDUndertaking || "N"}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "userAVIDUndertaking",
                            e.target.value,
                          )
                        }
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </td>

                    <td>
                      <select
                        value={row.userVerifyPan || "N"}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "userVerifyPan",
                            e.target.value,
                          )
                        }
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </td>

                    <td>
                      <select
                        value={row.userVerifyAgreement || "N"}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "userVerifyAgreement",
                            e.target.value,
                          )
                        }
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </td>

                    <td>
                      <input
                        value={row.userRemark || ""}
                        onChange={(e) =>
                          handleFieldChange(index, "userRemark", e.target.value)
                        }
                        className="capsInput w-32"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="capsButton"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </PageCard>
      )}
    </div>
  );
}

/* ================= FORM ROW ================= */

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium">{label}</div>
    <div>:</div>
    <div>{children}</div>
  </div>
);

export default UserInformationMaster;
