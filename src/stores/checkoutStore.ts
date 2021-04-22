import axios from "axios";
import { observable, action, IObservableArray, makeAutoObservable } from "mobx";
import { create, persist } from "mobx-persist";
import * as localForage from "localforage";

localForage.config({
  driver: localForage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: "hellsio",
  version: 1.0,
  size: 500000000,
  storeName: "hellsio",
  description: "Hellsio vinyl shop localForage",
});

export type CheckoutProduct = { amount: number; [key: string]: any };

export class CheckoutStore {
  @persist("list")
  products: IObservableArray<CheckoutProduct> = observable.array<CheckoutProduct>(
    []
  );

  @observable isAllowedToCheckout: boolean = false;
  @persist @observable saveProductsInStorage: boolean;

  constructor() {
    makeAutoObservable(this);
    this.saveProductsInStorage = false;
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

  @action setIsAllowedToCheckout: (value: boolean) => void = (
    value: boolean
  ) => {
    this.isAllowedToCheckout = value;
  };

  @action setSaveProductsInStorage: (value: boolean) => void = (
    value: boolean
  ) => {
    this.saveProductsInStorage = value;
  };
}

const hydrate = create({ storage: localForage, jsonify: false });

export const checkoutStore = new CheckoutStore();
if (checkoutStore.saveProductsInStorage)
  hydrate("checkoutStore", checkoutStore);
