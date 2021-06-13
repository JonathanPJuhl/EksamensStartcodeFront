import "../App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";
import { makeChart } from "../settings";
import { EOD } from "../settings";

const SpecificStockInfo = () => {
  useEffect(() => {
    fetchItems();
  }, []);
  let ticker = localStorage.getItem("stock_symbol");

  const [specific, setSpecific] = useState([]);
  const [chart, setChart] = useState("");

  const fetchItems = async () => {
    const data = await fetch(`${EOD}${ticker}`);

    const item = await data.json();

    setSpecific(item.data);

    const fetchChart = async (item) => {
      const options = makeOptions("POST", item);
      const stockChar = await fetch(makeChart, options);
      const stockItem = await stockChar.json();
      console.log(stockItem);
      setChart(stockItem);
    };
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
      }
      return opts;
    };

    fetchChart(item);
  };

  return (
    <div>
      <h1>{ticker} movements visualized</h1>
      <div className="container" dangerouslySetInnerHTML={{ __html: chart }} />

      <h3>Stock movements for {ticker}</h3>
      <ReactBootStrap.Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Date</th>
            <th>Open</th>
            <th>Low</th>
            <th>High</th>
            <th>Close</th>
          </tr>
        </thead>

        {specific.map((item) => (
          <tbody key={item.symbol}>
            <td>{item.symbol}</td>
            <td>{item.date.substring(0, 10)}</td>

            <td>{item.open}</td>
            <td>{item.low}</td>
            <td>{item.high}</td>
            <td>{item.close}</td>
          </tbody>
        ))}
      </ReactBootStrap.Table>
    </div>
  );
};

export default SpecificStockInfo;
