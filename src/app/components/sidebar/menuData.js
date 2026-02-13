export const menuItems = [
    {
        index: 1,
        label: "Activity",
        children: [
            {
                label: "User Registration",
                children: [
                    {
                        label: "Internal User",
                        url: "/dashboard/activity/user-registration/internal-user"
                    },
                    {
                        label: "Corporate User",
                        url: "/dashboard/activity/user-registration/corporate-user"
                    },
                    {
                        label: "Retail User",
                        url: "/dashboard/activity/user-registration/retail-user"
                    },

                ]
            },
            {
                label: "Admin Task",
                children: [
                    {
                        label: "Online Sign Agreement PDF"
                    },
                    {
                        label: "Online Sign Agreement Report"
                    },
                    {
                        label: "Activity Assignment"
                    },
                    {
                        label: "Category Assignment"
                    },
                    {
                        label: "Scheduler Run"
                    },
                    {
                        label: "DB Tasks"
                    },
                    {
                        label: "Closing Balance"
                    },
                ]
            },
            {
                label: "Trade Balance Activity",
                children: [
                    {
                        label: "Super Admin"
                    },
                    {
                        label: "Finance Admin"
                    },
                    {
                        label: "Client Activity"
                    },
                    {
                        label: "Bank Excel Upload "
                    },
                    {
                        label: "Autherized Client Activity"
                    },
                    {
                        label: "Schedule Auto Debit"
                    },
                    {
                        label: "Auto CDM Transaction"
                    },
                ]
            },
            {
                label: "KYC Management",
                children: [
                    {
                        label: "KYC Request"
                    }, {
                        label: "KYC Verification"
                    }, {
                        label: "View KYC Documents"
                    },
                ]
            },
            {
                label: "PG TB",
                children: [
                    {
                        label: "PG Status Change"
                    },
                    {
                        label: "PG TBRequest Activity"
                    },
                    {
                        label: "PG User Action",
                        children: [
                            {
                                label: "PG User Limit"
                            },
                            {
                                label: "PG User Auth"
                            },
                        ]
                    },
                    {
                        label: "PG Settlement User Limit"
                    },
                    {
                        label: "PG Service Activation",
                        children: [
                            {
                                label: "Payment Gateway"
                            },
                            {
                                label: "Payment Gateway Mode"
                            },
                        ]
                    },
                    {
                        label: "Enable/Disable PG Form"
                    },
                    {
                        label: "PG Charge Back"
                    },

                ]
            },
            {
                label: "Move Entity",
                children: [
                    {
                        label: "RO Mapping"
                    },
                    {
                        label: "DS Mapping"
                    },
                ]
            },
            {
                label: "Pricing Plan",
                // children: [
                //     { label: "SubSub B-1-1" },
                // ]
            },
            {
                label: "Assign Plan",

            },
            {
                label: "Active/Deactive Service",

            },
            {
                label: "QR Code",
                children: [
                    { label: "Maker" },
                    { label: "Approver" },
                    { label: "View List" },
                ]
            },
            {
                label: "Billing",
                children: [
                    {
                        label: "Billing Request"
                    },
                    {
                        label: "Billing Summary"
                    },

                ]
            },
            {
                label: "Agent Blacklisting",

            },
            {
                label: "MATM Management",
                children: [
                    {
                        label: "MATM Activation Request"
                    },
                    {
                        label: "View MATM Documents"
                    },

                ]
            },
            {
                label: "User Tracking Details",
            },
            {
                label: "Unblock User OTP",
            },
        ]
    },
    {
        index: 2,
        label: "Control Panel",
        children: [
            {
                label: "Profile Management",
                children: [
                    {
                        label: "Self Profile"
                    },
                    {
                        label: "Wallet Load Mapping"
                    },
                    {
                        label: "API Agent Mapping"
                    },
                    {
                        label: "Internal User"
                    },
                    {
                        label: "Corporate User"
                    },
                    {
                        label: "Retail User"
                    },


                ]
            },
            {
                label: "Cut-Off Management",
                children: [
                    {
                        label: "Set Cut-Off Management"
                    },
                    {
                        label: "View Cut-Off Management"
                    },
                ]
            },

            {
                label: "Inventory Management",
                children: [
                    {
                        label: "Car Booking"
                    },
                    {
                        label: "Holidays Packages"
                    },
                    {
                        label: "Holidays Controller"
                    },
                ]
            },
            {
                label: "Vendor Management",
                children: [
                    {
                        label: "Channel"
                    },
                    {
                        label: "Fino Pull Money"
                    },
                    {
                        label: "Vendor Master Details"
                    },
                    {
                        label: "Vendor Transaction Report"
                    },
                    {
                        label: "Retail Pricing"
                    },
                    {
                        label: "API Pricing"
                    },
                    {
                        label: "AEPS API"
                    },
                    {
                        label: "PG"
                    },
                    {
                        label: "AEPS-Bankwise Pipe Change"
                    },
                    {
                        label: "RazorPay PG Mid"
                    },
                    {
                        label: "Retail Pricing-PG/Settlement"
                    },
                    {
                        label: "AEPS-Retailer Wise Pipe Change"
                    },
                    {
                        label: "Zone Wise Pipe Change"
                    },
                    {
                        label: "Billing Price Update"
                    },

                ]
            },
            {
                label: "SKU Management",
                children: [
                    {
                        label: "Edit SKU"
                    },
                    {
                        label: "Bulk Pricing"
                    },
                    {
                        label: "Copy Pricing"
                    },
                    {
                        label: "Scheme Management"
                    },
                    {
                        label: "Add SKU"
                    },
                    {
                        label: "Coupon Management"
                    },
                    {
                        label: "Coupon Status"
                    },
                ]
            },
            {
                label: "Manage AES API",
                children: [
                    {
                        label: "Client Operation Control"
                    },
                    {
                        label: "API Transaction Refund"
                    },
                    {
                        label: "Bulk API Transaction Refund"
                    },
                    {
                        label: "AES API Transaction Status"
                    },
                ]
            },
            {
                label: "Margin Set",
                children: [
                    {
                        label: "Client- MDS"
                    },
                    {
                        label: "Agent"
                    },
                    {
                        label: "API Client"
                    },

                ]
            },
            {
                label: "SlabWise Pricing Set",
                children: [
                    {
                        label: "MDS Pricing"
                    },
                    {
                        label: "API Client"
                    },
                ]
            },
            {
                label: "Account Management",
                children: [
                    {
                        label: "Account Adjustment"
                    },
                    {
                        label: "Comm/TDS Mgmt"
                    },
                    {
                        label: "Bulk Comm/TDS Mgmt"
                    },
                    {
                        label: "Bulk-billing/Cashback"
                    },
                    {
                        label: "Refund"
                    },
                    {
                        label: "Bulk Refund"
                    },
                    {
                        label: "Bulk Loan Distribution"
                    },
                ]
            },
            {
                label: "Add/Modify IFSC Code",
                children: [
                    {
                        label: "Other"
                    },
                    {
                        label: "APMahesh"
                    },
                ]
            },

            {
                label: "Pricing Module",
                children: [
                    {
                        label: "Create Price Plan"
                    },
                    {
                        label: "Apply Price Plan"
                    },

                ]
            },

            {
                label: "More...",
                children: [
                    {
                        label: "Status Change",
                    },
                    {
                        label: "Sales Profiling",
                    },
                    {
                        label: "Park Transactions",
                    },
                    {
                        label: "Set Markup",
                    },
                    {
                        label: "Add/Modify Yes BC ID",
                    },
                    {
                        label: "DMT Refund OTP",
                    },
                    {
                        label: "Settlement ACC. KYC Upgrade",

                    },
                    {
                        label: "ISERVEU AEPS Onboarding",
                    },
                ]
            }
        ]
    },
    {
        index: 3,
        label: "Reports",
        children: [
            {
                label: "Transaction Reports ",
                children: [
                    {
                        label: "Channel"
                    },
                    {
                        label: "AES API"
                    },
                ]
            },
            {
                label: "Management Reports ",
                children: [
                    {
                        label: "Channel"
                    },
                    {
                        label: "AES API"
                    },
                ]
            },
            {
                label: "Finance Reports ",
                children: [
                    {
                        label: "Channel"
                    },
                    {
                        label: "AES API"
                    },
                ]
            },
            {
                label: "Statements",
                children: [
                    {
                        label: "Channel"
                    },
                    {
                        label: "AES API"
                    },
                ]
            },
            {
                label: "CC Module",
                children: [
                    {
                        label: "Transaction Status"
                    },
                    {
                        label: "CC-Information"
                    },
                    {
                        label: "User Search"
                    },
                ]
            },
            {
                label: "Logs Report",
                children: [
                    {
                        label: "Log Report"
                    },

                ]
            },
            {
                label: "Sender/Recipient Report",
            }
        ]
    },
    {
        index: 4,
        label: "Card Function",
        children: [
            {
                label: "Card Adjustment",

            },
            {
                label: "Kit Transfer To DS/RO/API/CORP",

            },
            {
                label: "Update Card Information",

            },
            {
                label: "Activate/Deactivate Card",

            },
            {
                label: "Card Reset Pin",

            },
            {
                label: "Get Card Details",

            },
            {
                label: "Refund Transaction",

            },
            {
                label: "Bulkrefund Transaction",

            },
            {
                label: "More...",
                children: [
                    {
                        label: "Update KYC",

                    },
                    {
                        label: "Card Txn Permission",

                    },
                    {
                        label: "Card Txn Permission Approval",

                    },
                    {
                        label: "Create MCC Card",

                    },
                    {
                        label: "Update MCC Card",

                    },
                    {
                        label: "Add Balance in CJ Portal",

                    },
                ]
            }
        ]
    },
    {
        index: 5,
        label: "DA Module",
        children: [
            {
                label: "User Search",

            },
            {
                label: "Profile Upload",

            },
            {
                label: "Sales Profiling",

            },
            {
                label: "Agent Geography Upload",

            },
            {
                label: "Capture Geo Location",

            },
        ]
    },
    {
        index: 6,
        label: "Customer Care Module",
        children: [
            {
                label: "Retail User- View",

            },
            {
                label: "PG TB",
                children: [
                    {
                        label: "PG User Limit -View"
                    }
                ]

            },
            {
                label: "Statements",

            },
            {
                label: "Aeps Reports",

            },
            {
                label: "View Complaints",

            },

        ]
    },
    {
        index: 7,
        label: "Marketing Module",
        children: [
            {
                label: "Notice-Alert",

            },
            {
                label: "Slider Upload",

            },
            {
                label: "App Slider Upload",

            },
            {
                label: "SPD Upload",

            },
            {
                label: "Popup Upload",

            },
            {
                label: "Mobile Notice-Alert",

            },
            {
                label: "App Offer Alert",

            },

        ]
    }

];
