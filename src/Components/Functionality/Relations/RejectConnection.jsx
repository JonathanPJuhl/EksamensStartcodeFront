import { denyConnectionsFromUser } from "../../../settings"
import makeOptions from "../MakeOptionsWithToken"

export default async function Reject(username) {
    const user = {username: username};
    const opts = makeOptions("PATCH", true, user)
    fetch(denyConnectionsFromUser, opts);
}