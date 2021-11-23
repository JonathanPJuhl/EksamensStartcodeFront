import React, { useState, useEffect } from "react";
import GetAllUsers from "../Functionality/GetAllUsers";
import UpdateUser from "../Functionality/UpdateUser";
import { Table } from "react-bootstrap";

export default function UserOverview() {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        GetAllUsers( {setUsers} );
      }, []);

      const getCheckValAndUpdate = (evt) => {
        let target = evt.target;
        let id = target.id;
        let value = target.checked;
        console.log(value);
        UpdateUser(id, value);
    
      };

    return (
        <Table striped bordered hover>
            {console.log(users)}
            <thead>
              <tr>
                <th>Username</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
                { users.map((e) => (
                    <tr key={e.username}>
                        <td>{e.username}</td>
                        <td><input 
                        type="checkbox" 
                        id={e.username} 
                        defaultChecked={!e.isActive}
                        onChange = {getCheckValAndUpdate}/></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}