import axios from "axios";
import { observable, action, toJS } from "mobx";

export type CheckoutProduct = { amount: number; [key: string]: any };

export class CheckoutStore {
  @observable products: Array<CheckoutProduct> = [];
  @observable isAllowedToCheckout: boolean = false;

  @action setProducts: (product: Array<CheckoutProduct>) => void = (
    products: Array<CheckoutProduct>
  ) => {
    this.products = products;
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
    console.log(toJS(this.products));
  };

  @action removeProduct: (index: number) => void = (index: number) => {
    this.products.splice(index, 1);
  };

  @action clear: () => void = () => {
    this.products = [];
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

  @action setIsAllowedToCheckout: (value: boolean) => void = (
    value: boolean
  ) => {
    this.isAllowedToCheckout = value;
  };
}

export const checkoutStore = new CheckoutStore();
