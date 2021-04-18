import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import fetchData from "../fetchData";
import "./Customers.scss";

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<any>();

  useEffect(() => {
    (async () => {
      setCustomers(await fetchData(`customers`));
    })();
  }, []);

  return (
    <div className="admin-customers">
      <div>
        {customers ? (
          customers.map((customer: any, i: number) => {
            return (
              <div className="admin-customers__customer" key={i}>
                {customer.email}
              </div>
            );
          })
        ) : (
          <Loader>Loading</Loader>
        )}
      </div>
    </div>
  );
};

export default Customers;
