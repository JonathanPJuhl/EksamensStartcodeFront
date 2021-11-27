import { removeConnectionForUser } from "../../../settings";
import makeOptions from "../MakeOptionsWithToken";

export default async function Disconnect(username) {
    const user = {username: username};
    const opts = makeOptions("PATCH", true, user);
    fetch(removeConnectionForUser, opts);
}