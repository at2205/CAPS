"use client";

import React, { useState, useEffect } from "react";
import CapsCard from "@/app/components/caps_card/CapsCard";
import PageCard from "@/app/components/caps_card/PageCard";

const PopupUpload = () => {
    const [selectedChannel, setSelectedChannel] = useState("");
    const [selectedChannelType, setSelectedChannelType] = useState("");
    const [selectedLinkType, setSelectedLinkType] = useState("");
    const [notificationLink, setNotificationLink] = useState("");

    const [files, setFiles] = useState({});
    const [fileErrors, setFileErrors] = useState({});

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const [userId, setUserId] = useState("");
    const [portalId, setPortalId] = useState("");

    useEffect(() => {
        setUserId(sessionStorage.getItem("login"));
        setPortalId(localStorage.getItem("adminUserPortalId"));
    }, []);

    /* ================= FILE VALIDATION ================= */
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file || !["image/jpeg", "image/jpg"].includes(file.type)) {
            setFileErrors({ file: "Only JPG format allowed" });
            setFiles({});
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width === 1600 && img.height === 800) {
                setFiles({ file });
                setFileErrors({});
            } else {
                setFileErrors({ file: "Image must be 1600 × 800 px" });
                setFiles({});
            }
        };
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        let boxValue = "";
        if (selectedLinkType === "ELink") boxValue = "1";
        if (selectedLinkType === "ILink") boxValue = "2";
        if (selectedLinkType === "WLink") boxValue = "3";

        if (!selectedChannel || !selectedChannelType) {
            setError("Please select channel and type");
            setVisible(true);
            setLoading(false);
            return;
        }

        if (!selectedLinkType) {
            setError("Please select link type");
            setVisible(true);
            setLoading(false);
            return;
        }

        if ((boxValue === "1" || boxValue === "2") && !notificationLink) {
            setError("Please enter notification link");
            setVisible(true);
            setLoading(false);
            return;
        }

        if (!files.file) {
            setError("Please upload image");
            setVisible(true);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", files.file);
        formData.append("boxValue", boxValue);
        formData.append("channelValue", selectedChannelType);
        formData.append("portalId", portalId);
        formData.append("userId", userId);
        formData.append("channel", selectedChannel);

        if (boxValue !== "3") {
            formData.append("linkUrl", notificationLink);
        }

        try {
            const res = await fetch(
                "http://localhost:8281/popup/upload",
                { method: "POST", body: formData }
            );

            if (!res.ok) throw new Error();

            setSuccess("Popup uploaded successfully!");
            setVisible(true);
        } catch {
            setError("Upload failed");
            setVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setVisible(false);
        if (success) window.location.reload();
    };

    return (
        <div className="p-6 min-h-screen text-[#226b88]">

            <CapsCard
                title="Popup Upload"
                description="Upload popup banner for Web/App"
            />

            {/* CENTERED FORM */}


            <PageCard>
                <div className="flex flex-col items-center gap-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Select Channel */}
                        <FormRow label="Select Channel">
                            <select
                                value={selectedChannel}
                                onChange={(e) => setSelectedChannel(e.target.value)}
                                className="capsSelect w-80"
                            >
                                <option value="">Select</option>
                                <option value="Retailer">Retailer</option>
                                <option value="ds">Distributor</option>
                                <option value="mds">Master Distributor</option>
                            </select>
                        </FormRow>

                        {/* Channel Type */}
                        {selectedChannel && (
                            <FormRow label="Channel Type">
                                <select
                                    value={selectedChannelType}
                                    onChange={(e) =>
                                        setSelectedChannelType(e.target.value)
                                    }
                                    className="capsSelect  w-80"
                                >
                                    <option value="">Select</option>
                                    <option value="Web">WEB</option>
                                    <option value="App">APP</option>
                                </select>
                            </FormRow>
                        )}

                        {/* Link Type */}
                        {selectedChannelType && (
                            <FormRow label="Link Type">
                                <select
                                    value={selectedLinkType}
                                    onChange={(e) =>
                                        setSelectedLinkType(e.target.value)
                                    }
                                    className="capsSelect  w-80"
                                >
                                    <option value="">Select</option>
                                    <option value="ELink">External Link</option>
                                    <option value="ILink">Internal Link</option>
                                    <option value="WLink">Without Link</option>
                                </select>
                            </FormRow>
                        )}

                        {/* Notification Link */}
                        {(selectedLinkType === "ELink" ||
                            selectedLinkType === "ILink") && (
                                <FormRow label="Notification Link">
                                    <input
                                        type="text"
                                        value={notificationLink}
                                        onChange={(e) =>
                                            setNotificationLink(e.target.value)
                                        }
                                        className="capsInput  w-80"
                                    />
                                </FormRow>
                            )}

                        {/* Image Upload */}
                        {selectedChannelType === "Web" && (
                            <FormRow label="Slider (1600 × 800 px)">
                                <div>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg"
                                        onChange={handleFileChange}
                                        disabled={loading}
                                        className={` w-80 ${fileErrors.file
                                                ? "capsInputError"
                                                : "capsInput"
                                            }`}
                                    />

                                    <p className="text-xs text-gray-500 mt-1">
                                        .jpg format only
                                    </p>

                                    {fileErrors.file && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {fileErrors.file}
                                        </p>
                                    )}
                                </div>
                            </FormRow>
                        )}

                        {/* Submit */}
                        {selectedChannelType && (
                            <div className="text-center pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="capsButton min-w-[140px]"
                                >
                                    {loading ? "Uploading..." : "Submit"}
                                </button>
                            </div>
                        )}

                    </form>
                </div>
            </PageCard>



            {/* Modal */}
            {visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            {success ? "Success" : "Error"}
                        </h3>

                        <p className={success ? "text-green-600" : "text-red-600"}>
                            {success || error}
                        </p>

                        <div className="text-right mt-4">
                            <button onClick={closeModal} className="capsButton">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

/* REUSABLE PERFECT ALIGN ROW */
const FormRow = ({ label, children }) => (
    <div className="grid grid-cols-[180px_20px_1fr] items-center gap-4">
        <div className="text-right font-medium whitespace-nowrap">
            {label}
        </div>
        <div className="text-center">:</div>
        <div>{children}</div>
    </div>
);

export default PopupUpload;
