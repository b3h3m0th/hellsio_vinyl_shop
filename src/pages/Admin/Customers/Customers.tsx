import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import fetchData from "../fetchData";
import Customer from "./Customer/Customer";
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
      <div className="admin-customers__wrapper">
        {customers ? (
          customers.map((customer: any, i: number) => {
            return <Customer key={i} customer={customer} />;
          })
        ) : (
          <Loader>Loading</Loader>
        )}
      </div>
    </div>
  );
};

export default Customers;
