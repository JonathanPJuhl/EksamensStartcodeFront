import { sendTwoFactor, validateTwoFactor } from "../../settings";
import makeOptions from "./MakeOptionsWithToken";

async function SendTwoFactorCode(username, password, ip, {setTwofactor, setTwofactorSent}) {
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
        setTwofactorSent(false);
    }
    console.log("No error")
    setTwofactorSent(true);
}

async function ValidateTwoFactor(username, twoFactor, {setTwofactor}) {
    const user = {
        username: username,
        twoFactor: twoFactor,
    };
    const opts = makeOptions("POST", false, user);
    const code = await fetch(validateTwoFactor, opts);
    console.log(code);
    if(!code.ok) {
        console.log("error");
        Promise.reject({ status: code.status, fullError: code.json });
        setTwofactor(false);
    }
    console.log("No error")
    setTwofactor(true);
}

export default SendTwoFactorCode;
export { ValidateTwoFactor };