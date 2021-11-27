import React, { useState, useEffect } from "react";
import FetchConnectionData from "../Functionality/Relations/GetRelations";
import SearchBar from "./PageAdditions/SearchBar";
import Accept from "../Functionality/Relations/AcceptConnection"
import Reject from "../Functionality/Relations/RejectConnection";

export default function Connections() {
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [pending, setPending] = useState([]);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    useEffect(() => {
        FetchConnectionData({ setConnectedUsers, setPending });
      }, []);

    

    const filterUsers = (user, query) => {
        if (!query) {
            return user;
        }
    
        return user.filter((u) => {
            const userName = u.email.toLowerCase();
            return userName.includes(query);
        });
    };

    const filtered = filterUsers(connectedUsers, searchQuery);
    
    function RemoveConnection(email) {
        Reject(email);
    }

    function AcceptConnection(email) {
        Accept(email);
    }

    return (
        <div>
            <h5>Your connections</h5>
             <SearchBar  searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}/> 
             <ul >
                {filtered.map((user) =>(
                    <li key={user.email}>{user.email} 
                    <button onClick= {() => RemoveConnection(user.email)}>Disconnect</button></li>
                ))}
            </ul> 
            <br></br>
            <br></br>
            <br></br>
            <h5>Pending requests</h5>
            <ul >
                {pending.map((pend) =>(
                    <li key={pend.email}>{pend.email} 
                    <button onClick= {() => AcceptConnection(pend.email)}>Accept</button>
                    <button onClick= {() => RemoveConnection(pend.email)}>Reject</button>
                    </li>
                ))}
            </ul> 
        </div>
    )
}