import React, { useState, useEffect } from "react";
import "./Orders.scss";
import fetchOrders from "./fetchOrders";
import Loader from "../../../components/Loader/Loader";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    (async () => {
      setOrders(await fetchOrders());
    })();
  }, []);
  return (
    <div className="admin-orders">
      <div>
        {orders ? `${JSON.stringify(orders)}` : <Loader>Loading</Loader>}
      </div>
    </div>
  );
};

export default Orders;
