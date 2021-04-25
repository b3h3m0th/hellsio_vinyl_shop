import { Stripe, StripeElements } from "@stripe/stripe-js";
import { CheckoutStore } from "../../stores/checkoutStore";
import { UserStore } from "../../stores/userStore";
import { BillingData } from "./Checkout";

export enum orderErrors {
  noItems = "Please add items to your order before checkout.",
  notLoggedIn = "Please Login before checkout.",
  unfilledFields = "Please fill out all required fields.",
  paymentError = "An error occured during your payment.",
}

const validateOrder: (
  stripe: Stripe,
  elements: StripeElements,
  checkoutStore: CheckoutStore,
  userStore: UserStore,
  billingData: BillingData,
  setBillingErrors: (value: React.SetStateAction<any[]>) => void,
  callback: () => void
) => void = (
  stripe,
  elements,
  checkoutStore,
  userStore,
  billingData,
  setBillingErrors,
  callback
) => {
  let billingErrors: Array<string> = [];

  if (!checkoutStore?.products || checkoutStore.products.length <= 0)
    billingErrors.push(orderErrors.noItems);

  if (!userStore.loggedIn) billingErrors.push(orderErrors.notLoggedIn);

  let k: keyof typeof billingData;
  for (k in billingData as BillingData) {
    if (!billingData[k] && !billingErrors.includes(orderErrors.unfilledFields))
      billingErrors.push(orderErrors.unfilledFields);
  }

  if (!stripe || !elements) return billingErrors.push(orderErrors.paymentError);

  console.log(billingErrors);
  console.log(billingData);
  if (billingErrors && billingErrors.length >= 1) {
    setBillingErrors(billingErrors);
    setTimeout(() => {
      setBillingErrors([]);
    }, 4000);
  } else {
    callback();
  }
};

export default validateOrder;
