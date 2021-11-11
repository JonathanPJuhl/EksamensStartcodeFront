const URL = "http://localhost:8080/backend_eksamen/api/";
//const URL = "https://www.ipwithme.com/tomcat/backend_eksamen/api/"

const adminURL = URL + "user/admin";
const userURL = URL + "user/user";
const accountURL = URL + "user/account/"
const createUserURL = URL + "user/create";
const loginURL = URL + "login";
const resetURL = URL + "user/resetpass";
const newPasswordURL = URL + "user/newpassword";
const createProj = URL + "project/create"
const allProjs = URL + "project/all"
const allDevs = URL + "user/all"
const assignDevToProj = URL + "project/assign/"
const allUserstoriesForSpecificProject = URL + "project/alluserstoriesforgivenproject/"
const addRecord = URL + "project/record"
const myRecords = URL + "project/myrecords/"
const invoice = URL + "project/invoice/"

export {
  adminURL,
  userURL,
  loginURL,
  createUserURL,
  accountURL,
  resetURL,
  newPasswordURL,
  createProj,
  allProjs,
  allDevs,
  assignDevToProj,
  allUserstoriesForSpecificProject,
  addRecord,
  myRecords,
  invoice
};
