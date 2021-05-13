import axios from "axios";
import { observable, action, IObservableArray, makeAutoObservable } from "mobx";
import { BillingData } from "../pages/Checkout/Checkout";
import {
  getUserAccessToken,
  getUserRefreshToken,
  setUserAccessToken,
} from "../authorization/token";

export type CheckoutProduct = { amount: number; [key: string]: any };

export class CheckoutStore {
  @observable
  products: IObservableArray<CheckoutProduct> = observable.array<CheckoutProduct>(
    []
  );

  @observable orderPlaced: boolean = false;
  @observable processing: boolean = false;
  @observable isAllowdToResendEmailVerification: boolean = false;
  @observable maxProductAddToCartAmount: number = 5;
  @observable maxProductTotalOrderAmount: number = 20;

  constructor() {
    makeAutoObservable(this);
  }

  @action setProducts: (products: Array<CheckoutProduct>) => void = (
    products: Array<CheckoutProduct>
  ) => {
    products.forEach((product: CheckoutProduct) => this.products.push(product));
  };

  @action addProduct: (product: CheckoutProduct) => void = (
    product: CheckoutProduct
  ) => {
    if (this.products.some((p: any) => p.code === product.code)) {
      if (
        this.products[
          this.products.findIndex((p: any) => p.code === product.code)
        ].amount +
          product.amount >=
        this.maxProductTotalOrderAmount
      ) {
        this.products[
          this.products.findIndex((p: any) => p.code === product.code)
        ].amount = this.maxProductTotalOrderAmount;
      } else {
        this.products[
          this.products.findIndex((p: any) => p.code === product.code)
        ].amount += product.amount;
      }
    } else {
      this.products.push(product);
    }
  };

  @action removeProduct: (index: number) => void = (index: number) => {
    this.products.splice(index, 1);
  };

  @action clear: () => void = () => {
    this.products.clear();
  };

  fetchFormates = async (): Promise<any> => {
    try {
      const formatResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/product/format`
      );
      return formatResponse.data;
    } catch (err) {
      console.log(err);
    }
  };

  @action setOrderPlaced: (value: boolean) => void = (value) => {
    this.orderPlaced = value;
  };

  @action checkout = async (
    billingData: BillingData,
    stripSecret: string
  ): Promise<any | string> => {
    const accessToken = getUserAccessToken();
    const refreshToken = getUserRefreshToken();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/user/checkout`,
        {
          billingData: {
            ...billingData,
            products: this.products.map((product: any) => {
              return { code: product.code, quantity: product.amount };
            }),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
            "stripe-authorization": stripSecret,
          },
        }
      );

      return response.data;
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
      checkoutStore.setProcessing(false);
      return await this.checkout(billingData, stripSecret);
    }
  };

  @action createPaymentIntent = async (
    billingData: BillingData,
    totalAmount: React.MutableRefObject<number>
  ): Promise<any> => {
    const accessToken = getUserAccessToken();
    const refreshToken = getUserRefreshToken();

    try {
      const paymentIntentResponse = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/user/create-payment-intent`,
        {
          billingData: {
            ...billingData,
            products: this.products.map((product: any) => {
              return { code: product.code, quantity: product.amount };
            }),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (paymentIntentResponse.status === 208) return false;

      return paymentIntentResponse.data.clientSecret;
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
      checkoutStore.setProcessing(false);
      return await this.createPaymentIntent(billingData, totalAmount);
    }
  };

  @action setProcessing: (value: boolean) => void = (value: boolean) => {
    this.processing = value;
  };

  @action setIsAllowdToResendEmailVerification: (value: boolean) => void = (
    value: boolean
  ) => {
    this.isAllowdToResendEmailVerification = value;
  };

  @action resendEmailVerification: () => void = () => {
    const accessToken = getUserAccessToken();
    const refreshToken = getUserRefreshToken();

    (async () => {
      await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/user/resend-email-verification`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      try {
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
      }
    })();
  };

  @action setMaxProductAddToCartAmount: (value: number) => void = (value) => {
    this.maxProductAddToCartAmount = value;
  };

  @action setMaxProductTotalOrderAmount: (value: number) => void = (value) => {
    this.maxProductTotalOrderAmount = value;
  };
}

export const checkoutStore = new CheckoutStore();
