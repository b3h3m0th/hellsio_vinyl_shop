import { action, IObservableArray, makeAutoObservable, observable } from "mobx";
import { create, persist } from "mobx-persist";
import * as LocalForage from "localforage";

const wishlistForage = LocalForage.createInstance({
  driver: LocalForage.WEBSQL,
  name: "hellsio_wishlist",
  version: 1.0,
  size: 50000000,
  storeName: "hellsio_wishlist",
  description: "Hellsio vinyl shop localForage",
});

export class WishlistStore {
  @persist("list") products: IObservableArray<string> = observable.array([]);

  constructor() {
    makeAutoObservable(this);
  }

  @action addProduct: (product: string) => void = (product) => {
    if (!this.products.includes(product)) this.products.push(product);
  };

  @action removeProduct: (index: number) => void = (index) => {
    this.products.splice(index, 1);
  };

  @action clear: () => void = () => {
    this.products.clear();
  };
}

const hydrate = create({ storage: wishlistForage, jsonify: false });
export const wishlistStore = new WishlistStore();
hydrate("wishlistStore", wishlistStore);
