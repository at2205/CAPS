/**
 * Frontend Permission Utility
 * 
 * Mirrors legacy header.jsp permission behavior.
 * Reads permissions from localStorage (loaded at login from backend).
 * 
 * Usage:
 *   import { hasPermission, isPortal, isPgTbUser } from "@/utilities/permissions";
 *   if (hasPermission("kycManagement")) { ... }
 */

// Get all permissions stored at login
export const getPermissions = () => {
  if (typeof window === "undefined") return {};
  try {
    const perms = localStorage.getItem("adminServiceDetails");
    return perms ? JSON.parse(perms) : {};
  } catch {
    return {};
  }
};

// Check single permission key
export const hasPermission = (key) => {
  const perms = getPermissions();
  return perms[key]?.toUpperCase() === "Y";
};

// Check if user has ANY of the given permissions
export const hasAnyPermission = (...keys) => keys.some((k) => hasPermission(k));

// Check if user has ALL of the given permissions
export const hasAllPermissions = (...keys) => keys.every((k) => hasPermission(k));

// Get admin user type
export const getAdminUserType = () => (typeof window !== "undefined" ? localStorage.getItem("adminUserType") : "") || "";

// Get portal ID
export const getPortalId = () => (typeof window !== "undefined" ? localStorage.getItem("portalId") : "") || "";

// Get user ID
export const getUserId = () => (typeof window !== "undefined" ? localStorage.getItem("userId") : "") || "";

// Check if superadmin
export const isSuperAdmin = () => getAdminUserType().toLowerCase() === "superadmin";

// Check if portal 10002 (TEP)
export const isPortalTEP = () => isSuperAdmin() || getPortalId() === "10002";

// PG TB user whitelist (from header.jsp lines 722-726)
const PG_TB_WHITELIST = new Set([
  "5102", "5116", "5127", "5164", "5157", "5115",
  "5130", "5155", "5145", "5131", "5138",
]);

export const isPgTbUser = () => isSuperAdmin() || PG_TB_WHITELIST.has(getUserId());

// Active/Deactive Service whitelist (header.jsp line 891)
const ACTIVE_DEACTIVE_WHITELIST = new Set(["5102", "5116", "5155"]);

export const isActiveDeactiveUser = () => isSuperAdmin() || ACTIVE_DEACTIVE_WHITELIST.has(getUserId());

// KYC Management: requires kycManagement + portal 10002
export const isKycAuthorized = () => isPortalTEP() && hasPermission("kycManagement");

// Activity admin roles
export const isActivityAdmin = () => {
  const t = getAdminUserType().toLowerCase();
  return t === "superadmin" || t === "activityadmin" || t === "activityuser";
};

/**
 * Activity menu visibility map.
 * Returns which Activity sub-menus should be visible.
 * Mirrors header.jsp if-blocks exactly.
 */
export const getActivityMenuVisibility = () => ({
  // Root
  activity: hasPermission("activity"),

  // User Registration
  userRegistration: hasPermission("UserRegistration"),
  internalUserReg: hasPermission("InternalUserreg"),
  corporateUserReg: hasPermission("CorporateUserreg"),
  retailUserReg: hasPermission("RetailUserreg"),

  // Admin Tasks
  adminTasks: hasPermission("AdminTasks"),
  activityAssignment: hasPermission("ActivityAssignment"),
  categoryAssignment: hasPermission("CategoryAssignment"),
  dbTask: hasPermission("DBTask"),
  schedulerRun: hasPermission("SchedulerRun"),

  // Trade Balance
  tradeBalanceActivity: hasPermission("TradeBalanceActivity"),
  tbSuperAdmin: hasPermission("TBSuperAdmin"),
  tbFinance: hasPermission("TBFinance"),
  tbClient: hasPermission("TBClient"),
  scheduleAutoDebit: hasPermission("scheduleAutoDebit"),
  autoCDMTransaction: hasPermission("autoCDMTransaction"),
  bankExcelUpload: hasPermission("bankExcelUpload") && isPortalTEP(),

  // KYC
  kycManagement: isKycAuthorized(),

  // PG TB
  pgTb: hasPermission("pgTb") && isPgTbUser(),
  pgTxnStatus: hasPermission("PG_Txn_Status") && isPgTbUser(),
  pgtbRequestActivity: hasPermission("pgtbrequest_Activity") && isPgTbUser(),
  pguserAction: hasPermission("pguserAction") && isPgTbUser(),
  pgsettlementuserlimit: hasPermission("pgsettlementuserlimit") && isPgTbUser(),
  pgserviceActivation: hasPermission("pgserviceActivation") && isPgTbUser(),
  pgEkycFlag: hasPermission("PG_EKYC_Activation_Flag") && isPgTbUser(),

  // Move Entity / Plans
  moveEntity: hasPermission("MoveEntity"),
  pricingPlan: hasPermission("PricingPlan"),
  assignPlan: hasPermission("AssignPlan"),

  // Active/Deactive
  activeDeactiveService: hasPermission("ActiveDeactiveService") && isActiveDeactiveUser(),

  // QR Code
  qrCode: hasPermission("qrCode"),
  qrMaker: hasPermission("maker"),
  qrChecker: hasPermission("checker"),
  qrViewList: hasPermission("viewList"),

  // Billing
  billingNew: hasPermission("billingNew"),

  // MATM
  matmManagement: hasPermission("MatmManagement"),
  matmActivation: hasPermission("MatmActivation"),
  viewMatmDocuments: hasPermission("ViewMatmDocuments"),
  matmReplacementRequest: hasPermission("MatmReplacementRequest"),

  // Agent Blacklisting
  agentBlacklisting: hasPermission("agentBlacklisting"),

  // User Tracking + Unblock OTP
  userTrackingDetails: hasPermission("userTrackingDetails"),
});
