import React, { useState } from "react";
import "./Checkout.scss";
import { CheckoutStore } from "../../stores/checkoutStore";
import { inject, observer } from "mobx-react";
import Title from "../../components/Title/Title";
import { Redirect } from "react-router";
import { languageStore, LanguageStore } from "../../stores/languageStore";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const arrowRight = require("../../assets/icons/arrowRight/arrowRightWhite.png");

export type BillingData = {
  firstname: string;
  lastname: string;
  birthdate: Date;
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
};

interface CheckoutProps {
  checkoutStore?: CheckoutStore;
  languageStore?: LanguageStore;
}

const Checkout: React.FC<CheckoutProps> = ({
  checkoutStore,
}: CheckoutProps) => {
  const [billingData, setBillingData] = useState<any>();
  const [billingErrors, setBillingErrors] = useState<Array<any>>();

  return (
    <>
      {checkoutStore?.isAllowedToCheckout || true ? (
        <div className="checkout-final">
          <div className="checkout-final__wrapper">
            <Title
              title="Checkout - Billing Information"
              link="checkout"
            ></Title>
            <div className="checkout-final__wrapper__info">
              <form className="checkout-final__wrapper__info__form">
                <div className="checkout-final__wrapper__info__form__firstname">
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__lastname">
                  <label htmlFor="firstname">Lastname</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="sign-in-wrapper__sign-in__sign-in__password">
                  <label htmlFor="sign-in__password">Password</label>
                  <input
                    type="password"
                    id="sign-in__password"
                    name="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="sign-in-errors">
                  <ul className="sign-in-errors__errors">
                    {[].map((err: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="sign-in-errors__errors__error"
                        >
                          {err}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <PrimaryButton
                  label="Order now"
                  link=""
                  icon={arrowRight}
                  onClick={() => {}}
                />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to={`/${languageStore.language}/shopping-bag`} />
      )}
    </>
  );
};

export default inject("checkoutStore", "languageStore")(observer(Checkout));
