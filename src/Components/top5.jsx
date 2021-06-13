import { top5 } from "../settings";
import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
function Top5() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [topFive, setTop5] = useState([]);
  const [bottomFive, setBottom5] = useState([]);

  const fetchItems = async () => {
    const dataTop = await fetch(`${top5}DESC`);
    const dataBottom = await fetch(`${top5}ASC`);

    const top5data = await dataTop.json();
    const bottom5data = await dataBottom.json();

    setTop5(top5data);
    setBottom5(bottom5data);
  };
  
  return (
    <div>
      <h3>Top 5 highest rates</h3>
      <ReactBootStrap.Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Close</th>
            <th>Rate in % of closing-value yesterday</th>
          </tr>
        </thead>
        {topFive.map((item) => (
          <tr key={item.stockTicker}>
            <td>{item.stockTicker}</td>
            <td>{item.date.substring(0, 10)}</td>
            <td>{item.close}</td>
            <td>{item.rate}</td>
          </tr>
        ))}
      </ReactBootStrap.Table>
      <h3>Top 5 lowest rates</h3>
      <ReactBootStrap.Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Close</th>
            <th>Rate in % of closing-value yesterday</th>
          </tr>
        </thead>
        {bottomFive.map((item) => (
          <tr key={item.stockTicker}>
            <td>{item.stockTicker}</td>
            <td>{item.date.substring(0, 10)}</td>
            <td>{item.close}</td>
            <td>{item.rate}</td>
          </tr>
        ))}
      </ReactBootStrap.Table>
    </div>
  );
}
export default Top5;
