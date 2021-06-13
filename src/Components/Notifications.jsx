import "../App.css";
import React, { useState, useEffect } from "react";
import { fetchUsername } from "./decodeJWT";
import {
  checkForNotis,
  notifications,
  markRead,
  deleteMessage,
} from "../settings";
import { Link } from "react-router-dom";

import * as ReactBootStrap from "react-bootstrap";

function Notifications() {
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    await fetch(checkForNotis);
    const data2 = await fetch(notifications + fetchUsername());

    const items = await data2.json();
    console.log(items);
    setNoti(items);
  };
  function HandleOnclick(evt) {
    window.location.reload();
    evt.preventDefault();
    let markAsRead = evt.target.value;
    const mark = async () => {
      await fetch(markRead + markAsRead);
      fetchItems();
      
    };

    mark();
  }
  function HandleOnclickDelete(evt) {
    evt.preventDefault();
    let markAsRead = evt.target.value;
    const mark = async () => {
      await fetch(deleteMessage + markAsRead);
      fetchItems();
    };

    mark();
  }

  return (
    <div>
      {" "}
      <ReactBootStrap.Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Message</th>
            <th>Status</th>
            <th>Mark as read</th>
            <th>Delete message</th>
          </tr>
        </thead>
        {noti.map((e) => (
          <tr key={e.symbol + e.date + e.message}>
            <td>{e.stockTicker}</td>
            <td>{e.date}</td>
            <td>{e.message}</td>
            <td>{e.status ? <p>New</p> : <p>Read</p>}</td>
            <td>
           
              {e.status ? (
                <button
                  value={e.id + ",false"}
                  class="buttons"
                  onClick={HandleOnclick}
                >
                  Mark as read
                </button>
              ) : (
                <button
                  value={e.id + ",true"}
                  class="buttons"
                  onClick={HandleOnclick}
                >
                  Mark as unread
                </button>
              )}
            
            </td>
            <td>
              <button
                value={e.id}
                class="buttons"
                onClick={HandleOnclickDelete}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </ReactBootStrap.Table>
    </div>
  );
}

export default Notifications;
