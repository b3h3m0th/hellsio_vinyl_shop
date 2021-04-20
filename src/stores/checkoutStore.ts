import axios from "axios";
import { decorate, observable, action, toJS } from "mobx";

export type CheckoutProduct = { amount: number; [key: string]: any };

export class CheckoutStore {
  products: Array<CheckoutProduct> = [];
  isAllowedToCheckout: boolean = false;

  setProducts: (product: Array<CheckoutProduct>) => void = (
    products: Array<CheckoutProduct>
  ) => {
    this.products = products;
  };

  addProduct: (product: CheckoutProduct) => void = (
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

  removeProduct: (index: number) => void = (index: number) => {
    this.products.splice(index, 1);
  };

  clear: () => void = () => {
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
}

decorate(CheckoutStore, {
  products: observable,
  setProducts: action,
  addProduct: action,
});

export const checkoutStore = new CheckoutStore();
