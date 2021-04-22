import axios from "axios";
import { observable, action, IObservableArray } from "mobx";

export type CheckoutProduct = { amount: number; [key: string]: any };

export class CheckoutStore {
  products: IObservableArray<CheckoutProduct> = observable.array<CheckoutProduct>(
    []
  );
  @observable isAllowedToCheckout: boolean = false;

  @action setProducts: (products: Array<CheckoutProduct>) => void = (
    products: Array<CheckoutProduct>
  ) => {
    this.products.clear();
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

  @action setIsAllowedToCheckout: (value: boolean) => void = (
    value: boolean
  ) => {
    this.isAllowedToCheckout = value;
  };
}

export const checkoutStore = new CheckoutStore();
