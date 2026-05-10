'use client'
import CapsCard from '@/app/components/caps_card/CapsCard'
import PageCard from '@/app/components/caps_card/PageCard'
import Spinner from '@/app/components/Spinner';
import React, { useState } from 'react'
import urlencodedInstance from "@/utilities/axiosInstance/urlencodedInstance";
import endpoints from "@/utilities/apiUrl/apiEndPoints";
import Swal from "sweetalert2";

const initialFormState = {
    portalId: "",
    userType: "activityadmin",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    compType: "",
    compName: "",
    emailId: "",
    mobileNo: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    district: "",
    city: "",
    pinCode: "",
    panCard: "yes",
    panNo: ""
};


function activityUser() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const [formData, setFormData] = useState(initialFormState);

    // const handleSubmit = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 5000)
    // }


    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name);

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstErrorField = Object.keys(newErrors)[0];

            console.log(firstErrorField);

            const element = document.getElementById(firstErrorField);
            element?.focus();
            element?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            return;
        }
        // If no errors
        setLoading(true);
        try {
            const payload = { userId: localStorage.getItem("userId"), adminUserType: localStorage.getItem("adminUserType"), param: "registration", selectUser: formData.userType || "activityuser", firstName: formData.firstName, lastName: formData.lastName, dob: formData.dob, gender: formData.gender, companyType: formData.compType, companyName: formData.compName, emailId: formData.emailId, officialNumber: formData.mobileNo, addressLine1: formData.addressLine1, addressLine2: formData.addressLine2, country: formData.country, state: formData.state, district: formData.district, city: formData.city, pincode: formData.pinCode, panNo: formData.panNo };
            const response = await urlencodedInstance.post(endpoints.activityEndpoints.adminUserRegistration, payload);
            const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            if (data.AdminUserRegDetailsMap) { Swal.fire({ icon: "success", title: "Success", text: data.message || "User registered." }); setFormData(initialFormState); }
            else { Swal.fire({ icon: "error", title: "Failed", text: data.message || "Registration failed." }); }
        } catch { Swal.fire({ icon: "error", title: "Error", text: "Something went wrong." }); } finally { setLoading(false); }
    };


    const validateForm = (formData) => {
        let errors = {};

        console.log(formData);

        // Portal ID
        if (!formData?.portalId?.trim()) {
            errors.portalId = "Portal ID is required";
        }

        // First Name
        if (!formData?.firstName?.trim()) {
            errors.firstName = "First name is required";
        } else if (!/^[A-Za-z\s]+$/.test(formData?.firstName)) {
            errors.firstName = "First name should contain only letters";
        }

        // Last Name
        if (!formData?.lastName?.trim()) {
            errors.lastName = "Last name is required";
        } else if (!/^[A-Za-z\s]+$/.test(formData?.lastName)) {
            errors.lastName = "Last name should contain only letters";
        }

        // DOB
        if (!formData?.dob) {
            errors.dob = "Date of birth is required";
        }

        // Gender
        if (!formData?.gender) {
            errors.gender = "Please select gender";
        }

        // Company Type
        if (!formData?.compType) {
            errors.compType = "Company type is required";
        }

        // Company Name
        if (!formData?.compName?.trim()) {
            errors.compName = "Company name is required";
        }

        // Email
        if (!formData?.emailId?.trim()) {
            errors.emailId = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData?.emailId)
        ) {
            errors.emailId = "Invalid email address";
        }

        // Mobile
        if (!formData?.mobileNo?.trim()) {
            errors.mobileNo = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(formData?.mobileNo)) {
            errors.mobileNo = "Mobile number must be 10 digits";
        }

        // Address Line 1
        if (!formData?.addressLine1?.trim()) {
            errors.addressLine1 = "Address Line 1 is required";
        }

        // Country
        if (!formData?.country) {
            errors.country = "Country is required";
        }

        // State
        if (!formData?.state) {
            errors.state = "State is required";
        }

        // District
        if (!formData?.district) {
            errors.district = "District is required";
        }

        // City
        if (!formData?.city) {
            errors.city = "City is required";
        }

        // Pin Code (India format)
        if (!formData?.pinCode?.trim()) {
            errors.pinCode = "Pin code is required";
        } else if (!/^[0-9]{6}$/.test(formData.pinCode)) {
            errors.pinCode = "Pin code must be 6 digits";
        }

        // PAN conditional validation
        if (formData?.panCard === "yes") {
            if (!formData?.panNo?.trim()) {
                errors.panNo = "PAN number is required";
            } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData?.panNo)) {
                errors.panNo = "Invalid PAN format (e.g., ABCDE1234F)";
            }
        }

        return errors;
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setErrors({});

        // Optional: focus first input
        setTimeout(() => {
            document.getElementById("portalId")?.focus();
        }, 0);
    };




    // personal Details
    const fields = [
        // {
        //     label: "Select",
        //     name: "name",
        //     type: "select",
        //     options: ["Name 1", "Name 2", "Name 3"],
        // },
        { label: "Portal Id ", ipm: "*", name: "portalId", type: "text" },
        { label: "User Type", ipm: "", name: "userType", type: "text", readOnly: 'ture' },
        { label: "First Name ", ipm: "*", name: "firstName", type: "text" },
        { label: "Last Name", ipm: "*", name: "lastName", type: "text" },
        { label: "Date of Birth", ipm: "*", name: "dob", type: "text" },
        { label: "Gender", ipm: "*", name: "gender", type: "select", options: ["Male", "Female"] },
        {
            label: "Company/Firm Type", ipm: "*", name: "compType",
            type: "select",
            options: ["Non-Registered Entity", "Proprietorship", "Partnership", "Private Limited", "Limited", "Society", "NGO", "Trust",]
        },
        { label: "Company/Firm/shop/name", ipm: "", name: "CompName", type: "text" }
    ];
    // address Details
    const fields1 = [
        { label: "Address line 1", ipm: "*", name: "addressLine1", type: "text" },
        { label: "Address line 2 ", ipm: "*", name: "addresLine1", type: "text" },
        { label: "Country", ipm: "*", name: "country", type: "select", options: ["India"] },
        { label: "State", ipm: "*", name: "state", type: "select", options: ["use from login details"] },
        { label: "District", ipm: "*", name: "district", type: "select from login detail" },
        { label: "City", ipm: "*", name: "city", type: "text" },
        { label: "Pin Code", ipm: "*", name: "pinCode", type: "text" }
    ];



    return (
        <div className="p-1 text-[#226b88]">
            <CapsCard
                title="Administrative User Registration"
                description="Add new CAPS user "
            />
            {/* main div */}
            <PageCard>
                <div className="w-full">
                    <div className="grid gap-2">
                        <div className=' bg-[#226b88] text-white text-center p-2 mb-2'>Personal Details</div>
                        <div className="flex justify-center">
                            <div className="grid gap-4 w-full max-w-2xl">
                                {fields.map((field) => (
                                    <div
                                        key={field.name}
                                        className="grid grid-cols-[190px_20px_1fr] gap-2 items-center"
                                    >
                                        <label htmlFor={field.name}>{field.label} <span className='text-red-500'>{field?.ipm}</span></label>
                                        <span>:</span>

                                        {field.type === "select" ? (
                                            <select
                                                id={field.name}
                                                name={field.name}
                                                value={formData[field?.name]}
                                                onChange={handleChange}
                                                className="w-80 capsSelect"
                                            >
                                                <option value="-1">Select {field.label}</option>
                                                {field.options?.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                value={formData[field?.name]}
                                                readOnly={field?.readOnly}
                                                onChange={handleChange}
                                                className="w-80 capsInput"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center relative">
                            <div className="grid gap-4 w-full max-w-2xl">
                                <div
                                    className="grid grid-cols-[190px_20px_1fr] gap-2 items-center"
                                >
                                    <label htmlFor="emailId">Email ID <span className='text-red-500'>*</span></label>
                                    <span>:</span>

                                    <input
                                        id={'emailId'}
                                        name={'emailId'}
                                        type={'text'}
                                        value={formData?.emailId}
                                        onChange={handleChange}
                                        className="w-80 capsInput "
                                    />

                                </div>
                            </div>
                            <p className='text-red-400 cursor-pointer absolute top-1/3 right-1/10 '>Check Availability</p>
                        </div>

                        <div className="flex justify-center relative">
                            <div className="grid gap-4 w-full max-w-2xl">
                                <div
                                    className="grid grid-cols-[190px_20px_1fr] gap-2 items-center"
                                >
                                    <label htmlFor="mobileNo">Mobile Number</label>
                                    <span>:</span>

                                    <input
                                        id={'mobileNo'}
                                        name={'mobileNo'}
                                        type={'text'}
                                        value={formData?.mobileNo}
                                        onChange={handleChange}
                                        className="w-80 capsInput "
                                    />

                                </div>
                            </div>
                            <p className='text-red-400 cursor-pointer absolute top-1/3 right-1/10'>Check Availability</p>
                        </div>
                        <div className=' bg-[#226b88] text-white text-center p-2 mb-2'>Address Details</div>
                        <div className="flex justify-center">
                            <div className="grid gap-4 w-full max-w-2xl">
                                {fields1.map((field) => (
                                    <div
                                        key={field.name}
                                        className="grid grid-cols-[190px_20px_1fr] gap-2 items-center"
                                    >
                                        <label htmlFor={field.name}>{field.label}<span className='text-red-500'>{field?.ipm}</span></label>
                                        <span>:</span>

                                        {field.type === "select" ? (
                                            <select
                                                id={field.name}
                                                name={field.name}
                                                value={formData[field?.name]}
                                                onChange={handleChange}
                                                className="w-80 capsSelect"
                                            >
                                                <option value="">Select {field.label}</option>
                                                {field.options?.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                value={formData[field?.name]}
                                                onChange={handleChange}
                                                className="w-80 capsInput"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className=' bg-[#226b88] text-white text-center p-2 mb-2'>PAN Details</div>
                        <div className="flex justify-center ">
                            <div className="grid gap-4 w-full max-w-2xl">
                                <div
                                    className="grid grid-cols-[190px_20px_1fr] gap-2 items-center"
                                >
                                    <label>PAN Card <small>(Available On Your Name)</small> <span className='text-red-500'>*</span></label>
                                    <span>:</span>

                                    <div className="flex items-center gap-6">

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="panCard"
                                                value="yes"
                                                checked={formData.panCard === "yes"}
                                                onChange={handleChange}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <span>Yes</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="panCard"
                                                value="no"
                                                checked={formData.panCard === "no"}
                                                onChange={handleChange}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <span>No</span>
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* dynamic pan input box */}
                        {
                            formData?.panCard === 'yes' ? (
                                <div className="flex justify-center ">
                                    <div className="grid gap-4 w-full max-w-2xl">
                                        <div
                                            className="grid grid-cols-[190px_20px_1fr] gap-2 items-center"
                                        >
                                            <label htmlFor="mobileNo">PAN Number<span className='text-red-500'>*</span></label>
                                            <span>:</span>

                                            <input
                                                id={'panNo'}
                                                name={'panNo'}
                                                type={'text'}
                                                value={formData?.panNo}
                                                onChange={handleChange}
                                                className="w-80 capsInput "
                                            />

                                        </div>
                                    </div>
                                </div>

                            ) : (
                                null
                            )
                        }
                        {/* buttons portions */}
                        <div>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="capsButton min-w-[100px] flex items-center justify-center"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Spinner />
                                            Submitting...
                                        </span>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="capsButton min-w-[100px] flex items-center justify-center"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageCard>
        </div>
    )
}

export default activityUser