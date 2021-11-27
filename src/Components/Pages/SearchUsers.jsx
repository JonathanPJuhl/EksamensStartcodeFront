import { FetchAllUsers } from "../Functionality/Relations/GetRelations";
import SearchBar from "./PageAdditions/SearchBar";
import React, { useState, useEffect } from "react";
import Connect from "../Functionality/Relations/AddRelation";
import Disconnect from "../Functionality/Relations/RemoveRalation";
import CheckForInjection from "../Functionality/CheckForInjection";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchForUsers() {
    const [users, setUsers] = useState([]);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    useEffect(() => {
        FetchAllUsers({ setUsers });
      }, []);

    

    const filterUsers = (user, query) => {
        if( !CheckForInjection(query) ) {
            toast("please don't input scripts")
            window.location.reload();
            return;
        }
        if (!query) {
            return user;
        }
    
        return user.filter((u) => {
            const userName = u.email.toLowerCase();
            return userName.includes(query);
        });
    };

    const filtered = filterUsers(users, searchQuery);
    
    function AddOrRemoveConnection(email, status) {
        if(status === true) {
            Disconnect(email);
        }
        else{
            Connect(email);
        }
    }
    function HandleValue(status) {
        if(status === true){
            return "Unsend request";
        }
        return "Send request";
    }

    return (
        <div>
            <ToastContainer/>
             <SearchBar searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}/> 
             <ul >
                {filtered.map((user) =>(
                    <li key={user.email}> {user.email}  
                    <input 
                        type="button"
                        onClick= {() => AddOrRemoveConnection(user.email, user.status)}
                        value={HandleValue(user.status)} 
                    >
                    </input>
                    {/* <button onClick= {() => AddConnection(user.email)}>Connect</button> */}
                    </li>
                ))}
            </ul> 
        </div>
    )
}