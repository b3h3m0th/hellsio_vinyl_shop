import { decorate, observable, action } from "mobx";

export class CheckoutStore {
  products: any[] = [];

  setProducts = (products: any[]) => {
    this.products = products;
  };

  addProduct = (product: any) => {
    this.products.push(product);
  };

  removeProduct = (index: number) => {
    this.products.splice(index, 1);
  };

  clear = () => {
    this.products = [];
  };
}

decorate(CheckoutStore, {
  products: observable,
  setProducts: action,
  addProduct: action,
});

export const checkoutStore = new CheckoutStore();
