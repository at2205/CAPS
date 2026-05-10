// Permission keys mirror legacy header.jsp adminServiceDetailsMap
// Used by Sidebar.js to show/hide menu items based on user permissions
export const menuItems = [
  {
    index: 1,
    label: "Activity",
    permKey: "activity",
    children: [
      {
        label: "User Registration",
        permKey: "UserRegistration",
        children: [
          {
            label: "Internal User",
            url: "/dashboard/activity/user-registration/internal-user",
          },
          {
            label: "Corporate User",
            url: "/dashboard/activity/user-registration/corporate-user",
          },
          {
            label: "Retail User",
            url: "/dashboard/activity/user-registration/retail-user",
          },
        ],
      },
      {
        label: "Admin Task",
        permKey: "AdminTasks",
        children: [
          {
            label: "Online Sign Agreement PDF",
            url: "/dashboard/activity/admin-task/online-sign-agreement-pdf",
          },
          {
            label: "Online Sign Agreement Report",
            url: "/dashboard/activity/admin-task/online-sign-agreement-report",
          },
          {
            label: "Activity Assignment",
            url: "/dashboard/activity/admin-task/activity-assignment",
          },
          {
            label: "Category Assignment",
            url: "/dashboard/activity/admin-task/category-assignment",
          },
          {
            label: "Scheduler Run",
            url: "/dashboard/activity/admin-task/schedular-run",
          },
          {
            label: "DB Tasks",
            url: "/dashboard/activity/admin-task/db-tasks",
          },
          {
            label: "Closing Balance",
            url: "/dashboard/activity/admin-task/closing-balance",
          },
        ],
      },
      {
        label: "Trade Balance Activity",
        permKey: "TradeBalanceActivity",
        children: [
          {
            label: "Super Admin",
            url: "/dashboard/activity/trade-balance-activity/super-admin",
          },
          {
            label: "Finance Admin",
            url: "/dashboard/activity/trade-balance-activity/finance-admin",
          },
          {
            label: "Client Activity",
            url: "/dashboard/activity/trade-balance-activity/client-activity",
          },
          {
            label: "Bank Excel Upload ",
            url: "/dashboard/activity/trade-balance-activity/bank-excel-upload",
          },
          {
            label: "Autherized Client Activity",
            url: "/dashboard/activity/trade-balance-activity/autherized-client-activity",
          },
          {
            label: "Schedule Auto Debit",
            url: "/dashboard/activity/trade-balance-activity/schedule-auto-debit",
          },
          {
            label: "Auto CDM Transaction",
            url: "/dashboard/activity/trade-balance-activity/auto-cdm-transaction",
          },
        ],
      },
      {
        label: "KYC Management",
        permKey: "kycManagement",
        children: [
          {
            label: "KYC Request",
            url: "/dashboard/activity/kyc-management/kyc-request",
          },
          {
            label: "KYC Verification",
            url: "/dashboard/activity/kyc-management/kyc-verification",
          },
          {
            label: "View KYC Documents",
            url: "/dashboard/activity/kyc-management/view-kyc-documents",
          },
        ],
      },
      {
        label: "PG TB",
        children: [
          {
            label: "PG Status Change",
            url: "/dashboard/activity/pg-tb/pg-status-change",
          },
          {
            label: "PG TBRequest Activity",
            url: "/dashboard/activity/pg-tb/pg-tbrequest-activity",
          },
          {
            label: "PG User Action",
            children: [
              {
                label: "PG User Limit",
                url: "/dashboard/activity/pg-tb/pg-user-action/pg-user-limit",
              },
              {
                label: "PG User Auth",
                url: "/dashboard/activity/pg-tb/pg-user-action/pg-user-auth",
              },
            ],
          },
          {
            label: "PG Settlement User Limit",
            url: "/dashboard/activity/pg-tb/pg-settlement-user-limit",
          },
          {
            label: "PG Service Activation",
            children: [
              {
                label: "Payment Gateway",
                url: "/dashboard/activity/pg-tb/pg-service-activation/payment-gateway",
              },
              {
                label: "Payment Gateway Mode",
                url: "/dashboard/activity/pg-tb/pg-service-activation/pg-service-activation-payment-gateway-mode",
              },
            ],
          },
          {
            label: "Enable/Disable PG Form",
            url: "/dashboard/activity/pg-tb/enable-disable-pg-form",
          },
          {
            label: "PG Charge Back",
            url: "/dashboard/activity/pg-tb/pg-charge-back",
          },
        ],
      },
      {
        label: "Move Entity",
        permKey: "MoveEntity",
        children: [
          {
            label: "RO Mapping",
            url: "/dashboard/activity/move-entity/ro-mapping",
          },
          {
            label: "DS Mapping",
            url: "/dashboard/activity/move-entity/ds-mapping",
          },
        ],
      },
      {
        label: "Pricing Plan",
        url: "/dashboard/activity/pricing-plan",
      },
      {
        label: "Assign Plan",
        url: "/dashboard/activity/assign-plan",
      },
      {
        label: "Active/Deactive Service",
        url: "/dashboard/activity/active-deactive-service",
      },
      {
        label: "QR Code",
        permKey: "qrCode",
        children: [
          { label: "Maker", url: "/dashboard/activity/qr-code/marker" },
          { label: "Approver", url: "/dashboard/activity/qr-code/approver" },
          { label: "View List", url: "/dashboard/activity/qr-code/view-list" },
        ],
      },
      {
        label: "Billing",
        permKey: "billingNew",
        children: [
          {
            label: "Billing Request",
            url: "/dashboard/activity/billing/billing-request",
          },
          {
            label: "Billing Summary",
            url: "/dashboard/activity/billing/billing-summary",
          },
        ],
      },
      {
        label: "Agent Blacklisting",
        url: "/dashboard/activity/agent-blacklisting",
      },
      {
        label: "MATM Management",

        children: [
          {
            label: "MATM Activation Request",
            url: "/dashboard/activity/matm-management/matm-activation-request",
          },
          {
            label: "View MATM Documents",
            url: "/dashboard/activity/matm-management/view-matm-document",
          },
        ],
      },
      {
        label: "User Tracking Details",
        url: "/dashboard/activity/user-tracking-details",
      },
      {
        label: "Unblock User OTP",
        url: "/dashboard/activity/unblock-user-otp",
      },
    ],
  },
  {
    index: 2,
    label: "Control Panel",
    children: [
      {
        label: "Profile Management",
        children: [
          {
            label: "Self Profile",
            url: "/dashboard/control-panel/profile-management/self-profile",
          },
          {
            label: "Wallet Load Mapping",
            url: "/dashboard/control-panel/profile-management/wallet-load-mapping",
          },
          {
            label: "API Agent Mapping",
            url: "/dashboard/control-panel/profile-management/api-agent-mapping",
          },
          {
            label: "Internal User",
            url: "/dashboard/control-panel/profile-management/internal-user",
          },
          {
            label: "Corporate User",
            url: "/dashboard/control-panel/profile-management/corporate-user",
          },
          {
            label: "Retail User",
            url: "/dashboard/control-panel/profile-management/retail-user",
          },
        ],
      },
      {
        label: "Cut-Off Management",
        children: [
          {
            label: "Set Cut-Off Management",
            url: "/dashboard/control-panel/cut-off-management/set-cut-off-management",
          },
          {
            label: "View Cut-Off Management",
            url: "/dashboard/control-panel/cut-off-management/view-cut-off-management",
          },
        ],
      },

      // {
      //     label: "Inventory Management",
      //     children: [
      //         {
      //             label: "Car Booking",
      //             url: "/dashboard/control-panel/inventory-management/car-booking"
      //         },
      //         {
      //             label: "Holidays Packages",
      //             url: "/dashboard/control-panel/inventory-management/holidays-packages"
      //         },
      //         {
      //             label: "Holidays Controller",
      //             url: "/dashboard/control-panel/inventory-management/holidays-controllers"
      //         },
      //     ]
      // },
      {
        label: "Vendor Management",
        children: [
          {
            label: "Channel",
            url: "/dashboard/control-panel/vendor-management/channel",
          },
          {
            label: "Fino Pull Money",
            url: "/dashboard/control-panel/vendor-management/fino-pull-money",
          },
          // {
          //     label: "Vendor Master Details",
          //     url: "/dashboard/control-panel/vendor-management/vendor-master-details"
          // },
          // {
          //     label: "Vendor Transaction Report",
          //     url: "/dashboard/control-panel/vendor-management/vendor-transaction-report"
          // },
          {
            label: "Retail Pricing",
            url: "/dashboard/control-panel/vendor-management/retail-pricing",
          },
          {
            label: "API Pricing",
            url: "/dashboard/control-panel/vendor-management/api-pricing",
          },
          {
            label: "AEPS API",
            url: "/dashboard/control-panel/vendor-management/aes-api",
          },
          {
            label: "PG",
            url: "/dashboard/control-panel/vendor-management/pg",
          },
          {
            label: "AEPS-Bankwise Pipe Change",
            url: "/dashboard/control-panel/vendor-management/aeps-bankwise-pipe-change",
          },
          {
            label: "RazorPay PG Mid",
            url: "/dashboard/control-panel/vendor-management/razor-pay-pg-mid",
          },
          {
            label: "Retail Pricing-PG/Settlement",
            url: "/dashboard/control-panel/vendor-management/retail-pricing-pg-settlement",
          },
          {
            label: "AEPS-Retailer Wise Pipe Change",
            url: "/dashboard/control-panel/vendor-management/aeps-retailer-wise-pipe-change",
          },
          {
            label: "Zone Wise Pipe Change",
            url: "/dashboard/control-panel/vendor-management/zone-wise-pipe-change",
          },
          {
            label: "Billing Price Update",
            url: "/dashboard/control-panel/vendor-management/villing-price-update",
          },
        ],
      },
      {
        label: "SKU Management",
        children: [
          {
            label: "Edit SKU",
            url: "/dashboard/control-panel/sku-management/edit-sku",
          },
          {
            label: "Bulk Pricing",
            url: "/dashboard/control-panel/sku-management/bulk-pricing",
          },
          {
            label: "Copy Pricing",
            url: "/dashboard/control-panel/sku-management/copy-pricing",
          },
          {
            label: "Scheme Management",
            url: "/dashboard/control-panel/sku-management/scheme-management",
          },
          {
            label: "Add SKU",
            url: "/dashboard/control-panel/sku-management/add-sku",
          },
          {
            label: "Coupon Management",
            url: "/dashboard/control-panel/sku-management/coupon-management",
          },
          {
            label: "Coupon Status",
            url: "/dashboard/control-panel/sku-management/coupon-status",
          },
        ],
      },
      {
        label: "Manage AES API",
        children: [
          // {
          //     label: "Client Operation Control",
          //     url: "/dashboard/control-panel/manage-aes-api/client-operator-control"
          // },
          {
            label: "API Transaction Refund",
            url: "/dashboard/control-panel/manage-aes-api/api-transaction-refund",
          },
          {
            label: "Bulk API Transaction Refund",
            url: "/dashboard/control-panel/manage-aes-api/bulk-api-transaction-refund",
          },
          {
            label: "AES API Transaction Status",
            url: "/dashboard/control-panel/manage-aes-api/aes-api-transaction-status",
          },
        ],
      },
      // {
      //     label: "Margin Set",
      //     children: [
      //         {
      //             label: "Client- MDS",
      //             url: "/dashboard/control-panel/margin-set/client-mps"
      //         },
      //         {
      //             label: "Agent",
      //             url: "/dashboard/control-panel/margin-set/agent"
      //         },
      //         {
      //             label: "API Client",
      //             url: "/dashboard/control-panel/margin-set/api-client"
      //         },

      //     ]
      // },
      // {
      //     label: "SlabWise Pricing Set",
      //     children: [
      //         {
      //             label: "MDS Pricing",
      //             url: "/dashboard/control-panel/slabwise-pricing-set/mds-pricing"
      //         },
      //         {
      //             label: "API Client",
      //             url: "/dashboard/control-panel/slabwise-pricing-set/api-client"
      //         },
      //     ]
      // },
      {
        label: "Account Management",
        children: [
          {
            label: "Account Adjustment",
            url: "/dashboard/control-panel/account-management/account-adjustment",
          },
          {
            label: "Comm/TDS Mgmt",
            url: "/dashboard/control-panel/account-management/comm-tds-mgmt",
          },
          {
            label: "Bulk Comm/TDS Mgmt",
            url: "/dashboard/control-panel/account-management/bulk-comm-tds-mgmt",
          },
          {
            label: "Bulk-billing/Cashback",
            url: "/dashboard/control-panel/account-management/bulk-billing-cashback",
          },
          {
            label: "Refund",
            url: "/dashboard/control-panel/account-management/bulk-refund",
          },
          {
            label: "Bulk Refund",
            url: "/dashboard/control-panel/account-management/bulk-refund",
          },
          {
            label: "Bulk Loan Distribution",
            url: "/dashboard/control-panel/account-management/bulk-loan-disbursement",
          },
        ],
      },
      {
        label: "Add/Modify IFSC Code",
        children: [
          {
            label: "Other",
            url: "/dashboard/control-panel/add-modify-ifsc-code/others",
          },
          {
            label: "APMahesh",
            url: "/dashboard/control-panel/add-modify-ifsc-code/ap-mahesh",
          },
        ],
      },

      // {
      //     label: "Pricing Module",
      //     children: [
      //         {
      //             label: "Create Price Plan",
      //             url: "/dashboard/control-panel/pricing-module/create-price-plan"
      //         },
      //         {
      //             label: "Apply Price Plan",
      //             url: "/dashboard/control-panel/pricing-module/apply-price-plan"
      //         },

      //     ]
      // },

      {
        label: "More...",
        children: [
          {
            label: "Status Change",
            url: "/dashboard/control-panel/status-change",
          },
          {
            label: "Sales Profiling",
            url: "/dashboard/control-panel/sales-profiling",
          },
          {
            label: "Park Transactions",
            url: "/dashboard/control-panel/park-transactions",
          },
          // {
          //     label: "Set Markup",
          //     url: "/dashboard/control-panel/set-markup"
          // },
          {
            label: "Add/Modify Yes BC ID",
            url: "/dashboard/control-panel/add-modify-yes-bc-id",
          },
          {
            label: "DMT Refund OTP",
            url: "/dashboard/control-panel/dmt-refund",
          },
          {
            label: "Settlement ACC. KYC Upgrade",
            url: "/dashboard/control-panel/settlement-acc-kyc-upgrade",
          },
          {
            label: "ISERVEU AEPS Onboarding",
            url: "/dashboard/control-panel/iserveu-aeps-onboarding",
          },
        ],
      },
    ],
  },
  {
    index: 3,
    label: "Reports",
    children: [
      {
        label: "Transaction Reports ",
        children: [
          {
            label: "Channel",
            url: "/dashboard/reports/transaction-reports/channel",
          },
          // {
          //     label: "AES API",
          //      url:  "/dashboard/reports/transaction-reports/aes-api"
          // },
        ],
      },
      // {
      //     label: "Management Reports ",
      //     children: [
      //         {
      //             label: "Channel",
      //              url:  "/dashboard/reports/management-reports/channel"
      //         },
      //         {
      //             label: "AES API",
      //              url:  "/dashboard/reports/management-reports/aes-api"
      //         },
      //     ]
      // },
      {
        label: "Finance Reports ",
        children: [
          {
            label: "Channel",
            url: "/dashboard/reports/finance-reports/channel",
          },
          // {
          //     label: "AES API",
          //      url:  "/dashboard/reports/finance-reports/aes-api"
          // },
        ],
      },
      {
        label: "Statements",
        children: [
          {
            label: "Channel",
            url: "/dashboard/reports/statements/channel",
          },
          {
            label: "AES API",
            url: "/dashboard/reports/statements/aes-api",
          },
        ],
      },
      {
        label: "CC Module",
        children: [
          {
            label: "Transaction Status",
            url: "/dashboard/reports/cc-module/transaction-status",
          },
          {
            label: "CC-Information",
            url: "/dashboard/reports/cc-module/cc-information",
          },
          {
            label: "User Search",
            url: "/dashboard/reports/cc-module/user-search",
          },
        ],
      },
      {
        label: "Logs Report",
        children: [
          {
            label: "Log Report",
            url: "/dashboard/reports/logs-report/log-report",
          },
        ],
      },
      // {
      //     label: "Sender/Recipient Report",
      //     url: "/dashboard/reports/sender-recipient-report"

      // }
    ],
  },
  // {
  //     index: 4,
  //     label: "Card Function",
  //     children: [
  //         {
  //             label: "Card Adjustment",

  //         },
  //         {
  //             label: "Kit Transfer To DS/RO/API/CORP",

  //         },
  //         {
  //             label: "Update Card Information",

  //         },
  //         {
  //             label: "Activate/Deactivate Card",

  //         },
  //         {
  //             label: "Card Reset Pin",

  //         },
  //         {
  //             label: "Get Card Details",

  //         },
  //         {
  //             label: "Refund Transaction",

  //         },
  //         {
  //             label: "Bulkrefund Transaction",

  //         },
  //         {
  //             label: "More...",
  //             children: [
  //                 {
  //                     label: "Update KYC",

  //                 },
  //                 {
  //                     label: "Card Txn Permission",

  //                 },
  //                 {
  //                     label: "Card Txn Permission Approval",

  //                 },
  //                 {
  //                     label: "Create MCC Card",

  //                 },
  //                 {
  //                     label: "Update MCC Card",

  //                 },
  //                 {
  //                     label: "Add Balance in CJ Portal",

  //                 },
  //             ]
  //         }
  //     ]
  // },
  {
    index: 5,
    label: "DA Module",
    children: [
      {
        label: "User Search",
        url: "/dashboard/da-module/user-search",
      },
      {
        label: "Profile Upload",
        url: "/dashboard/da-module/profile-upload",
      },
      {
        label: "Sales Profiling",
        url: "/dashboard/da-module/seles-profiling",
      },
      {
        label: "Agent Geography Upload",
        url: "/dashboard/da-module/agent-geography-upload",
      },
      {
        label: "Capture Geo Location",
        url: "/dashboard/da-module/capture-geo-location",
      },
    ],
  },
  {
    index: 6,
    label: "Customer Care Module",
    children: [
      {
        label: "Retail User- View",
        url: "/dashboard/customer-care-module/retail-user-view",
      },
      {
        label: "PG TB",
        children: [
          {
            label: "PG User Limit -View",
            url: "/dashboard/customer-care-module/pg-tb/pg-user-limit-view",
          },
        ],
      },
      {
        label: "Statements",
        url: "/dashboard/customer-care-module/statements",
      },
      {
        label: "Aeps Reports",
        url: "/dashboard/customer-care-module/aeps-reports",
      },
      {
        label: "View Complaints",
        url: "/dashboard/customer-care-module/view-complaints",
      },
    ],
  },
  {
    index: 7,
    label: "Marketing Module",
    children: [
      {
        label: "Notice-Alert",
        url: "/dashboard/marketing-module/notice-alert",
      },
      {
        label: "Slider Upload",
        url: "/dashboard/marketing-module/slider-upload",
      },
      {
        label: "App Slider Upload",
        url: "/dashboard/marketing-module/app-slider-upload",
      },
      {
        label: "SPD Upload",
        url: "/dashboard/marketing-module/spd-upload",
      },
      {
        label: "Popup Upload",
        url: "/dashboard/marketing-module/popup-upload",
      },
      {
        label: "Mobile Notice-Alert",
        url: "/dashboard/marketing-module/mobile-notice-alert",
      },
      {
        label: "App Offer Alert",
        url: "/dashboard/marketing-module/app-offer-alert",
      },
      {
        label: "Agent Categoury",
        url: "/dashboard/marketing-module/agent-categorization",
      },
    ],
  },
  {
    index: 8,
    label: "Travel Module",
    children: [
      {
        label: "IRCTC",
        children: [
          {
            label: "IRCTC Request",
            url: "/dashboard/travel-module/irctc/irctc-request",
          },
          {
            label: "IRCTC Refund",
            url: "/dashboard/travel-module/irctc/irctc-refund",
          },
        ],
      },
      {
        label: "Flight",
        children: [
          {
            label: "Flight Markup History",
            url: "/dashboard/travel-module/flight/flightMarkup",
          },
          
        ],
      },
    ],
  },
];
