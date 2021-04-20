import React from "react";
import "./Checkout.scss";
import { CheckoutStore } from "../../stores/checkoutStore";
import { inject, observer } from "mobx-react";
import Title from "../../components/Title/Title";

interface CheckoutProps {
  checkoutStore?: CheckoutStore;
}

const Checkout: React.FC<CheckoutProps> = ({
  checkoutStore,
}: CheckoutProps) => {
  return (
    <div className="checkout-final">
      <div className="checkout-final__wrapper">
        <Title title="Checkout" link="checkout"></Title>
        <div className="checkout-final__wrapper__info">
          <p>Billing Information</p>
        </div>
      </div>
    </div>
  );
};

export default inject("checkoutStore")(observer(Checkout));
