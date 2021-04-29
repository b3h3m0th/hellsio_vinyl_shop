import { observable, action, makeAutoObservable } from "mobx";

export class SearchStore {
  @observable products: Array<any> = [];
  @observable opened: boolean = false;
  query: string = "";
  @observable results: Array<any> = [];
  @observable loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action toggle = () => {
    this.opened = !this.opened;
  };

  @action open = () => {
    this.opened = true;
  };

  @action close = () => {
    this.opened = false;
  };

  @action setQuery: (value: string) => void = (value: string) => {
    this.query = value;
  };

  @action setResults: (value: Array<any>) => void = (value: Array<any>) => {
    this.results = value;
  };

  @action addResult: (item: any) => void = (item: any) => {
    this.results.push(item);
  };

  @action setLoading: (value: boolean) => void = (value: boolean) => {
    this.loading = value;
  };

  @action setProducts: (products: Array<any>) => void = (
    products: Array<any>
  ) => {
    this.products = products;
  };
}

export const searchStore = new SearchStore();
