import axios from "axios";
import React from "react";
import {
  getAdminAccessToken,
  getAdminRefreshToken,
  setAdminAccessToken,
} from "../../../../authorization/token";
import { inject, observer } from "mobx-react";
import "./Order.scss";
import { LanguageStore } from "../../../../stores/languageStore";

export type Invoiceline = Array<any>;
export enum DeliveryStatus {
  shipped = "shipped",
  notShippedYet = "not shipped yet",
}

interface OrderProps {
  invoiceline: Invoiceline;
  languageStore?: LanguageStore;
}

const updateInvoiceStatus = async (
  status_text: DeliveryStatus,
  invoice_id: number
): Promise<void> => {
  const accessToken = getAdminAccessToken();
  const refreshToken = getAdminRefreshToken();
  try {
    await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/admin/order/update_delivery_status`,
      {
        status_text: status_text,
        invoice_id: invoice_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err) {
    const tokenResponse = await axios.post(
      `${`${process.env.REACT_APP_BASE_API_URL}/admin/token` || ""}`,
      {
        token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setAdminAccessToken(tokenResponse.data.accessToken);
    return await updateInvoiceStatus(status_text, invoice_id);
  }
};

const Order: React.FC<OrderProps> = ({
  invoiceline,
  languageStore,
}: OrderProps) => {
  const markAsShipped = () =>
    (async () =>
      await updateInvoiceStatus(
        DeliveryStatus.shipped,
        invoiceline[0].invoice_id
      ))();

  const markAsNotShippedYet = () =>
    (async () =>
      await updateInvoiceStatus(
        DeliveryStatus.notShippedYet,
        invoiceline[0].invoice_id
      ))();

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
          return (
            <a
              href={`/${languageStore?.language}/products/${p.code}`}
              target="_blank noopener noreferrrer"
              key={i}
            >
              {p.code}
            </a>
          );
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
        <a
          href=""
          title="Mark as not shipped yet"
          className={`admin-order__actions__not-shipped-yet ${
            invoiceline[0].status === DeliveryStatus.shipped ? "" : "marked"
          }`}
          onClick={() => markAsNotShippedYet()}
        >
          <img
            src="https://img.icons8.com/material-rounded/344/ffffff/important-time.png"
            alt="Hellsio shipped icon"
          />
        </a>
        {/* eslint-disable-next-line */}
        <a
          href=""
          title="Mark as shipped"
          className={`admin-order__actions__shipped ${
            invoiceline[0].status === DeliveryStatus.shipped ? "marked" : ""
          }`}
          onClick={() => markAsShipped()}
        >
          <img
            src="https://img.icons8.com/material-rounded/344/ffffff/shipped.png"
            alt="Hellsio shipped icon"
          />
        </a>
      </div>
    </div>
  );
};

export default inject("languageStore")(observer(Order));
