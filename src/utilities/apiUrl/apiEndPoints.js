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
  downloadProfileUpdateReport: "/DAModule/downloadProfileUpdateReport"
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
export default {
  loginEndpoints,
  daModuleEndpoints,
  reportsEndpoints,
  customerCareEndpoints,
  marketingModuleEndpoints,
};
