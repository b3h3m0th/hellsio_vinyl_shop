import { observable, makeAutoObservable } from "mobx";
import { create, persist } from "mobx-persist";
import * as LocalForage from "localforage";

const cacheLocalForage = LocalForage.createInstance({
  driver: LocalForage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: "hellsio_cache",
  version: 1.0,
  size: 500000000,
  storeName: "hellsio_cache",
  description: "Cache Hellsio vinyl shop localForage",
});

export class CacheStore {
  @persist @observable saveProductsInStorage: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }
}

const hydrate = create({ storage: cacheLocalForage, jsonify: false });

export const cacheStore = new CacheStore();
hydrate("checkoutStore", cacheStore);
