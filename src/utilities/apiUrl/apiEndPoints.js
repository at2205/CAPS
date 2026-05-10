const loginEndpoints = {
  login: "/login/sendotp",
  verifyOTP: "/login/verifyotp",
  logout: "/login/logout",
};
//DaModule
const daModuleEndpoints = {
  geographyUpdate: "/DAModule/profileUpdateGeo",
  captureGeoLocation: "/DAModule/updateRetailerWiseData",
  addSalesPerson: "/DAModule/addSalesPerson",
  disableSalesPerson: "/DAModule/disableSalesPerson",
  getSalesPersonList: "/DAModule/getSalesPersonList",
  checkSalesPerson: "/DAModule/checkSalesPerson",
  addCheckSalesPerson: "/DAModule/addCheckSalesPerson",
  updateSalesPerson: "/DAModule/updateSalesPerson",
  profileUpdate: "/DAModule/profileUpdate",
  getAdminUserData: "/DAModule/getAdminUserData",
  getMdsUserData: "/DAModule/getMdsUserData",
  getDSUserData: "/DAModule/getDSUserData",
  getAgentUserData: "/DAModule/getAgentUserData",
  getEgenUserData: "/DAModule/getEgenUserData",
  updateMDDetails: "/DAModule/updateMDDetails",
  downloadGeoReport: "/DAModule/downloadGeoReport",
  downloadRetailerReport: "/DAModule/downloadRetailerReport",
  downloadProfileUpdateReport: "/DAModule/downloadProfileUpdateReport",
  updateMDDetails: "/DAModule/updateMDDetails",
  updateDSDetails: "/DAModule/updateDSDetails",
  updateAgentDetails: "/DAModule/updateAgentDetails",
};
//Reports
const reportsEndpoints = {
  getJournalReport: "/reports/getJournalReport",
  getLiveRechargeReportView: "/reports/getLiveRechargeReportView",
  getAccountAdjustmentReport: "/reports/getAccountAdjustmentReport",
  getAgentJournalReport: "/reports/getAgentJournalReport",
  getDistributorJournalReport: "/reports/getDistributorJournalReport",
  getMdJournalReport: "/reports/getMdJournalReport",
  getPortalJournalReport: "/reports/getPortalJournalReport",
  getLogDetails: "/reports/LogDetails",
  viewAccountStatement: "/reports/view",
  downloadAccountStatement: "/reports/download",
  getAgentTranDetailData: "/reports/getAgentTranDetailData",

  checkUser: "/reports/checkUser",
  getCCData: "/reports/getCCData",
  getEditSlabData: "/reports/getEditSlabData",
  updateCCInfo: "/reports/updateCCInfo",
  updateSlabInfo: "/reports/updateSlabInfo",

  APIAccountStmt: "/reports/APIAccountStmt",
  AEPSMicroAtmAccountStmt: "/reports/AEPSMicroAtmAccountStmt",

  getSenderReport: "/reports/getSenderReport",
  getSenderReportDownload: "/reports/getSenderReport1",

  getUserData: "/reports/getUserData",
  updateUserDetails: "/reports/updateUserDetails",
};

const customerCareEndpoints = {
  getPortalIdList: "/CustomerModule/getPortalIdList",
  viewRetailUsers: "/CustomerModule/viewRetailUsers",
  viewAgentProfile: "/CustomerModule/viewAgentProfile",

  viewComplaints: "/CustomerModule/complaints",
  updateComplaint: "/CustomerModule/complaints/update",
  downloadComplaint: "/CustomerModule/complaintDownload",
  downloadAepsReport: "/CustomerModule/downloadAepsReport",
};

const marketingModuleEndpoints = {
  getClientDetails: "/marketingModule/clientDetails",
  getMessage: "/marketingModule/message",
  updateMessage: "/marketingModule/updateMessage",

  sliderUpload: "/marketingModule/upload",

  appSliderUpload: "/marketingModule/upload",

  spdUpload: "/marketingModule/spd",

  popupUpload: "/marketingModule/upload",
  getAppOfferServices: "/marketingModule/services",
  getPreviousAppOffers: "/marketingModule/previousEntries",
  appOfferSubmit: "/marketingModule/appOffer/upload",

  /* MOBILE ALERT */
  mobileAlertUpload: "/marketingModule/upload",
  mobileAlertList: "/marketingModule/notifications",
  mobileAlertDeactivate: "/marketingModule/deactivate",
  mobileAlertDownload: "/marketingModule/download",

  getChannelCategorizeData: "/marketingModule/getChannelCategorizeData",

  getCategorizeDetails: "/marketingModule/getCategorizeDetails",

  /* APP OFFER ALERT */

  getAppOfferServices: "/marketingModule/getAppOfferServices",

  getPreviousAppOffers: "/marketingModule/getPreviousAppOfferEntries",

  appOfferSubmit: "/marketingModule/processAppNotification",

  downloadSampleTemplate: "/marketingModule/generateAppOfferSampleTemplate",

  deactivateAppOffer: "/marketingModule/deactivateAppNotification",

  /* PG USER LIMIT */
  getPGUserLimitData: "/CustomerModule/user-data",

  validateMds: "/CustomerModule/validate-mds",
  getMdsUserData: "/DAModule/getMdsUserData",
};

const controlPEndpoints = {
  iserveuOnboarding: "/controlP/iserveuApesOnboarding",
  yesBcId: "/controlP/YesBcId",
  getTransaction: "/controlP/getTransaction",
  parkTransaction: "/controlP/parkTransaction",
  releaseTransaction: "/controlP/releaseTransactions",
  viewSalesPersonList: "/controlP/viewsalesPersonList",
  addSalesPerson: "/controlP/addSalesPerson",
  disableSalesPerson: "/controlP/disableSalesPerson",
  statusChangeByRange: "/controlP/statusChangeByRange",
  updateStatus: "/controlP/updatestatusDetails",
  stateDetails: "/controlP/stateDetails",
  getCityByState: "/controlP/getCityByState",
  getDetailsBaseOfIfsc: "/controlP/getDetailsBaseOfIfsc",
  updateDataOfIfsc: "/controlP/updateDataOfIfsc",
  addIfscDetails: "/controlP/addifscdetails",
  channelGetDetails: "/controlP/channelGetDetails",
  channelUpdateDetails: "/controlP/channelUpdateDetails",
  getBillingPageDetails: "/controlP/getBillingPageDetails",
  updateBillingDetail: "/controlP/updateBillingDetail",
  getPageDetailZWPC: "/controlP/getPageDetailZWPC",
  getZoneVendorDetails: "/controlP/getZoneVendorDetails",
  updateZoneVendorDetails: "/controlP/updateZoneVendorDetails",
  setCutOffMgt: "/controlP/SetCutOffMgt",
  viewCutOffamount: "/controlP/viewCutOffamount",
  getAesAPICustomerDetails: "/controlP/getAesAPICustomerDetails",
  getAPIVendorDetails: "/controlP/getAPIVendorDetails",
  apiUpdateDetails: "/controlP/apiUpdateDetails",
  getRetailPricingData: "/controlP/getRetailPricingData",
  getAepsMatmSlabEditData: "/controlP/getAepsMatmSlabEditData",
  sendAepsMatmSlabEditMail: "/controlP/sendAepsMatmSlabEditMail",
  validateVendorOtp: "/controlP/validateVendorOtp",
  updateAepsMatmSlabdata: "/controlP/updateAepsMatmSlabdata",
  getPGUserLimitData: "/CustomerModule/user-data",
  getAepsMatmSlabEditData: `/controlP/getApiAepsMatmSlabEditData`,
  getAepsMatmSlabEditDataWithSubService: `/controlP/getApiAepsMatmSlabEditDataWithSubService`,
  sendApiPricingOtp: `/controlP/sendApiPricingOtp`,
  updateApiPricing: `/controlP/updateApiPricing`,
  updateApiPricingSubService: `/controlP/updateApiPricingSubService`,
  getAesAPICustomerDetails: "/controlP/getAesAPICustomerDetails",
  getAPIVendorDetails: "/controlP/getAPIVendorDetails",
  apiUpdateDetails: "/controlP/apiUpdateDetails",
  viewSelfProfile: "/api/viewselfprofile",
  updateSelfProfile: "/api/updateselfuser",
  checkEmailPhone: "/api/checkemailphone",
  getStateDistrict: "/api/getstatedistrict",
  getExcelLWMapping: "/getexcelLWMapping",
};

// Activity Module
const activityEndpoints = {
  // User Registration
  adminUserRegistration: "/activity/adminUserRegistration",
  wlClientRegistration: "/activity/wlClientRegistration",
  agentRegistration: "/activity/agentRegistration",
  mdsRegistration: "/activity/mdsRegistration",
  distributorRegistration: "/activity/distributorRegistration",
  checkClientId: "/activity/checkClientId",
  checkDsId: "/activity/checkDsId",
  checkUserName: "/activity/checkUserName",
  checkMobileNo: "/activity/checkMobileNo",
  salesPersonList: "/activity/salesPersonList",
  zoneList: "/activity/zoneList",
  getDSName: "/activity/getDSName",

  // Admin Tasks
  adminCategoryAssi: "/activity/adminCategoryAssi",
  dbTask: "/activity/dbTask",
  closingBalance: "/activity/closingBalance",
  assignActivitySearch: "/activity/assignActivitySearch",
  assignActivity: "/activity/assignActivity",
  updateActivity: "/activity/updateActivity",

  // Trade Balance
  superAdminSelfAction: "/activity/superAdminSelfAction",
  portalAdminRequest: "/activity/portalAdminRequest",
  portalAdminRequestUpdate: "/activity/portalAdminRequestUpdate",
  portalAdminPush: "/activity/portalAdminPush",
  tradeBalanceRequest: "/activity/tradeBalanceRequest",
  tradeBalanceRequestUpdate: "/activity/tradeBalanceRequestUpdate",
  tradeBalancePush: "/activity/tradeBalancePush",
  tradeBalancePushRequest: "/activity/tradeBalancePushRequest",
  clientTradeBalanceRequest: "/activity/clientTradeBalanceRequest",
  clientTradeBalReqUpdate: "/activity/clientTradeBalReqUpdate",
  clientTradeBalPush: "/activity/clientTradeBalPush",
  clientTradeBalPushRequest: "/activity/clientTradeBalPushRequest",
  myDeposit: "/activity/myDeposit",
  myDepositAction: "/activity/myDepositAction",
  myDepositRequest: "/activity/myDepositRequest",
  selfFundRequest: "/activity/selfFundRequest",
  bankExcelUpload: "/activity/bankExcelUpload",
  authMyDeposit: "/activity/authMyDeposit",
  authMyDepositReq: "/activity/authMyDepositReq",
  authTrBalRequest: "/activity/authTrBalRequest",
  scheduleAutoDebit: "/activity/scheduleAutoDebit",
  services: "/activity/services",
  scheduleAutoDebitReq: "/activity/scheduleAutoDebitReq",
  autoCdmTxn: "/activity/autoCdmTxn",

  // KYC Management
  kycReq: "/activity/kycReq",
  kycReqUpdate: "/activity/kycReqUpdate",
  kycZones: "/activity/kycZones",
  kycProcessChannel: "/activity/kycProcessChannel",
  kycStatusUpdate: "/activity/kycStatusUpdate",
  kycDocUpdate: "/activity/kycDocUpdate",
  esignDocument: "/activity/esignDocument",

  // PG TB
  pgtbStatusChange: "/activity/pgtbStatusChange",
  pgtbDetails: "/activity/pgtbDetails",
  pgtbTxnReceipt: "/activity/pgtbTxnReceipt",
  getPGUserLimitData: "/activity/getPGUserLimitData",
  getUserData: "/activity/getUserData",
  updatePGLimit: "/activity/updatePGLimit",
  pgUserLimitAuth: "/activity/pgUserLimitAuth",
  pgUserIdAuth: "/activity/pgUserIdAuth",
  savePgUserLimit: "/activity/savePgUserLimit",
  getServiceActPGData: "/activity/getServiceActPGData",
  changeStatusPG: "/activity/changeStatusPG",
  getUserDataPGM: "/activity/getUserDataPGM",
  changeStatusPGM: "/activity/changeStatusPGM",
  pgChargeBack: "/activity/pgChargeBack",

  // Move Entity
  moveEntityRO: "/activity/moveEntityRO",
  moveEntityDS: "/activity/moveEntityDS",

  // Active/Deactive Service
  getServices: "/activity/getServices",
  activeDeactiveService: "/activity/activeDeactiveService",

  // QR Code
  maker: "/activity/maker",
  uploadQrCode: "/activity/uploadQrCode",
  agentDetails: "/activity/agent-details",
  checker: "/activity/checker",
  updateQrStatus: "/activity/updateQrStatus",
  userType: "/activity/user-type",
  searchStatus: "/activity/search-status",
  batchAction: "/activity/batch-action",
  hideUnhide: "/activity/hide-unhide",
  checkAuthorization: "/activity/check-authorization",

  // Billing
  billingRequestData: "/activity/billingRequestData",
  searchById: "/activity/search-by-id",
  summary: "/activity/summary",
  summaryDownload: "/activity/summary/download",
  summarySearch: "/activity/summary/search",
  updateStatus: "/activity/update-status",
  updateBulkStatus: "/activity/update-bulk-status",

  // MATM Management
  getMatmDetails: "/activity/getMatmDetails",
  getMatmDetailsById: "/activity/getMatmDetailsById",
  updateMatmStatus: "/activity/updateMatmStatus",
  downloadMatmReport: "/activity/downloadMatmReport",

  // MATM Replacement
  getMatmReplacementDetails: "/activity/getMatmReplacementDetails",
  getMatmReplacementDetailsById: "/activity/getMatmReplacementDetailsById",
  updateMatmReplacementStatus: "/activity/updateMatmReplacementStatus",

  // View MATM Documents
  getMatmDocuments: "/activity/getMatmDocuments",
  updateMatmDocumentStatus: "/activity/updateMatmDocumentStatus",

  // Unblock User OTP
  unblockOtpDetails: "/activity/unblockOtpDetails",
  unblockOtpSingleUpdate: "/activity/unblockOtpSingleUpdate",
  unblockOtpUpdateAll: "/activity/unblockOtpUpdateAll",

  // User Tracking
  search: "/activity/search",

  // Agent Blacklisting
  agentBlacklistUpload: "/activity/upload",

  // API Client (EGEN) Registration
  apiClientRegistration: "/activity/apiClientRegistration",
  checkApiClientEmail: "/activity/checkApiClientEmail",
  checkApiClientMobileNo: "/activity/checkApiClientMobileNo",

  // PG EKYC Enable/Disable
  updatePgEKYCAction: "/activity/updatePgEKYCAction",
};

export default {
  loginEndpoints,
  daModuleEndpoints,
  reportsEndpoints,
  customerCareEndpoints,
  marketingModuleEndpoints,
  controlPEndpoints,
  activityEndpoints,
};
