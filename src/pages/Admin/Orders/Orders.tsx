import React, { useState, useEffect } from "react";
import "./Orders.scss";
import fetchData from "../fetchData";
import Loader from "../../../components/Loader/Loader";
import Order from "./Order/Order";

const Orders: React.FC = () => {
  const itemsPerPage = 10 as const;
  const [orders, setOrders] = useState<any & {}>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setOrders(await fetchData(`orders`));
    })();
  }, []);

  return (
    <>
      <div className="admin-orders">
        <div className="admin-orders__wrapper">
          {orders ? (
            <>
              {Object.keys(orders)
                .reverse()
                .splice(itemsPerPage * page, itemsPerPage)
                .map((key, index) => {
                  return <Order key={index} invoiceline={orders[key]} />;
                })}
              <div className="admin-orders__wrapper__pagination">
                <div>
                  <b>Page</b>
                  {[
                    ...new Array(
                      Math.ceil(Object.keys(orders).length / itemsPerPage)
                    ),
                  ].map((x: any, i: number) => {
                    return (
                      <span
                        className="admin-orders__wrapper__pagination__page-link"
                        key={i}
                        onClick={() => setPage(i)}
                      >
                        {i + 1}
                      </span>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <Loader>Loading</Loader>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
