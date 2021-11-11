function handleHttpErrors(res) {
  if (!res.ok) {
    alert("You either do not have permission to perform this action, or this action is producing an error")
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}
export default handleHttpErrors;
