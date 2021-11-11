export default function checkToken() {
    if (localStorage.getItem("jwtToken") != null) {
        return true;
    } 
  return false;
}

