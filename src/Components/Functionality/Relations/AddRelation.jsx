import { addConnectionsForUser } from "../../../settings";
import makeOptions from "../MakeOptionsWithToken";

export default async function Connect(username) {
    const user = {username: username};
    const opts = makeOptions("PATCH", true, user);
    fetch(addConnectionsForUser, opts);
    window.location.reload();
}