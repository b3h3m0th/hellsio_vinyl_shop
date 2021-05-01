import React from "react";
import "./Order.scss";

export type Invoiceline = Array<any>;
export enum DeliveryStats {
  shipped = "shipped",
  notShippedYet = "not shipped yet",
}

interface OrderProps {
  invoiceline: Invoiceline;
}

const Order: React.FC<OrderProps> = ({ invoiceline }: OrderProps) => {
  return (
    <div className="admin-order">
      <div className="admin-order__header">
        <div className="admin-order__header__id">{`#${invoiceline[0].invoice_id}`}</div>
        <div className="admin-order__header__user">
          {`${invoiceline[0].firstname} ${invoiceline[0].lastname}`}
        </div>
      </div>
      <div className="admin-order__date">
        {new Date(invoiceline[0].date).toLocaleString()}
      </div>
      <div className="admin-order__products">
        <span className="admin-order__products__title">Products</span>
        {invoiceline.map((p: any, i: number) => {
          return <span key={i}>{p.code}</span>;
        })}
      </div>
      <div className="admin-order__price">
        <div className="admin-order__price__price">
          $ {invoiceline[0].total}
        </div>
        <span className="admin-order__price__per-item">total</span>
      </div>
      <div className="admin-order__actions">
        {/* eslint-disable-next-line */}
        <span
          title="Mark as not shipped yet"
          className={`admin-order__actions__not-shipped-yet ${
            invoiceline[0].status === DeliveryStats.shipped ? "" : "marked"
          }`}
        >
          <img
            src="https://img.icons8.com/material-rounded/344/ffffff/important-time.png"
            alt="Hellsio shipped icon"
          />
        </span>
        {/* eslint-disable-next-line */}
        <span
          title="Mark as shipped"
          className={`admin-order__actions__shipped ${
            invoiceline[0].status === DeliveryStats.shipped ? "marked" : ""
          }`}
        >
          <img
            src="https://img.icons8.com/material-rounded/344/ffffff/shipped.png"
            alt="Hellsio shipped icon"
          />
        </span>
      </div>
    </div>
  );
};

export default Order;
