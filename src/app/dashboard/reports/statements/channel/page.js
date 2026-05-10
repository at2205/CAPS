"use client";

import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function SChannel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [formValues, setFormValues] = useState({
    statementType: "",
    service: "",
    subService: "",
    txnStatus: "all",
    fromDate: "",
    toDate: "",
    select: "all",
    userId: "",
  });

  /* TODAY DATE */

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    setFormValues((prev) => ({
      ...prev,
      fromDate: today,
      toDate: today,
    }));
  }, []);

  /* INPUT CHANGE */

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  /* SERVICE LIST */

  useEffect(() => {
    if (
      formValues.statementType === "agent" ||
      formValues.statementType === "autoWBReport"
    ) {
      setServices(["Recharge", "DMT", "Billpay", "AEPS", "CMS"]);
    } else {
      setServices([]);
    }
  }, [formValues.statementType]);

  /* SUB SERVICE API */

  const loadSubService = async (mainService) => {
    try {
      const response = await axiosInstance.get(
        endpoints.reportsEndpoints.subService,
        { params: { mainService } },
      );

      if (response.data.status === "success") {
        setSubServices(response.data.data);
      } else {
        setSubServices([]);
      }
    } catch {
      setSubServices([]);
    }
  };

  useEffect(() => {
    if (formValues.service) {
      loadSubService(formValues.service);
    }
  }, [formValues.service]);

  /* VIEW API */

  const handleView = async () => {
    try {
      if (!formValues.statementType) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please select statement type",
        });
        return;
      }

      setLoading(true);
      setError("");
      setTableData([]);

      const payload = new URLSearchParams();

      payload.append("accountType", formValues.statementType);
      payload.append("fromDate", formValues.fromDate);
      payload.append("toDate", formValues.toDate);

      payload.append(
        "agentstmt",
        formValues.select === "IdWise" ? "idWise" : "all",
      );

      if (formValues.select === "IdWise") {
        payload.append("userId", formValues.userId);
      }

      payload.append("mainService", formValues.service);
      payload.append("subService", formValues.subService);
      payload.append("txnStatus", formValues.txnStatus);

      const response = await axiosInstance.post(
        endpoints.reportsEndpoints.viewAccountStatement,
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.data.status === "0") {
        setTableData(response.data.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Unable to fetch statement",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  /* DOWNLOAD */

  const handleDownload = async () => {
    try {
      if (!formValues.statementType) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please select statement type",
        });
        return;
      }

      setLoading(true);
      setError("");

      const payload = new URLSearchParams();

      payload.append("accountType", formValues.statementType);
      payload.append("fromDate", formValues.fromDate);
      payload.append("toDate", formValues.toDate);

      payload.append(
        "agentstmt",
        formValues.select === "IdWise" ? "idWise" : "all",
      );

      if (formValues.select === "IdWise") {
        payload.append("userId", formValues.userId);
      }

      payload.append("mainService", formValues.service);
      payload.append("subService", formValues.subService);
      payload.append("txnStatus", formValues.txnStatus);

      payload.append("service", formValues.service); // controller compatibility

      const response = await axiosInstance.post(
        endpoints.reportsEndpoints.downloadAccountStatement,
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.data.status === "success") {
        const fileResponse = await axiosInstance.get(
          response.data.downloadUrl,
          { responseType: "blob" },
        );

        const url = window.URL.createObjectURL(new Blob([fileResponse.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", response.data.fileName);

        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        Swal.fire({
          icon: "error",
          title: "Download Failed",
          text: response.data.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: err.response?.data?.message || "Download failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-[#226b88]">
      <CapsCard
        title="Statement > Channel"
        description="View and download channel statement"
      />

      <PageCard>
        <div className="flex justify-center">
          <div className="w-[520px] space-y-4">
            {/* Statement Type */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                Statement Type
              </label>

              <div className="text-center">:</div>

              <select
                id="statementType"
                value={formValues.statementType}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="">Select</option>

                <option value="adminUser">Admin Account Statement</option>
                <option value="adminUserdetail">
                  Admin Account Statement - Detailed
                </option>

                <option value="mds">MD Account Statement</option>
                <option value="mdsdetail">
                  MD Account Statement - Detailed
                </option>

                <option value="ds">Distributor Account Statement</option>
                <option value="dsdetail">
                  Distributor Account Statement - Detailed
                </option>

                <option value="pgServiceForms">PG Service Forms</option>

                <option value="agent">Agent Account Statement</option>
                <option value="agentDMR">Agent DMR Account Statement</option>
                <option value="agentDetail">
                  Agent Account Statement - Detailed
                </option>
                <option value="agentEKYC">Agent E-KYC Statement</option>

                <option value="aeps">AEPS Account Statement</option>

                <option value="deactivateagentReport">
                  Deactive Agents made Active Report
                </option>

                <option value="cjTxnDetail">CJ Transaction Report</option>

                <option value="card">Card Account Statement</option>

                <option value="ppcCardScheme">Schemes Report</option>
                <option value="referralScheme">Referral Report</option>
                <option value="qrScheme">QR Code Report</option>

                <option value="loanReport">Loan Report</option>
                <option value="autoDisbursedLoanReport">
                  Auto-Disbursed Loan Report
                </option>

                <option value="loanMisReport">Loan MIS Report</option>

                <option value="autoWBReport">Auto WB Report</option>

                <option value="zopperInsurance">Zopper Insurance</option>

                <option value="holdingBalance">Holding Balance Report</option>

                <option value="billingReport">Billing Report</option>

                <option value="subscriptionPlanReport">
                  Subscription Plan Report
                </option>

                <option value="fundfinaLoanMISReport">
                  Loan MIS-Fundfina Report
                </option>

                <option value="activateDeactivate">
                  Service Activation & Deactivation Report
                </option>

                <option value="autoCDMTransactionReport">
                  Auto CDM Transaction Report
                </option>

                <option value="agentBlacklistedReport">
                  Blacklisted Agent Report
                </option>

                <option value="abhiInsuranceReport">ABHI Insurance</option>

                <option value="hospicashReport">SBIG Hospicash</option>

                <option value="creditCardReport">Credit Card Report</option>

                <option value="merchantCoverReport">
                  Merchant Cover Report
                </option>

                <option value="SBIHospicashReport">Hospicash Report</option>

                <option value="SuperHospicashReport">
                  Super Hospicash Report
                </option>

                <option value="AdityaBirlaReport">
                  Aditya Birla Embedded Report
                </option>

                <option value="GPAReport">GPA Report</option>
              </select>
            </div>

            {/* SERVICE */}

            {(formValues.statementType === "agent" ||
              formValues.statementType === "autoWBReport") && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Service
                </label>

                <div className="text-center">:</div>

                <select
                  id="service"
                  value={formValues.service}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">Select</option>

                  {services.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* SUB SERVICE */}

            {subServices.length > 0 && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  Sub Service
                </label>

                <div className="text-center">:</div>

                <select
                  id="subService"
                  value={formValues.subService}
                  onChange={handleInputChange}
                  className="capsInput"
                >
                  <option value="">Select</option>

                  {subServices.map((s, index) => (
                    <option key={index} value={s.mappedName}>
                      {s.originalName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* FROM DATE */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                From Date
              </label>

              <div className="text-center">:</div>

              <input
                type="date"
                id="fromDate"
                value={formValues.fromDate}
                onChange={handleInputChange}
                className="capsInput"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* TO DATE */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">
                To Date
              </label>

              <div className="text-center">:</div>

              <input
                type="date"
                id="toDate"
                value={formValues.toDate}
                onChange={handleInputChange}
                className="capsInput"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* SELECT */}

            <div className="grid grid-cols-[200px_10px_1fr] items-center">
              <label className="text-sm font-semibold text-right">Select</label>

              <div className="text-center">:</div>

              <select
                id="select"
                value={formValues.select}
                onChange={handleInputChange}
                className="capsInput"
              >
                <option value="all">All</option>
                <option value="IdWise">ID-Wise</option>
              </select>
            </div>

            {/* USER ID */}

            {formValues.select === "IdWise" && (
              <div className="grid grid-cols-[200px_10px_1fr] items-center">
                <label className="text-sm font-semibold text-right">
                  User ID
                </label>

                <div className="text-center">:</div>

                <input
                  id="userId"
                  value={formValues.userId}
                  onChange={handleInputChange}
                  className="capsInput"
                />
              </div>
            )}

            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="text-center pt-2 space-x-3">
              <button onClick={handleView} className="capsButton px-6">
                VIEW
              </button>

              <button onClick={handleDownload} className="capsButton px-6">
                DOWNLOAD EXCEL
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}

        {tableData.length > 0 && (
          <div className="mt-6 overflow-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((key) => (
                    <th key={key} className="border px-2 py-1 bg-gray-100">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="border px-2 py-1">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageCard>
    </div>
  );
}

export default SChannel;
