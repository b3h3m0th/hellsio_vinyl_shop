import React, { useState, useEffect } from "react";
import "./Orders.scss";
import fetchData from "../fetchData";
import Loader from "../../../components/Loader/Loader";

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
      <div className="">
        {orders ? (
          Object.keys(orders).map((key, index) => {
            return (
              orders[key][0].invoice_id +
              orders[key].map((product: any) => {
                return product.code;
              })
            );
          })
        ) : (
          <Loader>Loading</Loader>
        )}
      </div>
    </div>
  );
};

export default Orders;
