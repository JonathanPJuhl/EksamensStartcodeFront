import { allUsers } from "../../settings";
import makeOptions from "./MakeOptionsWithToken";

export default async function GetAllUsers ( { setUsers } ) {
    const opts = makeOptions("GET", true);
    const res = await fetch(allUsers, opts);
    const users = await res.json();
    setUsers(users);    
}