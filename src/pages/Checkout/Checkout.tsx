import React, { useState } from "react";
import "./Checkout.scss";
import { CheckoutStore } from "../../stores/checkoutStore";
import { inject, observer } from "mobx-react";
import Title from "../../components/Title/Title";
import { Redirect } from "react-router";
import { languageStore, LanguageStore } from "../../stores/languageStore";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CountryDropdown } from "react-country-region-selector";

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
  const [billingData, setBillingData] = useState<BillingData>({
    firstname: "",
    lastname: "",
    birthdate: new Date(0),
    street: "",
    street_number: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  });
  const [billingErrors, setBillingErrors] = useState<Array<any>>();

  console.log(billingData);

  return (
    <>
      {checkoutStore?.isAllowedToCheckout || true ? (
        <div className="checkout-final">
          <div className="checkout-final__wrapper">
            <div className="checkout-final__wrapper__info">
              <Title
                title="Checkout - Contact Information"
                link="checkout"
              ></Title>
              <form className="checkout-final__wrapper__info__form">
                <div className="checkout-final__wrapper__info__form__firstname">
                  <label htmlFor="firstname">First name</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setBillingData({
                        firstname: e.target.value,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: billingData?.street,
                        street_number: billingData?.street_number,
                        postal_code: billingData?.postal_code,
                        city: billingData?.city,
                        state: billingData?.state,
                        country: billingData?.country,
                      });
                    }}
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__lastname">
                  <label htmlFor="firstname">Last name</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__birthdate">
                  <label htmlFor="birthdate">Birthdate</label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__street">
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__street-number">
                  <label htmlFor="street-number">Street Number</label>
                  <input
                    type="text"
                    id="street-number"
                    name="street-number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <br />
                <div className="checkout-final__wrapper__info__form__postal-code">
                  <label htmlFor="postal-code">Postal Code</label>
                  <input
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__city">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__country">
                  <label htmlFor="birthdate">Country</label>
                  <CountryDropdown
                    value={billingData.country}
                    onChange={(val) =>
                      setBillingData({
                        firstname: val,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: billingData?.street,
                        street_number: billingData?.street_number,
                        postal_code: billingData?.postal_code,
                        city: billingData?.city,
                        state: billingData?.state,
                        country: billingData?.country,
                      })
                    }
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="checkout-final__wrapper">
            <div className="checkout-final__wrapper__info">
              <Title
                title="Checkout - Shipping Information"
                link="checkout"
              ></Title>
              <form className="checkout-final__wrapper__info__form">
                <div className="checkout-final__wrapper__info__form__price">
                  19.90
                </div>
                <PrimaryButton
                  label="Order now"
                  link=""
                  icon={arrowRight}
                  onClick={() => {}}
                />
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
