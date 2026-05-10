"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function MobileNoticeAlert() {
  const [formData, setFormData] = useState({
    title: "",
    notificationType: "",
    message: "",
    sentTo: "",
    datetime: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const [notifications, setNotifications] = useState([]);

  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showExcel, setShowExcel] = useState(false);

  const [error, setError] = useState("");

  /* ---------------- FETCH NOTIFICATION LIST ---------------- */
  const loadNotifications = async () => {
    try {
      const res = await axiosInstance.get(endpoints.mobileAlertList);

      console.log("API RESPONSE:", res.data);

      if (Array.isArray(res.data)) {
        setNotifications(res.data);
      } else if (Array.isArray(res.data.data)) {
        setNotifications(res.data.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.log("Notification list error", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  /* ---------------- INPUT CHANGE ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- NOTIFICATION TYPE ---------------- */

  const handleNotificationType = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      notificationType: value,
    });

    if (value === "1") {
      setShowText(true);
      setShowImage(false);
    } else if (value === "2") {
      setShowText(false);
      setShowImage(true);
    } else if (value === "3") {
      setShowText(true);
      setShowImage(true);
    } else {
      setShowText(false);
      setShowImage(false);
    }
  };

  /* ---------------- SENT TO ---------------- */

  const handleSentTo = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      sentTo: value,
    });

    if (value === "Selected" || value === "selected-ds") {
      setShowExcel(true);
    } else {
      setShowExcel(false);
    }
  };

  /* ---------------- SUBMIT API ---------------- */

  const handleSubmit = async () => {
    if (!formData.title) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Enter notification title",
      });
      return;
    }

    if (!formData.notificationType) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Select notification type",
      });
      return;
    }

    if (!formData.sentTo) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Select Sent To",
      });
      return;
    }

    if (!formData.datetime) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Select notification date/time",
      });
      return;
    }

    try {
      const form = new FormData();

      form.append("titleName", formData.title);
      form.append("selectBox", formData.notificationType);
      form.append("sentToAgent", formData.sentTo);
      form.append("textBox", formData.message);
      form.append("notificationDate", formData.datetime);

      if (imageFile) {
        form.append("file1", imageFile);
      }
      
      if (excelFile) {
        form.append("file2", excelFile);
      }

      await axiosInstance.post(endpoints.mobileAlertUpload, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Notification Scheduled",
        text: "Notification scheduled successfully",
      });

      setFormData({
        title: "",
        notificationType: "",
        message: "",
        sentTo: "",
        datetime: "",
      });

      setImageFile(null);
      setExcelFile(null);

      loadNotifications();
    } catch (err) {
      console.log("Upload error", err);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err?.response?.data?.message || "Failed to submit notification",
      });
    }
  };

  /* ---------------- DOWNLOAD EXCEL ---------------- */

  const handleDownload = async (id) => {
    try {
      const res = await axiosInstance.get(
        `${endpoints.mobileAlertDownload}/${id}`,
      );

      window.open(res.data, "_blank");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download file",
      });
    }
  };

  /* ---------------- DEACTIVATE ---------------- */

  const handleDeactivate = async (id) => {
    try {
      await axiosInstance.post(`${endpoints.mobileAlertDeactivate}/${id}`);

      loadNotifications();
    } catch (err) {
      console.log("Deactivate error", err);
    }
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard
        title="Mobile Notice Alert"
        description="Send Notification to Agents / Distributors"
      />

      {/* ---------------- FORM ---------------- */}

      <PageCard>
        <div className="max-w-2xl mx-auto space-y-6">
          <FormRow label="Notification Title">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          <FormRow label="Select Notification Type">
            <select
              value={formData.notificationType}
              onChange={handleNotificationType}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              <option value="1">Text Notification</option>
              <option value="2">Image Notification</option>
              <option value="3">Link Notification</option>
            </select>
          </FormRow>

          {showText && (
            <FormRow label="Message / Link">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="capsInput w-80"
              />
            </FormRow>
          )}

          {showImage && (
            <FormRow label="Upload Image">
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </FormRow>
          )}

          <FormRow label="Sent To">
            <select
              value={formData.sentTo}
              onChange={handleSentTo}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              <option value="ALL">ALL Agents</option>
              <option value="Selected">Selected Agents</option>
              <option value="ALL-DS">All Distributors</option>
              <option value="selected-ds">Selected Distributors</option>
            </select>
          </FormRow>

          {showExcel && (
            <FormRow label="Upload Excel">
              <input
                type="file"
                onChange={(e) => setExcelFile(e.target.files[0])}
              />
            </FormRow>
          )}

          <FormRow label="Notification Date / Time">
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              className="capsInput w-80"
              max={new Date().toISOString().slice(0, 16)} 
            />
          </FormRow>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="text-center">
            <button onClick={handleSubmit} className="capsButton min-w-[220px]">
              Submit
            </button>
          </div>
        </div>
      </PageCard>

      {/* ---------------- TABLE ---------------- */}
  
      <PageCard>
        <h2 className="text-lg font-semibold mb-4">Scheduled Notification</h2>

        <div className="overflow-x-auto">
          <table className="w-full border text-center">
            <thead
              style={{
                background: "#226b88",
                color: "#fff",
              }}
            >
              <tr>
                <th className="p-2 border">Sr No</th>

                <th className="p-2 border">Title</th>

                <th className="p-2 border">Type</th>

                <th className="p-2 border">User Type</th>

                <th className="p-2 border">Date</th>

                <th className="p-2 border">Download</th>

                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center">
                    No Notifications Found
                  </td>
                </tr>
              ) : (
                notifications.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{item.titleName}</td>
                    <td className="border p-2">{item.selectBox}</td>
                    <td className="border p-2">{item.sentToAgent}</td>
                    <td className="border p-2">{item.notificationDate}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDownload(item.id)}
                        className="capsButton"
                      >
                        Download
                      </button>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDeactivate(item.id)}
                        className="capsButton bg-red-500"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </PageCard>
    </div>
  );
}

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
    <div className="text-right font-medium">{label}</div>

    <div>:</div>

    <div>{children}</div>
  </div>
);

export default MobileNoticeAlert;
