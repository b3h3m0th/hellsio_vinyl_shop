import React, { useState, useEffect, useRef } from "react";
import "./Checkout.scss";
import { CheckoutStore } from "../../stores/checkoutStore";
import { inject, observer } from "mobx-react";
import Title from "../../components/Title/Title";
import { languageStore, LanguageStore } from "../../stores/languageStore";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CountryDropdown } from "react-country-region-selector";
import { Link, Redirect } from "react-router-dom";
import { toJS } from "mobx";
import { userStore } from "../../stores/userStore";
import { orderErrors } from "./validateOrder";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import axios from "axios";
import validateOrder from "./validateOrder";
import {
  getUserAccessToken,
  getUserRefreshToken,
  setUserAccessToken,
} from "../../authorization/token";

const arrowRight = require("../../assets/icons/arrowRight/arrowRight.png");
const arrowRightWhite = require("../../assets/icons/arrowRight/arrowRightWhite.png");

export type BillingData = {
  firstname: string;
  lastname: string;
  birthdate: Date | null;
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
  const elements = useElements();
  const stripe = useStripe();

  const [billingData, setBillingData] = useState<BillingData>({
    firstname: "",
    lastname: "",
    birthdate: null,
    street: "",
    street_number: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  });
  const totalAmount = useRef<number>(
    +[...toJS(checkoutStore?.products || [])]
      .map((p: any, _: number) => p)
      .reduce((total: number, current) => {
        return current.price * current.amount + total;
      }, 0)
      .toFixed(2)
  );
  const [billingErrors, setBillingErrors] = useState<Array<any>>([]);
  const [stripeSecret, setStripeSecret] = useState<string>();

  useEffect(() => {
    const accessToken = getUserAccessToken();
    const refreshToken = getUserRefreshToken();

    const createPaymentIntent = async (): Promise<any> => {
      try {
        const paymentIntentResponse = await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/user/create-payment-intent`,
          {
            billingData: {
              ...billingData,
              amount: totalAmount.current,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setStripeSecret(paymentIntentResponse.data.clientSecret);
      } catch (err) {
        const tokenResponse = await axios.post(
          `${`${process.env.REACT_APP_BASE_API_URL}/user/token` || ""}`,
          {
            token: refreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUserAccessToken(tokenResponse.data.accessToken);
        return await createPaymentIntent();
      }
    };
    createPaymentIntent();
  }, []);

  const createPayment: () => void = () => {
    const cardElement = elements!.getElement(CardElement)!;
    validateOrder(
      stripe!,
      elements!,
      checkoutStore!,
      userStore,
      billingData,
      setBillingErrors,
      () => {
        (async () => {
          const payload = await stripe!.confirmCardPayment(stripeSecret || "", {
            payment_method: {
              card: cardElement,
            },
          });

          if (payload.error) {
            setBillingErrors([
              ...billingErrors,
              payload.error.message || orderErrors.paymentError,
            ]);
            setTimeout(() => {
              setBillingErrors([]);
            }, 4000);
          } else {
            checkoutStore?.setOrderPlaced(true);
          }
        })();
      }
    );
  };

  return (
    <>
      {checkoutStore?.orderPlaced ? (
        <Redirect to={`/${languageStore.language}/order-placed`} />
      ) : (
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
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                      })
                    }
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__lastname">
                  <label htmlFor="firstname">Last name</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: e.target.value,
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
                <div className="checkout-final__wrapper__info__form__birthdate">
                  <label htmlFor="birthdate">Birthdate</label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: billingData?.lastname,
                        birthdate: new Date(e.target.value),
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
                <div className="checkout-final__wrapper__info__form__street">
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: e.target.value,
                        street_number: billingData?.street_number,
                        postal_code: billingData?.postal_code,
                        city: billingData?.city,
                        state: billingData?.state,
                        country: billingData?.country,
                      })
                    }
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__street-number">
                  <label htmlFor="street-number">Street Number</label>
                  <input
                    type="text"
                    id="street-number"
                    name="street-number"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: billingData?.street,
                        street_number: e.target.value,
                        postal_code: billingData?.postal_code,
                        city: billingData?.city,
                        state: billingData?.state,
                        country: billingData?.country,
                      })
                    }
                  />
                </div>
                <br />
                <div className="checkout-final__wrapper__info__form__postal-code">
                  <label htmlFor="postal-code">Postal Code</label>
                  <input
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: billingData?.street,
                        street_number: billingData?.street_number,
                        postal_code: e.target.value,
                        city: billingData?.city,
                        state: billingData?.state,
                        country: billingData?.country,
                      })
                    }
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__city">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: billingData?.street,
                        street_number: billingData?.street_number,
                        postal_code: billingData?.postal_code,
                        city: e.target.value,
                        state: billingData?.state,
                        country: billingData.country,
                      })
                    }
                  />
                </div>
                <div className="checkout-final__wrapper__info__form__state">
                  <label htmlFor="city">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingData({
                        firstname: billingData.firstname,
                        lastname: billingData?.lastname,
                        birthdate: billingData?.birthdate,
                        street: billingData?.street,
                        street_number: billingData?.street_number,
                        postal_code: billingData?.postal_code,
                        city: billingData.city,
                        state: e.target.value,
                        country: billingData.country,
                      })
                    }
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
                <div className="checkout-final__wrapper__info__form__payment">
                  <label htmlFor="payment">Payment Details</label>
                  <CardElement
                    options={
                      {
                        style: {
                          base: {
                            color: "white",
                            padding: "20px 0px 0px 0px",
                          },
                        },
                        hidePostalCode: true,
                        iconStyle: "solid",
                      } as StripeCardElementOptions
                    }
                    onChange={(e) => console.log(e)}
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
                  {[...toJS(checkoutStore?.products || [])].map(
                    (p: any, i: number) => {
                      return (
                        <li key={`checkout-product-${i}`}>
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
                      {[...toJS(checkoutStore?.products || [])]
                        .map((p: any, _: number) => p)
                        .reduce((total: number, current) => {
                          return current.amount + total;
                        }, 0)}
                      x
                    </span>
                    <span>
                      $
                      {[...toJS(checkoutStore?.products || [])]
                        .map((p: any, _: number) => p)
                        .reduce((total: number, current) => {
                          return current.price * current.amount + total;
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </ul>
                <PrimaryButton
                  label="Order now"
                  link="checkout"
                  icon={arrowRightWhite}
                  onClick={() => {
                    createPayment();
                  }}
                  disabled={!stripe}
                />
              </form>
              <div className="billing-errors">
                <ul className="billing-errors__errors">
                  {billingErrors?.map((err: any, i: number) => {
                    return (
                      <li
                        key={`billing-errors-${i}`}
                        className="billing-errors__errors__error"
                      >
                        {err}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default inject("checkoutStore", "languageStore")(observer(Checkout));
