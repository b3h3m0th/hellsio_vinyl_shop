import axios from "axios";
import { observable, action, IObservableArray, makeAutoObservable } from "mobx";
import { create } from "mobx-persist";
import * as LocalForage from "localforage";
import { BillingData } from "../pages/Checkout/Checkout";
import {
  getUserAccessToken,
  getUserRefreshToken,
  setUserAccessToken,
} from "../authorization/token";

const checkoutLocalForage = LocalForage.createInstance({
  driver: LocalForage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: "hellsio_checkout",
  version: 1.0,
  size: 500000000,
  storeName: "hellsio_checkout",
  description: "Checkout Hellsio vinyl shop localForage",
});

export type CheckoutProduct = { amount: number; [key: string]: any };

export class CheckoutStore {
  @observable
  products: IObservableArray<CheckoutProduct> = observable.array<CheckoutProduct>(
    []
  );

  @observable orderPlaced: boolean = false;

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
      this.products[
        this.products.findIndex((p: any) => p.code === product.code)
      ].amount += product.amount;
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

  checkout = async (billingData: BillingData): Promise<any | string> => {
    const accessToken = getUserAccessToken();
    const refreshToken = getUserRefreshToken();
    let response;

    try {
      response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/user/checkout`,
        {
          billingData: billingData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
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
      return await this.checkout(billingData);
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
      return await this.createPaymentIntent(billingData, totalAmount);
    }
  };
}

const hydrate = create({ storage: checkoutLocalForage, jsonify: false });

export const checkoutStore = new CheckoutStore();
// hydrate("checkoutStore", checkoutStore);
