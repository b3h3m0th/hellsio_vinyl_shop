import React, { useState } from "react";
import "./Checkout.scss";
import { CheckoutStore } from "../../stores/checkoutStore";
import { inject, observer } from "mobx-react";
import Title from "../../components/Title/Title";
import { Redirect } from "react-router";
import { languageStore, LanguageStore } from "../../stores/languageStore";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CountryDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";
import { toJS } from "mobx";

const arrowRight = require("../../assets/icons/arrowRight/arrowRight.png");
const arrowRightWhite = require("../../assets/icons/arrowRight/arrowRightWhite.png");

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
  const [billingErrors, setBillingErrors] = useState<Array<any>>([]);

  console.log(billingData);

  return (
    <>
      {checkoutStore?.isAllowedToCheckout || true ? (
        <div className="checkout-final">
          <div className="checkout-final__wrapper">
            <div className="checkout-final__wrapper__info">
              <Link
                to="shopping-bag"
                className="checkout-final__wrapper__info__back"
              >
                <img src={arrowRight} alt="Hellsio arrow left" /> Back to
                Shopping bag
              </Link>
              <Title
                title="Checkout - Shipping Details"
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
                    priorityOptions={["Austria"]}
                    value={billingData.country}
                    onChange={(val) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: billingData?.street,
                        street_number: billingData?.street_number,
                        postal_code: billingData?.postal_code,
                        city: billingData?.city,
                        state: billingData.state,
                        country: val,
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
                title="Checkout - Your Order Summary"
                link="checkout"
              ></Title>
              <form className="checkout-final__wrapper__info__form">
                <ul className="checkout-final__wrapper__info__form__products">
                  {toJS(checkoutStore?.products || []).map(
                    (p: any, i: number) => {
                      return (
                        <li key={i}>
                          <Link
                            to={`/${languageStore.language}/products/${p.code}`}
                          >
                            {`${p.name} by ${p.artist}`}
                          </Link>
                          <span>{p.amount}x</span>
                          <span>${p.price}</span>
                        </li>
                      );
                    }
                  )}
                  <hr />
                  <div className="checkout-final__wrapper__info__form__products__sum">
                    <span>Total</span>
                    <span>
                      $
                      {toJS(checkoutStore?.products || [])
                        .map((p: any) => p)
                        .reduce((a, c) => {
                          return a.price * a.amount + c.price * c.amount;
                        })}
                    </span>
                  </div>
                </ul>
                <PrimaryButton
                  label="Order now"
                  link=""
                  icon={arrowRightWhite}
                  onClick={() => {}}
                />
                <div className="billing-errors">
                  <ul className="billing-errors__errors">
                    {billingErrors?.map((err: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="billing-errors__errors__error"
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
