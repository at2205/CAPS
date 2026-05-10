"use client";

import React, { useEffect, useState } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";
import axiosInstance from "@/utilities/axiosInstance/axios";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

function SelfProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    companyType: "",
    companyName: "",
    emailId: "",
    mobileNo: "",
    addressLine1: "",
    addressLine2: "",
    country: "India",
    state: "",
    district: "",
    city: "",
    pincode: "",
    panNo: "",
  });

  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  /* ---------------- FETCH STATES ---------------- */
  const fetchStates = async () => {
    try {
      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.getStateDistrict,
      );

      console.log("STATE API RESPONSE:", res.data);
      if (res.data.status === "0") {
        const apiData = res.data.data || {};

        // const grouped = {};

        // apiData.forEach((item) => {
        //   if (!grouped[item.state]) {
        //     grouped[item.state] = [];
        //   }
        //   grouped[item.state].push(item.district);
        // });

        const formattedStates = Object.keys(grouped).map((key) => ({
          state: key,
          districts: grouped[key],
        }));

        setStateList(formattedStates);
      }
    } catch (err) {
      console.log("State fetch error", err);
    }
  };
  /* ---------------- FETCH PROFILE ---------------- */
  const loadProfile = async () => {
    try {
      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.viewSelfProfile,
        {
          adminId: localStorage.getItem("userId"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      const data = res.data;

      setFormData({
        firstName: data.fName || "",
        lastName: data.lName || "",
        dob: data.dob || "",
        gender: data.gender || "",
        companyType: data.companyType || "",
        companyName: data.companyName || "",
        emailId: data.emailId || "",
        mobileNo: data.mobileNo || "",
        addressLine1: data.address1 || "",
        addressLine2: data.address2 || "",
        state: data.state || "",
        district: data.district || "",
        city: data.city || "",
        pincode: data.pincode || "",
        panNo: data.panNo || "",
      });
    } catch (err) {
      console.log("Profile load error", err);
    }
  };
  useEffect(() => {
    loadProfile();
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state && stateList.length > 0) {
      const districts =
        stateList.find((s) => s.state === formData.state)?.districts || [];

      setDistrictList(districts);
    }
  }, [formData.state, stateList]);

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    if (!formData.firstName) return "First Name required";
    if (!formData.lastName) return "Last Name required";
    if (!formData.gender) return "Select Gender";
    if (!formData.companyType) return "Select Company Type";
    if (!formData.mobileNo) return "Enter Mobile";
    if (!formData.addressLine1) return "Enter Address";
    if (!formData.state) return "Select State";
    if (!formData.city) return "Enter City";
    if (!formData.pincode) return "Enter Pincode";
    return null;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      Swal.fire("Error", error, "warning");
      return;
    }

    try {
      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.updateSelfProfile,
        formData,
      );

      if (res.data.status === "0") {
        Swal.fire("Success", "Profile Updated", "success");
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Update Failed", "error");
    }
  };
  /* ---------------- EMAIL CHECK ---------------- */
  const checkEmail = async () => {
    try {
      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.checkEmailPhone,
        {
          emailId: formData.emailId,
          adminId: localStorage.getItem("userId"),
        },
      );

      if (res.data.status === "0") {
        Swal.fire("Valid", "Email is available", "success");
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {}
  };

  /* ---------------- MOBILE CHECK ---------------- */
  const checkMobile = async () => {
    try {
      const res = await axiosInstance.post(
        endpoints.controlPEndpoints.checkEmailPhone,
        {
          officialNumber: formData.mobileNo,
          adminId: localStorage.getItem("userId"),
        },
      );
      if (res.data.status === "0") {
        Swal.fire("Valid", "Mobile is available", "success");
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {}
  };

  const handleStateChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      state: value,
      district: "",
    });

    const districts = stateList.find((s) => s.state === value)?.districts || [];

    setDistrictList(districts);
  };

  return (
    <div className="p-6 min-h-screen text-[#226b88]">
      <CapsCard title="Self Profile" description="Update Your Details" />

      <PageCard>
        <div className="w-full max-w-[600px] mx-auto space-y-5">
          {/* ---------------- PERSONAL DETAILS ---------------- */}
          <h2 className="text-center font-bold text-lg bg-[#226b88] text-white p-2 rounded">
            Personal Details
          </h2>

          <FormRow label="First Name">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          <FormRow label="Last Name">
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          <FormRow label="Date of Birth">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="capsInput w-80"
              max={new Date().toISOString().split("T")[0]}
            />
          </FormRow>

          <FormRow label="Gender">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </FormRow>

          <FormRow label="Company Type">
            <select
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              <option>Proprietorship</option>
              <option>Partnership</option>
              <option>Private Limited</option>
              <option>NGO</option>
            </select>
          </FormRow>

          <FormRow label="Company Name">
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          <FormRow label="Email">
            <div className="flex gap-2">
              <input
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="capsInput w-80"
              />
              <button onClick={checkEmail} className="capsButton">
                Check
              </button>
            </div>
          </FormRow>

          <FormRow label="Mobile">
            <div className="flex gap-2">
              <input
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="capsInput w-80"
              />
              <button onClick={checkMobile} className="capsButton">
                Check
              </button>
            </div>
          </FormRow>

          {/* ---------------- ADDRESS ---------------- */}
          <h2 className="text-center font-bold text-lg bg-[#226b88] text-white p-2 rounded">
            Address
          </h2>

          <FormRow label="Address Line 1">
            <input
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          <FormRow label="Address Line 2">
            <input
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          <FormRow label="Country">
            <input value="India" disabled className="capsInput w-80" />
          </FormRow>

          <FormRow label="State">
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              {stateList.map((s, i) => (
                <option key={i} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="District">
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="capsSelect w-80"
            >
              <option value="">Select</option>
              {districtList.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow label="City">
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          <FormRow label="Pincode">
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          {/* ---------------- PAN ---------------- */}
          <h2 className="text-center font-bold text-lg bg-[#226b88] text-white p-2 rounded">
            PAN Details
          </h2>

          <FormRow label="PAN Number">
            <input
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              className="capsInput w-80"
            />
          </FormRow>

          {/* ---------------- SUBMIT ---------------- */}
          <div className="text-center mt-6">
            <button onClick={handleSubmit} className="capsButton min-w-[220px]">
              Submit
            </button>
          </div>
        </div>
      </PageCard>
    </div>
  );
}

/* ---------------- FORM ROW ---------------- */
const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[200px_10px_1fr] items-center items-center gap-4">
    <div className="text-right font-medium">{label}</div>
    <div>:</div>
    <div>{children}</div>
  </div>
);

export default SelfProfile;
