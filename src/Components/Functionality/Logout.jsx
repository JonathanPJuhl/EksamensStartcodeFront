const logoutUser = () => {
  localStorage.removeItem("jwtToken");
};
export default logoutUser;
