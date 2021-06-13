import "../App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";
import { pinStock } from "../settings";
import { fetchUsername } from "./decodeJWT";
import { Link } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { tickers } from "../settings";

function Endpoint3() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(tickers);

    const items = await data.json();
    setItems(items.data);
  };
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    AddStock(item.symbol);
    alert("You just added: " + item.symbol + " to your list of pinned stocks");
  };

  const handleOnFocus = () => {};

  return (
    <div>
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
      />
      <ReactBootStrap.Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tickers</th>
            <th>Add to pinned</th>
          </tr>
        </thead>

        {items.map((item) =>
          !item.symbol.includes(".") ? (
            <tbody>
              <tr key={item.symbol}>
                <td class="stretch-to-fit">
                  <Link to="/specifistock">
                    <button
                      type="button"
                      class="buttons"
                      value={item.symbol}
                      onClick={ShowSpecificStock}
                    >
                      {item.name}
                    </button>
                  </Link>
                </td>
                <td>{item.symbol}</td>
                <td>
                  <button
                    value={item.symbol}
                    class="buttons"
                    onClick={HandleOnclick}
                  >
                    Pin
                  </button>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody></tbody>
          )
        )}
      </ReactBootStrap.Table>
    </div>
  );
}

function HandleOnclick(evt) {
  let itemToAddToDB = evt.target.value;
  AddStock(itemToAddToDB);
}
function ShowSpecificStock(evt) {
  let symbol = evt.target.value;
  localStorage.setItem("stock_symbol", symbol);
}
function AddStock(stockTicker) {
  const options = makeOptions("POST", stockTicker + "," + fetchUsername());
  return fetch(pinStock, options);
}
const makeOptions = (method, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
    console.log(JSON.stringify(body));
  }
  return opts;
};
export default Endpoint3;
