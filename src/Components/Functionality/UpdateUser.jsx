import { activateUser, deActivateUser } from "../../settings";
import makeOptions from "./MakeOptionsWithToken";

export default function UpdateUser(username, status) {
    
    let user = {username: username}
    let opts = makeOptions("PUT", true, user)
    console.log("Hey");
    if (status === true) {
        console.log("1");
        fetch(activateUser, opts);
    } else {
        console.log("2");

        fetch(deActivateUser, opts);
    }
}