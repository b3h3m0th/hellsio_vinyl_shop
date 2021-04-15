import axios from "axios";
import { decorate, observable, action } from "mobx";

export class ProductStore {
  products: Array<any> = [""];

  setProducts: (products: Array<any>) => void = (products: Array<any>) => {
    this.products = products;
    console.log(this.products);
  };

  fetchAll = async (): Promise<any> => {
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

  fetch = async (albumCode: string): Promise<any> => {
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
}

decorate(ProductStore, {
  products: observable,
  setProducts: action,
  fetch: action,
});

export const productStore = new ProductStore();
