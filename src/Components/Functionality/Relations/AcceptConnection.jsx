import { acceptConnectionsFromUser } from "../../../settings"
import makeOptions from "../MakeOptionsWithToken"

export default async function Accept(username) {
    const user = {username: username};
    const opts = makeOptions("PATCH", true, user)
    fetch(acceptConnectionsFromUser, opts);
}