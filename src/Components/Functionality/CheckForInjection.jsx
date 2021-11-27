export default function CheckForInjection(string) {
    if (string.toLowerCase().includes("<script>")) {
      alert("Please don't use scripts");
      return false;
    }
    return true;
};
function CheckObjForInjection(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (value.toLowerCase().includes("<script>")) {
      return false;
    }
  }
  return true;
};
export {CheckObjForInjection};