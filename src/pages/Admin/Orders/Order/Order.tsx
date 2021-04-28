import React from "react";
import "./Order.scss";

export type Invoiceline = Array<any>;

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
        <span className="admin-order__actions__delete">Delete</span>
      </div>
    </div>
  );
};

export default Order;
