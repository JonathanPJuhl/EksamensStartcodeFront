const URL = "http://localhost:8080/backend_eksamen/api/";
//const URL = "https://www.ipwithme.dk/backend_eksamen/api/"

const captcha = "6Lf-_TodAAAAAA3qqZXc7i4TtBY46F-04Meosv6s";

const adminURL = URL + "user/admin";
const userURL = URL + "user/user";
const loginURL = URL + "login";
const createUserURL = URL + "user/create";
const accountURL = URL + "user/account"
const accountImageURL = URL + "user/profilePicture";
const updateAccountURL = accountURL + "/update"
const resetURL = URL + "user/resetpass";
const newPasswordURL = URL + "user/newpassword";
const uploadPP = URL + "user/uploadfile";
const virusTotal = "https://www.virustotal.com/api/v3/files";
const registerMaliciousIntentURL = URL + "malicious";
const unlockURL = URL + "user/unlock";
const sendTwoFactor = URL + "login/2fa";
const validateTwoFactor = URL + "login/2fa/validate";
const allUsers = URL + "admin/allUsers";
const activateUser = URL + "admin/user/activate";
const deActivateUser = URL + "admin/user/deactivate";

export {
  adminURL,
  userURL,
  loginURL,
  createUserURL,
  accountURL,
  accountImageURL,  
  updateAccountURL,
  resetURL,
  newPasswordURL,
  captcha,
  uploadPP,
  virusTotal,
  registerMaliciousIntentURL,
  unlockURL,
  sendTwoFactor,
  validateTwoFactor,
  allUsers,
  activateUser,
  deActivateUser,
};
