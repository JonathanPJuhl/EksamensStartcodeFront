import { sendTwoFactor } from "../../settings";
import makeOptions from "./MakeOptionsWithToken";

async function SendTwoFactorCode(username, password, ip) {
    const user = {
        username: username,
        password: password,
        ip: ip,
    };
    const opts = makeOptions("POST", false, user);
    const code = await fetch(sendTwoFactor, opts);
    if(!code.ok) {
        console.log("Seems like this mail does not exist, or your password is wrong");
        Promise.reject({ status: code.status, fullError: code.json });
    }
}


export default SendTwoFactorCode;