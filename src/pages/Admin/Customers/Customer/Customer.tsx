import React from "react";
import "./Customer.scss";

export const customerAttributeUnsetWarning = "Unset" as const;
const unset = customerAttributeUnsetWarning;

interface CustomerProps {
  customer: any;
}

const Customer: React.FC<CustomerProps> = ({ customer }: CustomerProps) => {
  return (
    <div className="admin-customer">
      <div className="admin-customer__header">
        <div className="admin-customer__header__name">{`${
          customer.firstname || unset
        } ${customer.lastname || unset}`}</div>
        <div className="admin-customer__header__username">
          {`${customer.username || unset}`}
        </div>
      </div>

      <div className="admin-customer__location">
        <span className="admin-customer__location__location">{`${
          customer.postal_code || unset
        } ${customer.city || unset}, ${customer.country_name || unset}`}</span>
        {`${customer.street || unset} ${customer.street_number || unset}`}
      </div>
      <div className="admin-customer__price">
        <div className="admin-order__price__price"></div>
        <span className="admin-__price__per-item">total</span>
      </div>
      <div className="admin-customer__actions">
        <span className="admin-customer__actions__delete">Delete</span>
      </div>
    </div>
  );
};

export default Customer;
