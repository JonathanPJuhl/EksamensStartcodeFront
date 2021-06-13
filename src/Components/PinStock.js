import "../App.css";
import React, { useState, useEffect } from "react";
import handleHttpErrors from "./Errors";
import { exchanges } from "../settings";
let stocks = [];
function makeStockArray(stockData) {
  stocks = stockData.map(function (e) {
    return e;
    // return `${e.data.open}${e.data.high}${e.data.low}${e.data.close}` ;
  });
}
const fetchSearchData = () => {
  const options = makeOptions("GET");
  return fetch(exchanges, options)
    .then(handleHttpErrors)
    .then((res) => res.json())
    .then((data) => {
      makeStockArray(data);
    })
    .then(console.log(stocks.toString()));
};

const makeOptions = (method) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    data: { access_key: "5feeee1a869fedc6e6e24e62c735bc22" },
  };
  return opts;
};

function handleSearchQuery(evt) {
  let id = evt.target.id;
}

function Pin() {
  fetchSearchData();
  return (
    <div>
      <input
        type="text"
        placeholder="Search for stock"
        onChange={handleSearchQuery}
      ></input>
    </div>
  );
}

export default Pin;
