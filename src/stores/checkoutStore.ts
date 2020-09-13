import { decorate, observable, action } from "mobx";
import { Album } from "../models/Album";

export class CheckoutStore {
  products: Album[] = [];

  setProducts = (products: Album[]) => {
    this.products = products;
  };

  addProduct = (product: Album) => {
    this.products.push(product);
  };

  removeProduct = (index: number) => {
    try {
      this.products.splice(index, 1);
    } catch (e) {}
  };
}

decorate(CheckoutStore, {
  products: observable,
  setProducts: action,
  addProduct: action,
});

export const checkoutStore = new CheckoutStore();
