import React from "react";
import { CheckoutStore } from "../../stores/checkoutStore";
import { inject, observer } from "mobx-react";

interface CheckoutProps {
  checkoutStore?: CheckoutStore;
}

const Checkout: React.FC<CheckoutProps> = ({
  checkoutStore,
}: CheckoutProps) => {
  return (
    <div className="checkout">
      <div>Checkout</div>
    </div>
  );
};

export default inject("checkoutStore")(observer(Checkout));
