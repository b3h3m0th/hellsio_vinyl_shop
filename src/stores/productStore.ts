import axios from "axios";
import { observable, action, makeAutoObservable } from "mobx";

export class ProductStore {
  @observable products: Array<any> = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setProducts: (products: Array<any>) => void = (
    products: Array<any>
  ) => {
    this.products = products;
  };

  @action fetchAll = async (): Promise<any> => {
    try {
      const albumsResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/product`
      );
      this.setProducts(albumsResponse.data);
      return albumsResponse.data;
    } catch (err) {
      console.log(err);
    }
  };

  @action fetch = async (albumCode: string): Promise<any> => {
    try {
      const albumsResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/product/${albumCode}`
      );
      return albumsResponse.data;
    } catch (err) {
      console.log(err);
      return -1;
    }
  };

  @action fetchFew = async (amount: number): Promise<any> => {
    try {
      const albumsResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/product/few/${amount}`
      );
      return albumsResponse.data;
    } catch (err) {
      console.log(err);
      return -1;
    }
  };
}

export const productStore = new ProductStore();
