import axios from "axios";
import { observable, action, makeAutoObservable } from "mobx";
import * as qs from "qs";

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

  @action fetchNewArrivals = async (): Promise<any> => {
    try {
      const albumsResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/product/new-arrivals`
      );
      this.setProducts(albumsResponse.data);
      return albumsResponse.data;
    } catch (err) {
      console.log(err);
    }
  };

  @action fetchPopular = async (): Promise<any> => {
    try {
      const albumsResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/product/popular`
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

  @action fetchSome = async (codes: Array<any>): Promise<any> => {
    try {
      const albumsResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/product/some`,
        {
          params: {
            albums: [...codes],
          },
          paramsSerializer: (params: any) => {
            return qs.stringify(params);
          },
        }
      );
      return albumsResponse.data;
    } catch (err) {
      console.log(err);
    }
  };
}

export const productStore = new ProductStore();
