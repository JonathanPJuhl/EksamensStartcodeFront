import { Redirect } from "react-router-dom";

function handleHttpErrors(res) {
  if(res.status === 403) {
    //localStorage.removeItem("jwtToken");
    //return  <Link to="/login"></Link>
    return <Redirect to="localhost:3000"> {window.location.reload()}</Redirect>
    
  }
  if (!res.ok) {
    //alert("You either do not have permission to perform this action, or this action is producing an error")
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}
export default handleHttpErrors;
