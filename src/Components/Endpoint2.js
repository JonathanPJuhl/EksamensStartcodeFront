import "../App.css";
import React, { useState, useEffect } from "react";
import { fetchUsername } from "./decodeJWT";
import { pinnedStocks, removePin, addNoti } from "../settings";
import * as ReactBootStrap from "react-bootstrap";

function Endpoint2() {
  const [pinned, setPinned] = useState([]);

  const init = { username: "", ticker: "", value: "" };
  const [user, setUser] = useState(init);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch(`${pinnedStocks}${fetchUsername()}`);
    const pins = await data.json();
    setPinned(pins.data);
    console.log(pinned.length);
  };
  function HandleOnclick(evt) {
    let value = evt.target.value;
    const fetchItems = async () => {
      console.log(`${removePin}${fetchUsername()},${value}`);
      const data = await fetch(`${removePin}${fetchUsername()},${value}`);
      const removed = await data.json();
      alert(removed.resp);
    };
    fetchItems();
  }

  const handleChange = (evt) => {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;

    setUser({ ...user, [id]: value });
    console.log(user.value);
  };

  function HandleNoti(evt) {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;
    console.log(id);
    if (id == "ticker") {
      setUser({ ...user, [id]: value });
    }
    let URLadditions = `${addNoti}${fetchUsername()},${value},${user.value}`;
    console.log(URLadditions);
    return fetch(URLadditions);
  }


  return (
    <div>
      <ReactBootStrap.Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Open</th>
            <th>Low</th>
            <th>High</th>
            <th>Close</th>
            <th>Set notification</th>
            <th>Remove pin</th>
          </tr>
        </thead>
        {pinned.map((e) => (
          <tr key={e.symbol}>
            <td>{e.symbol}</td>
            <td>{e.date.substring(0, 10)}</td>
            <td>{e.open}</td>
            <td>{e.low}</td>
            <td>{e.high}</td>
            <td>{e.close}</td>

            <td>
              <form onChange={handleChange}>
                <select name="Notify me when" id="value">
                  <option value="0" selected>
                    Choose...
                  </option>
                  <option value="2">Stock drops or gains more than 2%</option>
                  <option value="5">Stock drops or gains more than 5%</option>
                  <option value="10">Stock drops or gains more than 10%</option>
                </select>

                <button
                  type="submit"
                  class="buttons"
                  id="ticker"
                  onClick={HandleNoti}
                  value={e.symbol}
                >
                  submit
                </button>
              </form>
            </td>

            <td>
              <button value={e.symbol} class="buttons" onClick={HandleOnclick}>
                Remove pin
              </button>
            </td>
          </tr>
        ))}
      </ReactBootStrap.Table>
    </div>
  );
}
export default Endpoint2;
