import React, { useState, useEffect } from "react";
import "./Orders.scss";
import fetchOrders from "./orderx";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    setOrders(fetchOrders());
  }, [orders, setOrders]);
  return (
    <div className="admin-orders">
      <div>{orders ? orders : "Loading"}</div>
    </div>
  );
};

export default Orders;
