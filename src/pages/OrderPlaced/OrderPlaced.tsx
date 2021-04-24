import React from "react";
import { Redirect } from "react-router";
import { CheckoutStore } from "../../stores/checkoutStore";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import "./OrderPlaced.scss";

interface OrderPlaceProps {
  checkoutStore?: CheckoutStore;
  languageStore?: LanguageStore;
}

const OrderPlaced: React.FC<OrderPlaceProps> = ({
  checkoutStore,
  languageStore,
}: OrderPlaceProps) => {
  return (
    <>
      {checkoutStore?.orderPlaced ? (
        <div className="order-placed">
          <div>Order Placed</div>
        </div>
      ) : (
        <Redirect to={`/${languageStore?.language}/checkout`} />
      )}
    </>
  );
};

export default inject("checkoutStore", "languageStore")(observer(OrderPlaced));
