import React, { useState, useEffect } from "react";
import "./Orders.scss";
import fetchOrders from "./fetchOrders";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    (async () => {
      setOrders(await fetchOrders());
    })();
  }, []);
  return (
    <div className="admin-orders">
      <div>{orders ? `${JSON.stringify(orders)}` : "Loading..."}</div>
    </div>
  );
};

export default Orders;
