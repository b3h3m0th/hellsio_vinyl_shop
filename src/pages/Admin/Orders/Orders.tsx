import React, { useState, useEffect } from "react";
import "./Orders.scss";
import fetchData from "../fetchData";
import Loader from "../../../components/Loader/Loader";
import Order from "./Order/Order";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any & {}>([]);

  useEffect(() => {
    (async () => {
      setOrders(await fetchData(`orders`));
    })();
  }, []);
  console.log(orders);

  return (
    <div className="admin-orders">
      <div className="admin-orders__wrapper">
        {orders ? (
          Object.keys(orders).map((key, index) => {
            return <Order invoiceline={orders[key]} />;
          })
        ) : (
          <Loader>Loading</Loader>
        )}
      </div>
    </div>
  );
};

export default Orders;
