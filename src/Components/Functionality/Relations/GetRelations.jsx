import { getAllUsersForUser, getAllConnectionsForUser, getAllPendingrequests } from "../../../settings";
import makeOptions from "../MakeOptionsWithToken";

export default async function FetchConnectionData( { setConnectedUsers, setPending } ) {
    const opts = makeOptions("GET", true);
    const relations = await fetch(getAllConnectionsForUser, opts);
    const pending = await fetch(getAllPendingrequests, opts);
    const relationData = await relations.json();
    const pendingData = await pending.json();
    console.log(pendingData);
    setConnectedUsers(relationData);
    setPending(pendingData);
}
async function FetchAllUsers( { setUsers } ) {
    const opts = makeOptions("GET", true);
    const users = await fetch(getAllUsersForUser, opts);
    const userData = await users.json();
    console.log(userData);
    setUsers(userData);
}

export {FetchAllUsers};