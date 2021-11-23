export default function CheckForInjection(string) {
    if (string.toLowerCase().includes("<script>")) {
      alert("Please don't use scripts");
      return false;
    }
    return true;
};
