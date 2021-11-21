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
//const allUsers = URL + "user/all";
const uploadPP = URL + "user/uploadfile";


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
};
