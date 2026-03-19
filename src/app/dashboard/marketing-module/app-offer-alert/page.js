"use client";

import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import Swal from "sweetalert2";

function AppOfferAlert() {
  /* ================= STATE ================= */
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [service, setService] = useState("");
  const [title, setTitle] = useState("");
  const [sentTo, setSentTo] = useState("ALL");
  const [agentFile, setAgentFile] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [imageFile, setImageFile] = useState(null);

  const [services, setServices] = useState([]);
  const [tableData, setTableData] = useState([]);

  /* ================= MOCK API ================= */
  useEffect(() => {
    setServices([
      { id: "1", name: "Addmoney" },
      { id: "2", name: "Recharge" },
    ]);

    setTableData([
      {
        offerName: "Test Offer",
        serviceName: "Addmoney",
        applicableOn: "ALL",
        from: "2025-01-01 10:00",
        to: "2025-01-02 10:00",
        active: "Active",
        file: "Download",
      },
    ]);
  }, []);

  /* ================= VALIDATION ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!service) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select Service",
      });
      return;
    }
    if (!title) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter Offer Title",
      });
      return;
    }
    if (!fromDate || !toDate) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select date/time",
      });
      return;
    }
    if (fromDate >= toDate) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "To Date must be greater than From Date",
      });
      return;
    }

    if (!imageFile) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please upload image",
      });
      return;
    }

    if (imageFile.size > 1048576) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Image size must be less than 1MB",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Offer Submitted",
        text: "Offer submitted successfully!",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6  min-h-screen text-[#226b88]">
      {/* HEADER CARD */}
      <CapsCard
        title="APP Offer Alert"
        description="Create and manage application offers"
      />

      {/* ================= FORM CARD ================= */}
      <PageCard>
        <div className="flex justify-center">
          {message && (
            <p className="text-center text-green-600 font-semibold mb-4">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <FormRow label="Select Service">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="capsSelect w-80"
              >
                <option value="">Select</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </FormRow>

            <FormRow label="Offer Title">
              <input
                className="capsInput w-80"
                value={title}
                maxLength={10}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormRow>

            <FormRow label="Sent To">
              <select
                value={sentTo}
                onChange={(e) => setSentTo(e.target.value)}
                className="capsSelect w-80"
              >
                <option value="ALL">All Agents</option>
                <option value="Selected">Selected Agents</option>
              </select>
            </FormRow>

            {sentTo === "Selected" && (
              <>
                <FormRow label="Full AgentId (.xls/.xlsx)">
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    className="capsInput w-80"
                    onChange={(e) => setAgentFile(e.target.files[0])}
                  />
                </FormRow>

                <div className="text-center mb-4">
                  <a href="#" className="font-semibold text-blue-600">
                    Download Sample Template
                  </a>
                </div>
              </>
            )}

            <FormRow label="From Date/Time">
              <input
                type="datetime-local"
                className="capsInput w-80"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </FormRow>

            <FormRow label="To Date/Time">
              <input
                type="datetime-local"
                className="capsInput w-80"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </FormRow>

            <FormRow label="Image">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="capsInput w-80"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </FormRow>

            <p className="text-center font-semibold mb-4">
              Note: Image size should be less than 1 MB (jpg/jpeg/png)
            </p>

            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="capsButton min-w-[120px]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </PageCard>

      {/* ================= TABLE CARD ================= */}
      <PageCard>
        <h3 className="capsText font-semibold mb-4 text-center">
          Scheduled Offers
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#226b88] text-sm">
            <thead>
              <tr className="capsColor text-center">
                {[
                  "Sr No",
                  "Notification Title",
                  "Service Name",
                  "Offer On",
                  "From",
                  "To",
                  "Image",
                  "Action",
                  "Download",
                ].map((h) => (
                  <th key={h} className="p-2 border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border">{row.offerName}</td>
                  <td className="p-2 border">{row.serviceName}</td>
                  <td className="p-2 border">{row.applicableOn}</td>
                  <td className="p-2 border">{row.from}</td>
                  <td className="p-2 border">{row.to}</td>
                  <td className="p-2 border">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">
                      View
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                      {row.active}
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs">
                      {row.file}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageCard>
    </div>
  );
}

/* ===== ALIGNED FORM ROW ===== */

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[250px_20px_1fr] items-center gap-4 mb-6">
    <label className="text-right font-medium">{label}</label>
    <div className="text-center">:</div>
    <div className="max-w-2xl">{children}</div>
  </div>
);

export default AppOfferAlert;
