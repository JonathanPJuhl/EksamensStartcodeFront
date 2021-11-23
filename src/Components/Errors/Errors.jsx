import { Redirect } from "react-router-dom";

function handleHttpErrors(res) {
  if(res.status === 403 ) {
    //localStorage.removeItem("jwtToken");
    //return  <Link to="/login"></Link>
    return <Redirect to="localhost:3000"> {window.location.reload()}</Redirect>
  }
  if (res.status === 401) {
    alert("Wrong username or password");
    return Promise.reject({ status: res.status, fullError: res.json });
  }
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}
export default handleHttpErrors;
