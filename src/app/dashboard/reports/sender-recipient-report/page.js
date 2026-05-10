"use client";

import React, { useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";

function SenderRecipientReport() {

  const [mobileno, setMobileno] = useState("");
  const [recipientMob, setRecipientMob] = useState("");
  const [via, setVia] = useState("all");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportData, setReportData] = useState([]);

  const handleView = async () => {

    if (!mobileno && !recipientMob) {
      alert("Please enter Sender or Recipient number");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const payload = {
        mobileno: mobileno,
        recipientMob: recipientMob,
        via: via,
      };

      const params = new URLSearchParams();

      params.append("adminUserFormBean", JSON.stringify(payload));

      const response = await urlencodedInstance.post(
        endpoints.reportsEndpoints.getSenderReport,
        params
      );

      const data = JSON.parse(response.data);

      if (data.status === "success") {
        setReportData(data.data || []);
      } else {
        setReportData([]);
        setError("No data found");
      }

    } catch (err) {

      console.log(err);
      setError("Something went wrong");

    }

    setLoading(false);
  };

  const handleDownload = async () => {

    if (!mobileno && !recipientMob) {
      alert("Please enter Sender or Recipient number");
      return;
    }

    try {

      const payload = {
        mobileno: mobileno,
        recipientMob: recipientMob,
        via: via,
      };

      const params = new URLSearchParams();

      params.append("adminUserFormBean", JSON.stringify(payload));

      const response = await urlencodedInstance.post(
        endpoints.reportsEndpoints.getSenderReportDownload,
        params,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "SenderReport.xlsx");

      document.body.appendChild(link);

      link.click();

    } catch (err) {

      console.log(err);
      alert("Download failed");

    }

  };

  return (
    <div className="p-6 text-[#226b88]">

      <CapsCard
        title="Reports > Sender / Recipient Report"
        description="View transactions by sender or recipient"
      />

      <PageCard>

        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Sender Mobile
              </label>

              <div className="text-center">:</div>

              <input
                className="capsInput"
                value={mobileno}
                onChange={(e) => setMobileno(e.target.value)}
                placeholder="Enter sender mobile"
              />
            </div>

            <div className="text-center font-bold text-sm">OR</div>

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Recipient Mobile / Account
              </label>

              <div className="text-center">:</div>

              <input
                className="capsInput"
                value={recipientMob}
                onChange={(e) => setRecipientMob(e.target.value)}
                placeholder="Enter recipient"
              />
            </div>

            <div className="flex justify-center gap-10 text-sm font-semibold pt-2">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={via === "all"}
                  onChange={() => setVia("all")}
                />
                All
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={via === "pending"}
                  onChange={() => setVia("pending")}
                />
                Pending
              </label>

            </div>

            <div className="text-center pt-2 space-x-3">

              <button
                onClick={handleView}
                className="capsButton px-8"
                disabled={loading}
              >
                VIEW
              </button>

              <button
                onClick={handleDownload}
                className="capsButtonSecondary px-6"
              >
                DOWNLOAD
              </button>

            </div>

            {loading && (
              <p className="text-center text-gray-500 text-sm">
                Loading...
              </p>
            )}

            {error && (
              <p className="text-center text-red-500 text-sm">
                {error}
              </p>
            )}

            {reportData.length > 0 && (

              <div className="pt-4 overflow-x-auto">

                <table className="min-w-[900px] w-full border text-sm text-center">

                  <thead className="bg-gray-100">

                    <tr>
                      <th className="border px-3 py-2">Date</th>
                      <th className="border px-3 py-2">Time</th>
                      <th className="border px-3 py-2">Txn ID</th>
                      <th className="border px-3 py-2">Service</th>
                      <th className="border px-3 py-2">Amount</th>
                      <th className="border px-3 py-2">Action</th>
                      <th className="border px-3 py-2">Status</th>
                      <th className="border px-3 py-2">Remark</th>
                    </tr>

                  </thead>

                  <tbody>

                    {reportData.map((row, index) => (

                      <tr key={index}>

                        <td className="border">{row.date}</td>
                        <td className="border">{row.time}</td>
                        <td className="border">{row.tranId}</td>
                        <td className="border">{row.service}</td>
                        <td className="border font-semibold">{row.tranAmount}</td>
                        <td className="border">{row.action}</td>

                        <td className="border font-bold">

                          {row.tranStatus === "SUCCESS" ? (
                            <span className="text-green-600">SUCCESS</span>
                          ) : (
                            <span className="text-red-500">PENDING</span>
                          )}

                        </td>

                        <td className="border">{row.remark}</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </div>

      </PageCard>
    </div>
  );
}

export default SenderRecipientReport;