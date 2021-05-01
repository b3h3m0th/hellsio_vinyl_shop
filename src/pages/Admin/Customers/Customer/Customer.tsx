import React, { useState } from "react";
import "./Customer.scss";

export const customerAttributeUnsetWarning = "--" as const;
const unset = customerAttributeUnsetWarning;

interface CustomerProps {
  customer: any;
}

const Customer: React.FC<CustomerProps> = ({ customer }: CustomerProps) => {
  const [editable, setEditable] = useState<boolean>(false);

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
      <div className="admin-customer__contact">
        <span className="admin-customer__contact__email">{`${
          customer.email || unset
        }`}</span>
        <span className="admin-customer__contact__phone">{`${
          customer.phone || unset
        }`}</span>
      </div>
      <div className="admin-customer__actions">
        <span
          className="admin-customer__actions__edit"
          onClick={() => setEditable((prev: boolean) => !prev)}
        >
          {editable ? "Cancel" : "Edit"}
        </span>
        {editable && (
          <span
            className="admin-customer__actions__save"
            onClick={() => setEditable(true)}
          >
            Save
          </span>
        )}
      </div>
    </div>
  );
};

export default Customer;
