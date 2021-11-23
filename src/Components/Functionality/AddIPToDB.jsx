import makeOptions from "./MakeOptionsWithToken";
import { registerMaliciousIntentURL } from "../../settings";

export default async function AddIPToDB(ip, username, intent) {
    let ipObj = {ip: ip, username: username, intent: intent};
    let opts = makeOptions("POST", false, ipObj);
    fetch(registerMaliciousIntentURL + "/" + intent, opts);
}