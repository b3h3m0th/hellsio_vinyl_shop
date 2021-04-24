import React from "react";
import { Redirect } from "react-router";
import { CheckoutStore } from "../../stores/checkoutStore";
import { LanguageStore } from "../../stores/languageStore";
import { inject, observer } from "mobx-react";
import "./OrderPlaced.scss";
import { Link } from "react-router-dom";
import ArrowButton from "../../components/ArrowButton/ArrowButton";

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
          <div className="order-placed__wrapper">
            <div className="order-placed__wrapper__header">
              <span className="order-placed__wrapper__header__thank-you">
                Thank You!
              </span>
              <span className="order-placed__wrapper__header__content">
                very much for your order! An Email including all shipping
                details is on its way...
              </span>
            </div>
            <Link
              to="/"
              className="order-placed__wrapper__back-button"
              onClick={() => {
                checkoutStore.setOrderPlaced(false);
              }}
            >
              <ArrowButton
                label="Back to Home"
                className="order-placed__wrapper__back-button__button"
              />
            </Link>
          </div>
        </div>
      ) : (
        <Redirect to={`/${languageStore?.language}/checkout`} />
      )}
    </>
  );
};

export default inject("checkoutStore", "languageStore")(observer(OrderPlaced));
