import { updateAccountURL } from "../../settings";
import makeOptions from "./MakeOptionsWithToken";
import handleHttpErrors from "../Errors/Errors";

export default function UpdateProfile(accountInfo) {

    const opts = makeOptions("PUT", true, accountInfo);
    return fetch(updateAccountURL, opts)
    .then(handleHttpErrors);
}